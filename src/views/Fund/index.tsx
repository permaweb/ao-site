import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { retryable } from 'helpers/network';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { getDelegationRecords, getFlps, getLastDelegationRecord } from '../../api/fair-launch-api';
import { formatNumber, formatTicker, parseBigIntAsNumber } from '../../helpers/format';
import { FLF_PROCESS } from '../../settings';

import { AllocationItem } from './components/AllocationItem';
import { AllocationPieChart } from './components/AllocationPieChart';
import { ArrowSquareDownIcon } from './components/ArrowSquareDownIcon';
import { InMemoryTable } from './components/InMemoryTable';
import { LoadingSkeletons, Skeleton } from './components/LoadingSkeletons';
import { PiFavicon } from './components/PiFavicon';
import { TokenAvatar } from './components/TokenAvatar';
import { TrendChart } from './components/TrendChart';
import * as S from './styles';

const CORE_PROJECTS = [
	{
		id: 'pi',
		name: 'Permaweb Index',
		ticker: 'PI',
		logo: ASSETS.pi,
		process: 'TODO',
		description:
			'Diversify your AO rewards with PI, a token representing the permaweb. PI is composed of 1/3 AO, 1/3 Arweave (AR), and 1/3 ecosystem project tokens.',
	},
	{
		id: 'arweave',
		name: 'Arweave',
		ticker: 'AR',
		logo: ASSETS.arweave,
		process: 'TODO',
		description:
			'Turn your AO yield into Arweave. Your AO yield will return you back AR tokens for permanent data storage use.',
	},
	{
		id: 'ao',
		name: 'AO',
		ticker: 'AO',
		logo: ASSETS.aoCircled,
		process: '0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc',
		description:
			'Keep earning AO. Your AR holding yield and deposits will continue to accrue AO without any reallocation.',
	},
];

