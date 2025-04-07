import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'components/atoms/Button';
import { retryable } from 'helpers/network';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { getAggregatedStats, getFlps } from '../../api/fair-launch-api';
import { formatNumber, formatTicker } from '../../helpers/format';
import { FLF_PROCESS } from '../../settings';

import { AllocationItem } from './components/AllocationItem';
import { AllocationPieChart } from './components/AllocationPieChart';
import { InMemoryTable } from './components/InMemoryTable';
import { LoadingSkeletons } from './components/LoadingSkeletons';
import { TokenAvatar } from './components/TokenAvatar';
import { TrendChart } from './components/TrendChart';
import * as S from './styles';

// Core Permaweb tokens
const CORE_TOKENS = [
	{
		id: 'pi',
		name: 'Permaweb Index',
		ticker: '$PI',
		process: 'permaweb-index',
		description:
			'Diversify your AO rewards with PI, a token representing the permaweb. PI is composed of 1/3 AO, 1/3 Arweave (AR), and 1/3 ecosystem project tokens.',
	},
	{
		id: 'arweave',
		name: 'Arweave',
		ticker: '$AR',
		process: 'arweave',
		description:
			'Turn your AO yield into Arweave. Your AO yield will return you back AR tokens for permanent data storage use.',
	},
	{
		id: 'ao',
		name: 'AO',
		ticker: '$AO',
		process: 'ao',
		description:
			'Keep earning AO. Your AR holding yield and deposits will continue to accrue AO without any reallocation.',
	},
];

