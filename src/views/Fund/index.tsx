import { useActiveAddress } from 'arweave-wallet-kit';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';

import { getAggregatedStats, getFlps } from '../../api/fair-launch-api';
import { FLF_PROCESS } from '../../settings';
import { formatFullDate, formatNumber, formatTicker } from '../../utils/format';

import { AllocationItem } from './components/AllocationItem';
import { AllocationPieChart } from './components/AllocationPieChart';
import { InMemoryTable } from './components/InMemoryTable';
import { LoadingSkeletons } from './components/LoadingSkeletons';
import { TokenAvatar } from './components/TokenAvatar';
import { TrendChart } from './components/TrendChart';
import * as S from './styles';

export default function Fund() {
	const [tabIndex, setTabIndex] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [allocations, setAllocations] = useState<Record<string, number>>({});
	const [pageSize, setPageSize] = useState(30);

	const activeAddress = useActiveAddress();

	const { data: allFlps } = useQuery({
		queryKey: ['allFlps'],
		queryFn: () =>
			getFlps(FLF_PROCESS).then((flps) => {
				return flps.map((flp) => ({
					...flp,
					amount_delegated: Math.floor(Math.random() * 10000000),
					market_cap: Math.floor(Math.random() * 10000000),
				}));
			}),
	});

	const sortedAndFilteredFlps = useMemo(() => {
		if (!allFlps) return [];

		const filtered = allFlps.filter((flp) => {
			if (!searchQuery) return true;
			const query = searchQuery.toLowerCase();
			return (
				flp.flp_name?.toLowerCase().includes(query) ||
				flp.flp_token_name?.toLowerCase().includes(query) ||
				flp.flp_token_ticker?.toLowerCase().includes(query) ||
				flp.flp_token_process?.toLowerCase().includes(query)
			);
		});

		return [...filtered].sort((a, b) => {
			if (tabIndex === 0) {
				return b.amount_delegated - a.amount_delegated;
			}
			return b.starts_at_ts - a.starts_at_ts;
		});
	}, [allFlps, searchQuery, tabIndex]);

	const { data: stats } = useQuery({
		queryKey: ['stats'],
		queryFn: () => getAggregatedStats(FLF_PROCESS),
	});

	const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
	const isMaxAllocation = totalAllocation >= 100;

	const handleAllocationChange = (token: string, change: number) => {
		if (isMaxAllocation && change > 0) return;
		setAllocations((prev) => ({
			...prev,
			[token]: Math.max(0, Math.min(100, (prev[token] || 0) + change)),
		}));
	};

	const pieChartData =
		allFlps?.map((flp, idx) => ({
			token: flp.flp_token_ticker,
			percentage: allocations[flp.flp_token_process] || 0,
			color: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'][idx % 8],
		})) || [];

	if (!allFlps) return <LoadingSkeletons />;

	return (
		<S.Container>
			<S.Header>
				<S.HeaderContent>
					<div>
						<S.Title>Discover Permaweb Fair Launch Projects</S.Title>
						<S.Subtitle>
							The Permaweb Index is a permissionless ecosystem fund that allows delegation
							<br /> of your yield to a variety of Permaweb ecosystem projects.
						</S.Subtitle>
					</div>
				</S.HeaderContent>
			</S.Header>

			<S.StatsGrid>
				<S.StatCard>
					<S.StatLabel>TOTAL DELEGATIONS</S.StatLabel>
					<S.StatValue>$3.5M</S.StatValue>
					<TrendChart height={150} />
				</S.StatCard>
				<S.StatCard>
					<S.StatLabel>FAIR LAUNCH PROJECTS</S.StatLabel>
					<S.StatValue>150</S.StatValue>
					<TrendChart height={150} />
				</S.StatCard>
				<S.StatCard>
					<S.StatLabel>USERS</S.StatLabel>
					<S.StatValue>250M</S.StatValue>
					<TrendChart height={150} />
				</S.StatCard>
			</S.StatsGrid>

			<div style={{ display: 'flex', gap: '2rem' }}>
				<div style={{ flex: 1 }}>
					<S.TabsContainer>
						<S.Tab active={tabIndex === 0} onClick={() => setTabIndex(0)}>
							Highest Delegated
						</S.Tab>
						<S.Tab active={tabIndex === 1} onClick={() => setTabIndex(1)}>
							Most Recent
						</S.Tab>
					</S.TabsContainer>

					<S.SearchBar>
						<S.SearchInput
							placeholder="Search for Project..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</S.SearchBar>

					<InMemoryTable
						loading={!allFlps}
						initialSortField={tabIndex === 0 ? 'amount_delegated' : 'starts_at_ts'}
						initialSortDir="desc"
						data={sortedAndFilteredFlps}
						pageSize={pageSize}
						manualLoading={true}
						manualSorting={true}
						onLoadMore={() => setPageSize((prev) => prev + 30)}
						headerCells={[
							{ label: '#', align: 'center' },
							{ label: 'NAME' },
							{ label: 'AMOUNT DELEGATED' },
							{ label: 'MARKET CAP' },
							{ label: 'DATE STARTED' },
							{ label: 'ADD TO ALLOCATION', align: 'right' },
						]}
						renderRow={(row: any, index: number) => (
							<tr key={row.id}>
								<S.TableCell align="center">{index + 1}</S.TableCell>
								<S.TableCell>
									<S.TokenInfo>
										<TokenAvatar logo={row.flp_token_logo} size="large" />
										<span>{row.flp_token_name}</span>
										<span style={{ color: '#666' }}>{formatTicker(row.flp_token_ticker)}</span>
									</S.TokenInfo>
								</S.TableCell>
								<S.TableCell>${formatNumber(row.amount_delegated)}</S.TableCell>
								<S.TableCell>${formatNumber(row.market_cap)}</S.TableCell>
								<S.TableCell>{formatFullDate(row.starts_at_ts) || 'Unknown'}</S.TableCell>
								<S.TableCell align="right">
									<S.AddButton
										onClick={() => handleAllocationChange(row.flp_token_process, 5)}
										disabled={isMaxAllocation || row.status !== 'active' || row.starts_at_ts > Date.now()}
									>
										Add
									</S.AddButton>
								</S.TableCell>
							</tr>
						)}
					/>
				</div>

				<S.AllocationPanel>
					<h2>Allocation</h2>
					<p style={{ color: '#666' }}>The below Pie Chart represents how you are currently allocating your AO Yield</p>

					<S.PieChartContainer>
						<AllocationPieChart data={pieChartData} />
					</S.PieChartContainer>

					<div style={{ marginTop: '1rem' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
							<span style={{ fontWeight: 500 }}>Summary</span>
							<span style={{ fontWeight: 500 }}>%</span>
						</div>

						<div style={{ borderTop: '1px solid #eee', margin: '0.5rem 0' }} />

						<div style={{ maxHeight: 350, overflowY: 'auto' }}>
							{allFlps?.map((flp, idx) => (
								<AllocationItem
									key={flp.id}
									token={flp.flp_token_process}
									ticker={flp.flp_token_ticker}
									logo={flp.flp_token_logo}
									percentage={allocations[flp.flp_token_process] || 0}
									color={pieChartData[idx]?.color || '#F2F2F2'}
									isMaxAllocation={isMaxAllocation}
									disabled={flp.status !== 'active' || flp.starts_at_ts > Date.now()}
									onAllocationChange={(change) => handleAllocationChange(flp.flp_token_process, change)}
								/>
							))}
						</div>
					</div>

					<S.SubmitButton>Submit Changes</S.SubmitButton>
				</S.AllocationPanel>
			</div>
		</S.Container>
	);
}
