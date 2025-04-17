import { useStore } from '@nanostores/react';
import { useQuery } from '@tanstack/react-query';
import { readHandler } from 'api';
import React, { useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

import Modal from 'components/molecules/Modal/Modal';
import { AO, ASSETS } from 'helpers/config';
import { formatNumber, formatTicker, parseBigIntAsNumber } from 'helpers/format';
import { retryable } from 'helpers/network';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { getFlps, getUserDelegations } from '../../../api/fair-launch-api';
import { $myFlps } from '../../../stores/my-flp-store';
import { DelegationTableRow } from '../components/DelegationTableRow';
import { InMemoryTable } from '../components/InMemoryTable';
import { Skeleton } from '../components/LoadingSkeletons';
import { MyFlpTableRow } from '../components/MyFlpTableRow';
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

	const myFlpIds = useStore($myFlps);

	const arProvider = useArweaveProvider();
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const [showFlpModal, setShowFlpModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const { data: userDelegations } = useQuery({
		queryKey: ['userDelegations', arProvider.walletAddress],
		queryFn: () => retryable(getUserDelegations)(arProvider.walletAddress),
		enabled: !!arProvider.walletAddress,
	});

	const { data: piBalance } = useQuery({
		queryKey: ['piBalance', arProvider.walletAddress],
		queryFn: async () => {
			if (arProvider.walletAddress) {
				const tokenBalance = await readHandler({
					processId: AO.piProcess,
					action: 'Balance',
					tags: [{ name: 'Recipient', value: arProvider.walletAddress }],
				});
				console.log('onPiBalance', tokenBalance);
				return String(tokenBalance || 0);
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

	const myFlps = useMemo(() => {
		if (!allFlps) return [];
		return allFlps.filter((flp: any) => {
			return myFlpIds.includes(flp.id) || delegatedFlps.some((delegatedFlp: any) => delegatedFlp.id === flp.id);
		});
	}, [myFlpIds, allFlps, delegatedFlps]);

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
						<S.DashboardLink to="/delegate">Go Back to Discover {'>'}</S.DashboardLink>
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

			{arProvider.walletAddress && (
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
			)}

			{arProvider.walletAddress && allFlps?.length > 0 && (
				<div>
					<S.SectionTitle>
						<PiFavicon />
						View your favorite fair launch projects. Inspect & claim your rewards.
					</S.SectionTitle>

					{myFlps.length > 0 && (
						<div style={{ marginBottom: 15 }}>
							<InMemoryTable
								data={myFlps}
								pageSize={myFlps.length}
								headerCells={[
									{ style: { width: 220, minWidth: 220, maxWidth: 220 }, label: 'NAME' },
									{
										style: { width: 160, minWidth: 160, maxWidth: 160 },
										label: 'AVAILABLE TO CLAIM',
									},
									{ style: { width: 160, minWidth: 160, maxWidth: 160 }, label: 'ACTIONS', align: 'right' },
								]}
								renderRow={(row: any, index: number) => {
									return <MyFlpTableRow key={row.id} row={row} index={index} />;
								}}
							/>
						</div>
					)}

					<div>
						<S.FlpSelectorButton onClick={() => setShowFlpModal(true)}>
							<ReactSVG src={ASSETS.plus} />
							Add FLPs to your list
						</S.FlpSelectorButton>
					</div>

					{showFlpModal && (
						<Modal header="My Fair Launch Projects" handleClose={() => setShowFlpModal(false)}>
							<S.FlpModalContent>
								<div className="search-container">
									<S.SearchBar>
										<S.SearchInput
											type="text"
											placeholder="Search FLPs..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</S.SearchBar>
								</div>

								<div className="flp-list">
									{allFlps
										.filter((flp: any) => {
											if (!flp.flp_token_name) return false;
											if (!searchTerm) return true;

											const query = searchTerm.toLowerCase().trim();
											return (
												flp.id?.toLowerCase().includes(query) ||
												flp.flp_name?.toLowerCase().includes(query) ||
												flp.flp_token_name?.toLowerCase().includes(query) ||
												flp.flp_token_ticker?.toLowerCase().includes(query) ||
												flp.flp_token_process?.toLowerCase().includes(query)
											);
										})
										.sort((a, b) => {
											const aIndex = myFlpIds.findIndex((id) => id === a.id);
											const bIndex = myFlpIds.findIndex((id) => id === b.id);
											if (aIndex !== -1 && bIndex !== -1) {
												return bIndex - aIndex;
											}
											return a?.flp_token_name?.localeCompare(b?.flp_token_name);
										})
										.map((flp: any) => {
											const isSelected = myFlpIds.includes(flp.id);
											return (
												<S.FlpModalItem
													key={flp.id}
													selected={isSelected}
													onClick={() => {
														if (isSelected) {
															$myFlps.set(myFlpIds.filter((id) => id !== flp.id));
														} else {
															$myFlps.set([...myFlpIds, flp.id]);
														}
													}}
												>
													<TokenAvatar logo={flp.flp_token_logo} size="medium" />
													<div className="flp-info">
														<span className="flp-name">{flp.flp_token_name}</span>
														<span className="flp-ticker">{formatTicker(flp.flp_token_ticker)}</span>
													</div>
													{isSelected && (
														<span className="selected-indicator">
															<ReactSVG src={ASSETS.checkmark} />
														</span>
													)}
												</S.FlpModalItem>
											);
										})}
								</div>

								<S.FlpModalFooter>
									<S.FlpSelectorDoneButton onClick={() => setShowFlpModal(false)}>Done</S.FlpSelectorDoneButton>
								</S.FlpModalFooter>
							</S.FlpModalContent>
						</Modal>
					)}
				</div>
			)}

			<div>
				<S.SectionTitle>
					<PiFavicon />
					View your current delegations.
				</S.SectionTitle>

				{!arProvider.walletAddress ? (
					<S.SectionTitle style={{ margin: 'auto' }}>Connect wallet to view your delegations.</S.SectionTitle>
				) : isLoading ? (
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
			</div>
		</DashboardContainer>
	);
}
