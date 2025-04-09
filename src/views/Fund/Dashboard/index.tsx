import { useQuery } from '@tanstack/react-query';
import { readHandler } from 'api';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { AO, ASSETS } from 'helpers/config';
import { formatNumber, parseBigIntAsNumber } from 'helpers/format';
import { retryable } from 'helpers/network';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { getFlps, getUserDelegations } from '../../../api/fair-launch-api';
import { DelegationTableRow } from '../components/DelegationTableRow';
import { InMemoryTable } from '../components/InMemoryTable';
import { Skeleton } from '../components/LoadingSkeletons';
import { PiFavicon } from '../components/PiFavicon';
import { TokenAvatar } from '../components/TokenAvatar';
import { TrendChart } from '../components/TrendChart';
import * as S from '../styles';

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

const mockDelegationRecords = [
	{ timestamp: 1622505600000, value: 10 },
	{ timestamp: 1625097600000, value: 200 },
	{ timestamp: 1627776000000, value: 300 },
	{ timestamp: 1630454400000, value: 400 },
	{ timestamp: 1633046400000, value: 500 },
];

const chartData = {
	labels: mockDelegationRecords.map((record) => formatDate(record.timestamp, 'dateString')),
	datasets: [
		{
			data: mockDelegationRecords.map((record) => record.value),
			borderColor: '#0DBD27',
			backgroundColor: '#0DBD2733',
			fill: true,
			tension: 0.4,
			pointRadius: 0,
			borderWidth: 1,
		},
	],
};

export default function DashboardPage() {
	const { data: allFlps } = useQuery({
		queryKey: ['allFlps'],
		queryFn: () => retryable(getFlps)(AO.flpFactory),
	});

	const arProvider = useArweaveProvider();
	const [expandedRows, setExpandedRows] = useState<number[]>([]);

	const { data: userDelegations } = useQuery({
		queryKey: ['userDelegations'],
		queryFn: () => retryable(getUserDelegations)(arProvider.walletAddress),
		enabled: !!arProvider.walletAddress,
	});

	const { data: piBalance } = useQuery({
		queryKey: ['piBalance'],
		queryFn: async () => {
			if (arProvider.walletAddress) {
				const tokenBalance = await readHandler({
					processId: AO.piProcess,
					action: 'Balance',
					tags: [{ name: 'Recipient', value: arProvider.walletAddress }],
				});
				return String(tokenBalance);
			}
		},
		enabled: !!arProvider.walletAddress,
	});

	const delegatedFlps = useMemo(() => {
		if (!allFlps || !userDelegations) return [];

		const delegationMap = new Map();
		userDelegations.delegationPrefs.forEach((pref) => {
			delegationMap.set(pref.walletTo, pref.factor);
		});

		return allFlps.filter((flp) => {
			const factor = delegationMap.get(flp.id);
			return factor && factor > 0;
		});
	}, [allFlps, userDelegations]);

	const isLoading = !allFlps || !userDelegations;

	return (
		<DashboardContainer>
			<S.Header>
				<S.HeaderContent>
					<div>
						<S.Title>Your Dashboard</S.Title>
						<S.Subtitle>View all your delegations.</S.Subtitle>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
						<S.DashboardLink to="/fund">Go Back to Discover {'>'}</S.DashboardLink>
						<S.ConnectButton onClick={() => arProvider.setWalletModalVisible(true)}>
							{arProvider.walletAddress ? (
								<>
									<span>
										Connected <b>{formatAddress(arProvider.walletAddress, false)}</b>
									</span>
								</>
							) : (
								'Connect Wallet'
							)}
						</S.ConnectButton>
					</div>
				</S.HeaderContent>
			</S.Header>

			<S.StatCard>
				<div>
					<S.StatLabel style={{ fontSize: 12 }}>YOUR PI BALANCE</S.StatLabel>
					<S.StatValue style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, fontSize: 48 }}>
						{piBalance ? formatNumber(parseBigIntAsNumber(piBalance, 12)) : <Skeleton width={100} height={48} />}
						<TokenAvatar logo={ASSETS.pi} size="xl" />
					</S.StatValue>
				</div>
				{/* <TrendChart height={150} width={500} data={chartData} isLoading={!allFlps} /> */}
			</S.StatCard>

			<S.SectionTitle>
				<PiFavicon />
				View your current delegations.
			</S.SectionTitle>

			{isLoading ? (
				<div>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<tbody>
							{[1, 2, 3, 4, 5].map((i) => (
								<S.TableRow key={i}>
									<S.TableCell>
										<S.TokenInfo>
											<Skeleton width={20} height={20} style={{ borderRadius: '50%' }} />
											<Skeleton width={120} height={20} />
										</S.TokenInfo>
									</S.TableCell>
									<S.TableCell align="right">
										<Skeleton width={60} height={20} />
									</S.TableCell>
								</S.TableRow>
							))}
						</tbody>
					</table>
				</div>
			) : delegatedFlps.length > 0 ? (
				<InMemoryTable
					data={delegatedFlps}
					pageSize={10}
					onLoadMore={() => {}}
					headerCells={[]}
					renderRow={(row: any, index: number) => {
						const delegation = userDelegations?.delegationPrefs.find((pref) => pref.walletTo === row.id);
						const delegationPercentage = delegation ? delegation.factor / 100 : 0;

						return (
							<DelegationTableRow
								key={row.id}
								row={row}
								index={index}
								expandedRows={expandedRows}
								setExpandedRows={setExpandedRows}
								delegationPercentage={delegationPercentage}
							/>
						);
					}}
				/>
			) : (
				<S.SectionTitle style={{ margin: 'auto' }}>You have no delegations.</S.SectionTitle>
			)}
		</DashboardContainer>
	);
}