export default function Fund() {
	const [tabIndex, setTabIndex] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [allocations, setAllocations] = useState<Record<string, number>>({});
	const [pageSize, setPageSize] = useState(30);

	const { data: allFlps } = useQuery({
		queryKey: ['allFlps'],
		queryFn: () =>
			retryable(getFlps)(FLF_PROCESS).then((flps) => {
				return flps.map((flp) => ({
					...flp,
					amount_delegated: Math.floor(Math.random() * 10000000),
					market_cap: Math.floor(Math.random() * 10000000),
				}));
			}),
	});

	const { data: stats } = useQuery({
		queryKey: ['stats'],
		queryFn: () => retryable(getAggregatedStats)(FLF_PROCESS),
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

	const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
	const isMaxAllocation = totalAllocation >= 100;

	const handleAllocationChange = (token: string, change: number) => {
		if (isMaxAllocation && change > 0) return;
		setAllocations((prev) => ({
			...prev,
			[token]: Math.max(0, Math.min(100, (prev[token] || 0) + change)),
		}));
	};

	// Generate colors for core tokens
	const coreTokenColors = {
		'permaweb-index': '#8884d8',
		arweave: '#82ca9d',
		ao: '#ffc658',
	};

	// Combine core tokens and FLPs for the pie chart
	const pieChartData = [
		...CORE_TOKENS.map((token) => ({
			token: token.ticker,
			percentage: allocations[token.process] || 0,
			color: coreTokenColors[token.process],
		})),
		...(allFlps?.map((flp, idx) => ({
			token: flp.flp_token_ticker,
			percentage: allocations[flp.flp_token_process] || 0,
			color: ['#0088fe', '#00C49F', '#FFBB28', '#FF8042', '#ff8042'][idx % 5],
		})) || []),
	];

	const arProvider = useArweaveProvider();

	if (!allFlps) return <LoadingSkeletons />;

	return (
		<S.Container style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'flex-start', marginBottom: 60 }}>
			<S.LeftPanel>
				<S.Header>
					<S.HeaderContent>
						<div>
							<S.Title>Discover Permaweb Fair Launch Projects</S.Title>
							<S.Subtitle>
								The Permaweb Index is a permissionless ecosystem fund that allows delegation
								<br /> of your yield to a variety of Permaweb ecosystem projects.
							</S.Subtitle>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
							<S.DashboardLink to="/fund/dashboard">View Dashboard {'>'}</S.DashboardLink>
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

				<S.StatsGrid>
					<S.StatCard>
						<div>
							<S.StatLabel>TOTAL DELEGATIONS</S.StatLabel>
							<S.StatValue>$3.5M</S.StatValue>
						</div>
						<TrendChart height={50} />
					</S.StatCard>
					<S.StatCard>
						<div>
							<S.StatLabel>FAIR LAUNCH PROJECTS</S.StatLabel>
							<S.StatValue>150</S.StatValue>
						</div>
						<TrendChart height={50} />
					</S.StatCard>
					<S.StatCard>
						<div>
							<S.StatLabel>USERS</S.StatLabel>
							<S.StatValue>250M</S.StatValue>
						</div>
						<TrendChart height={50} />
					</S.StatCard>
				</S.StatsGrid>

				{/* Core Permaweb Tokens Section */}
				<S.SectionTitle>
					<S.Icon>π</S.Icon> Add the core of the Permaweb to your allocation.
				</S.SectionTitle>

				<S.CoreTokensContainer>
					{CORE_TOKENS.map((token) => (
						<S.CoreTokenCard key={token.id}>
							<S.CoreTokenHeader>
								<S.CoreTokenIcon type={token.id}>
									{token.id === 'pi' ? 'π' : token.id === 'arweave' ? 'a' : 'AO'}
								</S.CoreTokenIcon>
								<S.CoreTokenName>
									{token.name} <S.CoreTokenTicker>{token.ticker}</S.CoreTokenTicker>
								</S.CoreTokenName>
							</S.CoreTokenHeader>
							<S.Subtitle>{token.description}</S.Subtitle>
							<S.AddButtonContainer>
								<S.AddButton onClick={() => handleAllocationChange(token.process, 5)} disabled={isMaxAllocation}>
									Add
								</S.AddButton>
							</S.AddButtonContainer>
						</S.CoreTokenCard>
					))}
				</S.CoreTokensContainer>

				{/* Projects Section */}
				<S.SectionTitle style={{ marginTop: '40px' }}>
					<S.Icon>π</S.Icon> Add Permaweb projects to your current allocation.
				</S.SectionTitle>

				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
				</div>

				<InMemoryTable
					data={sortedAndFilteredFlps}
					pageSize={pageSize}
					onLoadMore={() => setPageSize((prev) => prev + 30)}
					sortedBy={tabIndex === 0 ? 'amount_delegated' : 'starts_at_ts'}
					headerCells={[
						{ style: { width: 50, minWidth: 50, maxWidth: 50 }, label: '#', align: 'center' },
						{ style: { width: 220, minWidth: 220, maxWidth: 220 }, label: 'NAME' },
						{ style: { width: 200, minWidth: 200, maxWidth: 200 }, label: 'AMOUNT DELEGATED', key: 'amount_delegated' },
						{ style: { width: 200, minWidth: 200, maxWidth: 200 }, label: 'MARKET CAP' },
						{ style: { width: 180, minWidth: 180, maxWidth: 180 }, label: 'DATE STARTED', key: 'starts_at_ts' },
						{ style: { width: 180, minWidth: 180, maxWidth: 180 }, label: 'ADD TO ALLOCATION', align: 'right' },
					]}
					renderRow={(row: any, index: number) => (
						<tr key={row.id}>
							<S.TableCell align="center">{index + 1}</S.TableCell>
							<S.TableCell>
								<S.TokenInfo>
									<TokenAvatar logo={row.flp_token_logo} size="large" />
									<span>{row.flp_token_name}</span>
									<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
								</S.TokenInfo>
							</S.TableCell>
							<S.TableCell>${formatNumber(row.amount_delegated)}</S.TableCell>
							<S.TableCell>${formatNumber(row.market_cap)}</S.TableCell>
							<S.TableCell>{formatDate(row.starts_at_ts, 'dateString') || 'Unknown'}</S.TableCell>
							<S.TableCell align="right">
								<S.AddButton
									onClick={() => handleAllocationChange(row.flp_token_process, 5)}
									disabled={isMaxAllocation || row.status !== 'Active' || row.starts_at_ts > Date.now()}
								>
									Add
								</S.AddButton>
							</S.TableCell>
						</tr>
					)}
				/>
			</S.LeftPanel>
			<S.AllocationPanel>
				<S.Title>Allocation</S.Title>
				<S.Subtitle>The below Pie Chart represents how you are currently allocating your AO Yield</S.Subtitle>

				<AllocationPieChart data={pieChartData} />

				<div style={{ marginTop: '1rem' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
						<span style={{ fontWeight: 500 }}>Summary</span>
						<span style={{ fontWeight: 500 }}>%</span>
					</div>

					<div style={{ borderTop: '1px solid #eee', margin: '0.5rem 0' }} />

					<div>
						<span style={{ fontWeight: 500 }}>Core Permaweb Tokens</span>
					</div>

					<div style={{ maxHeight: 350, overflowY: 'auto' }}>
						{/* Core Tokens */}
						{CORE_TOKENS.map((token) => (
							<AllocationItem
								key={token.id}
								token={token.process}
								ticker={token.ticker}
								percentage={allocations[token.process] || 0}
								color={coreTokenColors[token.process]}
								isMaxAllocation={isMaxAllocation}
								isCore={true}
								onAllocationChange={(change) => handleAllocationChange(token.process, change)}
							/>
						))}

						{/* Message if allocation is at 100% */}
						{isMaxAllocation && (
							<div style={{ padding: '0.5rem 1rem', fontSize: '12px', color: '#666' }}>
								You are at 100%, you must remove some percentage of allocation to begin adding more.
							</div>
						)}

						{/* Project Tokens */}
						{allFlps?.map((flp, idx) => (
							<AllocationItem
								key={flp.id}
								token={flp.flp_token_process}
								ticker={flp.flp_token_ticker}
								logo={flp.flp_token_logo}
								percentage={allocations[flp.flp_token_process] || 0}
								color={pieChartData[CORE_TOKENS.length + idx]?.color || '#F2F2F2'}
								isMaxAllocation={isMaxAllocation}
								disabled={flp.status !== 'Active' || flp.starts_at_ts > Date.now()}
								onAllocationChange={(change) => handleAllocationChange(flp.flp_token_process, change)}
							/>
						))}
					</div>
				</div>

				<S.SubmitButton>Submit Changes</S.SubmitButton>
			</S.AllocationPanel>
		</S.Container>
	);
}