export default function Fund() {
	const [tabIndex, setTabIndex] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [allocations, setAllocations] = useState<Record<string, number>>({});
	const [pageSize, setPageSize] = useState(10);
	const [expandedRows, setExpandedRows] = useState<string[]>([]);

	const { data: allFlps } = useQuery({
		queryKey: ['allFlps'],
		queryFn: () => retryable(getFlps)(FLF_PROCESS),
	});

	const { data: lastDelegationRecord } = useQuery({
		queryKey: ['lastDelegationRecord'],
		queryFn: () => retryable(getLastDelegationRecord)(),
	});

	const { data: delegationRecords } = useQuery({
		queryKey: ['delegationRecords'],
		queryFn: () => retryable(getDelegationRecords)(),
	});

	const getProjectYield = (projectProcess) => {
		if (
			!lastDelegationRecord ||
			!lastDelegationRecord.directDelegations ||
			lastDelegationRecord.directDelegations.length === 0
		) {
			return 0;
		}

		const lastDirectDelegation = lastDelegationRecord.directDelegations[0];
		return Number(parseBigIntAsNumber(lastDirectDelegation.projectYields?.[projectProcess] || '0', 12));
	};

	const sortedAndFilteredFlps = useMemo(() => {
		if (!allFlps) return [];

		const filtered = allFlps.filter((flp) => {
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				if (
					!(
						flp.flp_name?.toLowerCase().includes(query) ||
						flp.flp_token_name?.toLowerCase().includes(query) ||
						flp.flp_token_ticker?.toLowerCase().includes(query) ||
						flp.flp_token_process?.toLowerCase().includes(query)
					)
				) {
					return false;
				}
			}

			if (tabIndex === 0) {
				const projectYield = getProjectYield(flp.id);
				return typeof projectYield === 'number' && projectYield > 10;
			} else {
				return true;
			}
		});

		return [...filtered].sort((a, b) => {
			if (tabIndex === 0) {
				return getProjectYield(b.id) - getProjectYield(a.id);
			}
			return b.starts_at_ts - a.starts_at_ts;
		});
	}, [allFlps, searchQuery, tabIndex, lastDelegationRecord]);

	const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
	const isMaxAllocation = totalAllocation >= 100;

	const handleAllocationChange = (token: string, change: number) => {
		if (isMaxAllocation && change > 0) return;
		setAllocations((prev) => ({
			...prev,
			[token]: Math.max(0, Math.min(100, (prev[token] || 0) + change)),
		}));
	};

	const coreTokenColors = {
		pi: '#8884d8',
		arweave: '#82ca9d',
		ao: '#ffc658',
	};

	const flpColorMap = useMemo(() => {
		const colorPalette = ['#0088fe', '#00C49F', '#FFBB28', '#FF8042', '#ff8042'];
		return (allFlps || []).reduce((acc, flp, idx) => {
			acc[flp.id] = colorPalette[idx % colorPalette.length];
			return acc;
		}, {});
	}, [allFlps]);

	const pieChartData = useMemo(
		() => [
			...CORE_PROJECTS.map((project) => ({
				token: project.ticker,
				percentage: allocations[project.id] || 0,
				color: coreTokenColors[project.id],
			})),
			...(allFlps?.map((flp) => ({
				token: flp.flp_token_ticker,
				percentage: allocations[flp.id] || 0,
				color: flpColorMap[flp.id],
			})) || []),
		],
		[allocations, allFlps, flpColorMap]
	);

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
							<S.StatLabel>TOTAL DELEGATED</S.StatLabel>
							<S.StatValue>
								{lastDelegationRecord ? (
									formatNumber(parseBigIntAsNumber(lastDelegationRecord?.summary?.Data.totalDelegatedAO, 12), {
										notation: 'compact',
									})
								) : (
									<Skeleton width={60} height={24} />
								)}
							</S.StatValue>
						</div>
						<TrendChart
							height={50}
							delegationRecords={delegationRecords}
							dataKey="totalDelegatedAO"
							isLoading={!delegationRecords}
						/>
					</S.StatCard>
					<S.StatCard>
						<div>
							<S.StatLabel>FAIR LAUNCH PROJECTS</S.StatLabel>
							<S.StatValue>{allFlps ? allFlps.length : <Skeleton width={60} height={24} />}</S.StatValue>
						</div>
						<TrendChart height={50} delegationRecords={createCumulativeFlpData(allFlps)} isLoading={!allFlps} />
					</S.StatCard>
					<S.StatCard>
						<div>
							<S.StatLabel>USERS</S.StatLabel>
							<S.StatValue>
								{lastDelegationRecord ? (
									lastDelegationRecord?.summary?.Data.totalDelegators
								) : (
									<Skeleton width={60} height={24} />
								)}
							</S.StatValue>
						</div>
						<TrendChart
							height={50}
							delegationRecords={delegationRecords}
							dataKey="totalDelegators"
							isLoading={!delegationRecords}
						/>
					</S.StatCard>
				</S.StatsGrid>

				<div>
					<S.SectionTitle>
						<PiFavicon />
						Add the core of the Permaweb to your allocation.
					</S.SectionTitle>

					<S.CoreTokensContainer>
						{CORE_PROJECTS.map((token) => (
							<S.CoreTokenCard key={token.id}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
									<S.CoreTokenHeader>
										<TokenAvatar logo={token.logo} size="large" />
										<S.CoreTokenName>{token.name}</S.CoreTokenName>
										<S.CoreTokenTicker>${token.ticker}</S.CoreTokenTicker>
									</S.CoreTokenHeader>
									<S.Subtitle>{token.description}</S.Subtitle>
								</div>
								<S.CardAddButton onClick={() => handleAllocationChange(token.id, 5)} disabled={isMaxAllocation}>
									<ReactSVG src={ASSETS.plus} />
									Add
								</S.CardAddButton>
							</S.CoreTokenCard>
						))}
					</S.CoreTokensContainer>
				</div>

				<div>
					<S.SectionTitle>
						<PiFavicon />
						Add Permaweb projects to your current allocation.
					</S.SectionTitle>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 20,
						}}
					>
						<S.TabsContainer>
							<S.Tab active={tabIndex === 0} onClick={() => setTabIndex(0)}>
								Popular Delegations
							</S.Tab>
							<S.Tab active={tabIndex === 1} onClick={() => setTabIndex(1)}>
								Explore Delegations
							</S.Tab>
						</S.TabsContainer>

						<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
							<S.SearchBar>
								<S.SearchInput
									placeholder="Search for Project..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</S.SearchBar>
						</div>
					</div>

					<InMemoryTable
						data={sortedAndFilteredFlps}
						pageSize={pageSize}
						onLoadMore={() => setPageSize((prev) => prev + 30)}
						sortedBy={tabIndex === 0 ? 'amount_delegated' : 'starts_at_ts'}
						headerCells={[
							{ style: { width: 50, minWidth: 50, maxWidth: 50 }, label: '#', align: 'center' },
							{ style: { width: 220, minWidth: 220, maxWidth: 220 }, label: 'NAME' },
							{
								style: { width: 200, minWidth: 200, maxWidth: 200 },
								label: 'TOTAL AO DELEGATED',
								key: 'amount_delegated',
							},
							{ style: { width: 200, minWidth: 200, maxWidth: 200 }, label: 'DELEGATED LAST CYCLE' },
							{ style: { width: 180, minWidth: 180, maxWidth: 180 }, label: 'DATE STARTED', key: 'starts_at_ts' },
							{ style: { width: 180, minWidth: 180, maxWidth: 180 }, label: 'ADD TO ALLOCATION', align: 'right' },
						]}
						renderRow={(row: any, index: number) => (
							<React.Fragment key={row.id}>
								<S.TableRow
									onClick={() => {
										setExpandedRows((prev) =>
											prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]
										);
									}}
									className={expandedRows.includes(row.id) ? 'expanded' : ''}
								>
									<S.TableCell align="center">{index + 1}</S.TableCell>
									<S.TableCell>
										<S.TokenInfo>
											<TokenAvatar logo={row.flp_token_logo} size="large" />
											{row.flp_token_name && <span>{row.flp_token_name}</span>}
											<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
										</S.TokenInfo>
									</S.TableCell>
									<S.TableCell>
										<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
											<span>{formatNumber(getProjectYield(row.id))}</span>
											<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
										</div>
									</S.TableCell>
									<S.TableCell>
										<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
											<span>{formatNumber(getProjectYield(row.id))}</span>
											<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
										</div>
									</S.TableCell>
									<S.TableCell>{formatDate(row.starts_at_ts, 'dateString') || 'Unknown'}</S.TableCell>
									<S.TableCell align="right">
										<S.RowActionContainer>
											<S.SeeDetailsButton
												onClick={(e) => {
													e.stopPropagation();
													setExpandedRows((prev) =>
														prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]
													);
												}}
											>
												<div style={{ width: 200, height: 1, borderBottom: '1px solid #C8C8C8' }} />
												<span>{expandedRows.includes(row.id) ? 'Close Details' : 'See Details'}</span>
												<ArrowSquareDownIcon
													style={{ transform: expandedRows.includes(row.id) ? 'rotate(180deg)' : 'rotate(0deg)' }}
												/>
												<div style={{ width: 200, height: 1, borderBottom: '1px solid #C8C8C8' }} />
											</S.SeeDetailsButton>
											<S.AddButton
												onClick={(e) => {
													e.stopPropagation();
													e.preventDefault();
													handleAllocationChange(row.id, 5);
												}}
												disabled={isMaxAllocation || row.status !== 'Active' || row.starts_at_ts > Date.now()}
											>
												Add
											</S.AddButton>
										</S.RowActionContainer>
									</S.TableCell>
								</S.TableRow>
								{expandedRows.includes(row.id) && (
									<S.DetailsRow>
										<S.DetailsCell colSpan={6}>
											<S.DetailsContent>
												<div>
													<S.SocialLinks>
														{row.twitter_handle && (
															<Link to={`https://x.com/${row.twitter_handle}`}>
																<ReactSVG src={ASSETS.x} />
															</Link>
														)}
														{/* <Link to={`https://github.com/${row.flp_github}`}>
														<ReactSVG src={ASSETS.github} />
													</Link> */}
														{/* <Link to={`https://${row.flp_token_discord}`}>
														<ReactSVG src={ASSETS.discord} />
													</Link> */}
														{/* {
														row.telegram_handle && (
															<Link to={`https://telegram.me/${row.telegram_handle}`}>
																<ReactSVG src={ASSETS.telegram} />
															</Link>
														)
													} */}
														{row.website_url && (
															<Link to={row.website_url}>
																<ReactSVG src={ASSETS.website} />
															</Link>
														)}
													</S.SocialLinks>

													<S.DetailsDescription>
														{row.description ||
															'Elevate your decentralized GPU experience with AI Nexus, a groundbreaking token that represents the future of artificial intelligence. AI Nexus is developed from a fusion of 1/3 Quantum Compute, 1/3 Neural Network (NN), and 1/3 tokens from diverse tech ecosystem projects.'}
													</S.DetailsDescription>
												</div>

												<S.DetailsSectionsGrid>
													<div>
														<S.DetailsSectionHeading>Unlock Date</S.DetailsSectionHeading>
														<S.DetailSectionContent>
															<div>
																<S.DetailsSectionLabel>TOKEN UNLOCKS</S.DetailsSectionLabel>
																<S.DetailsSectionValue>Feb 21st, 2034</S.DetailsSectionValue>
															</div>
															<div>
																<S.DetailsSectionLabel>RUN TIME</S.DetailsSectionLabel>
																<S.DetailsSectionValue style={{ color: '#51C85B' }}>
																	2 years, 1 day left
																</S.DetailsSectionValue>
															</div>
														</S.DetailSectionContent>
													</div>

													<div>
														<S.DetailsSectionHeading>Amount</S.DetailsSectionHeading>
														<S.DetailSectionContent>
															<div>
																<S.DetailsSectionLabel>DELEGATORS</S.DetailsSectionLabel>
																<S.DetailsSectionValue>6,000,000,000</S.DetailsSectionValue>
															</div>
														</S.DetailSectionContent>
													</div>

													<div>
														<S.DetailsSectionHeading>Supply</S.DetailsSectionHeading>
														<S.DetailSectionContent>
															<div>
																<S.DetailsSectionLabel>TOTAL FAIR LAUNCH VS TOTAL SUPPLY</S.DetailsSectionLabel>
																<S.DetailsSectionValue>2,000,000,000 / 3,000,000,000</S.DetailsSectionValue>
															</div>
															<div>
																<S.DetailsSectionLabel>PERCENTAGE OF SUPPLY</S.DetailsSectionLabel>
																<S.DetailsSectionValue>90%</S.DetailsSectionValue>
															</div>
															<div>
																<S.DetailsSectionLabel>DECAY RATE</S.DetailsSectionLabel>
																<S.DetailsSectionValue>0.5</S.DetailsSectionValue>
															</div>
														</S.DetailSectionContent>
													</div>
												</S.DetailsSectionsGrid>
											</S.DetailsContent>
										</S.DetailsCell>
									</S.DetailsRow>
								)}
							</React.Fragment>
						)}
					/>
				</div>
			</S.LeftPanel>
			<S.AllocationPanel>
				<S.Title>Allocation</S.Title>
				<S.Subtitle>The below Pie Chart represents how you are currently allocating your AO Yield</S.Subtitle>

				<AllocationPieChart data={pieChartData} />

				<div style={{ marginTop: '1rem' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
						<S.SectionTitle style={{ fontWeight: 500, margin: 0 }}>Summary</S.SectionTitle>
						<S.SectionTitle style={{ fontWeight: 500, margin: 0 }}>%</S.SectionTitle>
					</div>

					<div style={{ borderTop: '1px solid #eee', margin: '0.5rem 0' }} />

					{isMaxAllocation && (
						<div style={{ padding: '0.5rem 1rem', fontSize: '12px', color: '#666' }}>
							You are at 100%, you must remove some percentage of allocation to begin adding more.
						</div>
					)}

					<div style={{ maxHeight: 350, overflowY: 'auto' }}>
						<S.AllocationContainer>
							<S.SectionTitle style={{ fontWeight: 500, margin: 0, fontSize: 12, marginBottom: 6 }}>
								Core Permaweb Tokens
							</S.SectionTitle>
							{CORE_PROJECTS.map((project) => (
								<AllocationItem
									key={project.id}
									logo={project.logo}
									ticker={project.ticker}
									percentage={allocations[project.id] || 0}
									color={coreTokenColors[project.id]}
									isMaxAllocation={isMaxAllocation}
									onAllocationChange={(change) => handleAllocationChange(project.id, change)}
								/>
							))}
						</S.AllocationContainer>

						{allFlps
							?.filter((flp) => allocations[flp.id] && allocations[flp.id] > 0)
							.map((flp) => (
								<AllocationItem
									key={flp.id}
									ticker={flp.flp_token_ticker}
									logo={flp.flp_token_logo}
									percentage={allocations[flp.id] || 0}
									color={flpColorMap[flp.id] || '#F2F2F2'}
									isMaxAllocation={isMaxAllocation}
									disabled={flp.status !== 'Active' || flp.starts_at_ts > Date.now()}
									onAllocationChange={(change) => handleAllocationChange(flp.id, change)}
								/>
							))}
					</div>
				</div>

				<S.SubmitButton>Submit Changes</S.SubmitButton>
			</S.AllocationPanel>
		</S.Container>
	);
}

const createCumulativeFlpData = (flps) => {
	if (!flps || flps.length === 0) return [];

	const sortedFlps = [...flps]
		.filter((flp) => flp && typeof flp.created_at_ts === 'number')
		.sort((a, b) => a.created_at_ts - b.created_at_ts);

	const dailyData = [];
	let cumulativeCount = 0;

	const dateCountMap = {};

	sortedFlps.forEach((flp) => {
		const date = new Date(flp.created_at_ts);
		const dayTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

		dateCountMap[dayTimestamp] = (dateCountMap[dayTimestamp] || 0) + 1;
	});

	const sortedDays = Object.keys(dateCountMap)
		.map(Number)
		.sort((a, b) => a - b);

	sortedDays.forEach((dayTimestamp) => {
		cumulativeCount += dateCountMap[dayTimestamp];
		dailyData.push({
			timestamp: dayTimestamp,
			count: dateCountMap[dayTimestamp],
			cumulativeCount,
		});
	});

	return dailyData.map((item) => ({
		summary: {
			Timestamp: item.timestamp,
			Data: {
				totalDelegators: item.cumulativeCount.toString(),
			},
		},
	}));
};
