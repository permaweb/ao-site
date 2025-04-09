import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';

import { ASSETS } from 'helpers/config';
import { retryable } from 'helpers/network';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { getFlps } from '../../../api/fair-launch-api';
import { FLF_PROCESS } from '../../../settings';
import { InMemoryTable } from '../components/InMemoryTable';
import { PiFavicon } from '../components/PiFavicon';
import { TableRow } from '../components/TableRow';
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
		queryFn: () => retryable(getFlps)(FLF_PROCESS),
	});

	const arProvider = useArweaveProvider();

	return (
		<DashboardContainer>
			<S.Header>
				<S.HeaderContent>
					<div>
						<S.Title>Your Dashboard</S.Title>
						<S.Subtitle>View all your allocated AO yield.</S.Subtitle>
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
					<S.StatLabel style={{ fontSize: 12 }}>YOUR TOTAL REWARDS</S.StatLabel>
					<S.StatValue style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, fontSize: 48 }}>
						3.5
						<TokenAvatar logo={ASSETS.aoCircled} size="xl" />
					</S.StatValue>
				</div>
				<TrendChart height={150} width={500} data={chartData} isLoading={!allFlps} />
			</S.StatCard>

			<S.SectionTitle>
				<PiFavicon />
				View and edit all your current delegations.
			</S.SectionTitle>

			<InMemoryTable
				data={allFlps || []}
				pageSize={10}
				onLoadMore={() => {}}
				sortedBy="amount_delegated"
				headerCells={[
					{ style: { width: 50, minWidth: 50, maxWidth: 50 }, label: '#', align: 'center' },
					{ style: { width: 220, minWidth: 220, maxWidth: 220 }, label: 'NAME' },
					{ style: { width: 200, minWidth: 200, maxWidth: 200 }, label: 'TOTAL AO DELEGATED', key: 'amount_delegated' },
					{ style: { width: 200, minWidth: 200, maxWidth: 200 }, label: 'DELEGATED LAST CYCLE' },
					{ style: { width: 180, minWidth: 180, maxWidth: 180 }, label: 'DATE STARTED', key: 'starts_at_ts' },
					{ style: { width: 180, minWidth: 180, maxWidth: 180 }, label: 'ADD TO ALLOCATION', align: 'right' },
				]}
				renderRow={(row: any, index: number) => (
					<TableRow
						key={row.id}
						row={row}
						index={index}
						expandedRows={[]}
						setExpandedRows={() => {}}
						allocations={{}}
						isMaxAllocation={false}
						handleAllocationChange={() => {}}
						getProjectYield={() => 0}
						coreTokenColors={{}}
						flpColorMap={{}}
					/>
				)}
			/>
		</DashboardContainer>
	);
}
