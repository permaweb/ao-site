import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { AO, ASSETS, STYLING } from 'helpers/config';
import { retryable } from 'helpers/network';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import {
	getDelegationRecords,
	getFlps,
	getLastDelegationRecord,
	getTotalDelegated,
	getUserDelegations,
	setDelegation,
	UserDelegationResponse,
} from '../../api/fair-launch-api';
import { formatNumber, parseBigIntAsNumber } from '../../helpers/format';

import { AllocationItem } from './components/AllocationItem';
import { AllocationPieChart } from './components/AllocationPieChart';
import { InMemoryTable } from './components/InMemoryTable';
import { LoadingSkeletons, Skeleton } from './components/LoadingSkeletons';
import { PiFavicon } from './components/PiFavicon';
import { TableRow } from './components/TableRow';
import { TokenAvatar } from './components/TokenAvatar';
import Tooltip from './components/Tooltip';
import { TrendChart } from './components/TrendChart';
import * as S from './styles';

const coreTokenColors = {
	pi: '#BBBAD9',
	arweave: '#BEEFD1',
	ao: '#E5E3D7',
};

export default function Fund() {
	const [tabIndex, setTabIndex] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [allocations, setAllocations] = useState<Record<string, number>>({});
	const [pageSize, setPageSize] = useState(10);
	const [expandedRows, setExpandedRows] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showAllocationModal, setShowAllocationModal] = useState(false);

	const { data: allFlps } = useQuery({
		queryKey: ['allFlps'],
		queryFn: () => retryable(getFlps)(AO.flpFactory),
	});

	const { data: lastDelegationRecord } = useQuery({
		queryKey: ['lastDelegationRecord'],
		queryFn: () => retryable(getLastDelegationRecord)(),
	});

	const { data: totalDelegated } = useQuery({
		queryKey: ['totalDelegated'],
		queryFn: () => retryable(getTotalDelegated)(),
	});

	const { data: delegationRecords } = useQuery({
		queryKey: ['delegationRecords'],
		queryFn: () => retryable(getDelegationRecords)(),
	});

	const arProvider = useArweaveProvider();

	const { data: userDelegations, refetch: refetchUserDelegations } = useQuery<UserDelegationResponse | null>({
		queryKey: ['userDelegations', arProvider.walletAddress],
		queryFn: () => retryable(getUserDelegations)(arProvider.walletAddress),
		enabled: !!arProvider.walletAddress,
	});

	const CORE_PROJECTS = [
		{
			id: 'pi',
			name: 'Permaweb Index',
			ticker: 'PI',
			logo: ASSETS.pi,
			process: AO.piProcess,
			description:
				'Diversify your AO rewards with PI, a token representing the permaweb. PI is composed of 1/3 AO, 1/3 Arweave (AR), and 1/3 ecosystem project tokens.',
		},
		{
			id: 'arweave',
			name: 'Arweave',
			ticker: 'AR',
			logo: ASSETS.arweave,
			disabled: true,
			process: 'TODO',
			description:
				'Turn your AO yield into Arweave. Your AO yield will return you back AR tokens for permanent data storage use.',
		},
		{
			id: 'ao',
			name: 'AO',
			ticker: 'AO',
			logo: ASSETS.aoCircled,
			process: arProvider.walletAddress,
			description:
				'Keep earning AO. Your AR holding yield and deposits will continue to accrue AO without any reallocation.',
		},
	];

	useEffect(() => {
		if (userDelegations && userDelegations.delegationPrefs) {
			const initialAllocations: Record<string, number> = {};
			let totalAllocated = 0;

			CORE_PROJECTS.forEach((project) => {
				// Skip AO for now, we'll calculate it last
				if (project.id === 'ao') return;

				const delegation = userDelegations.delegationPrefs.find((pref) => pref.walletTo === project.process);

				if (delegation) {
					initialAllocations[project.id] = delegation.factor / 100;
					totalAllocated += delegation.factor / 100;
				}
			});

			if (allFlps) {
				allFlps.forEach((flp) => {
					const delegation = userDelegations.delegationPrefs.find((pref) => pref.walletTo === flp.id);

					if (delegation) {
						initialAllocations[flp.id] = delegation.factor / 100;
						totalAllocated += delegation.factor / 100;
					}
				});
			}

			// Assign remaining allocation to AO
			const aoAllocation = 100 - totalAllocated;
			if (aoAllocation > 0) {
				initialAllocations['ao'] = aoAllocation;
			} else {
				// If there's an explicit AO allocation, use it
				const aoProject = CORE_PROJECTS.find((p) => p.id === 'ao');
				const aoExplicitDelegation = userDelegations.delegationPrefs.find(
					(pref) => aoProject && pref.walletTo === aoProject.process
				);

				if (aoExplicitDelegation) {
					initialAllocations['ao'] = aoExplicitDelegation.factor / 100;
				}
			}

			setAllocations(initialAllocations);
		}
	}, [userDelegations, allFlps, submitError]);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const getProjectYield = (flpId) => {
		if (!lastDelegationRecord || !lastDelegationRecord.delegations || lastDelegationRecord.delegations.length === 0) {
			return 0;
		}

		const lastDirectDelegation = lastDelegationRecord.delegations[0];
		return Number(parseBigIntAsNumber(lastDirectDelegation.projectYields?.[flpId] || '0', 12));
	};

	const getProjectPiYield = (flpId) => {
		if (!lastDelegationRecord || !lastDelegationRecord.delegations || lastDelegationRecord.delegations.length === 0) {
			return 0;
		}

		const lastDirectDelegation = lastDelegationRecord.delegations[0];
		return Number(parseBigIntAsNumber(lastDirectDelegation.approximateProjectPiYields?.[flpId] || '0', 12));
	};

	const totalProjectYields = useMemo(() => {
		if (!totalDelegated || !totalDelegated.combined) return {};

		return Object.entries(totalDelegated.combined).reduce((acc, [key, value]) => {
			acc[key] = Number(parseBigIntAsNumber(value || '0', 12));
			return acc;
		}, {});
	}, [totalDelegated]);

	const getTotalProjectYield = (flpId) => {
		return totalProjectYields[flpId] || 0;
	};

	const sortedAndFilteredFlps = useMemo(() => {
		if (!allFlps) return [];

		const filtered = allFlps.filter((flp) => {
			if (!flp.flp_token_name) return false;

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				if (
					!(
						flp.id?.toLowerCase().includes(query) ||
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
				const projectYield = getTotalProjectYield(flp.id);
				return typeof projectYield === 'number' && projectYield > 1;
			} else {
				return true;
			}
		});

		return [...filtered].sort((a, b) => {
			if (tabIndex === 0) {
				return getTotalProjectYield(b.id) - getTotalProjectYield(a.id);
			}

			if (b.starts_at_ts - a.starts_at_ts === 0) {
				return a.flp_token_name.localeCompare(b.flp_token_name);
			}
			return b.starts_at_ts - a.starts_at_ts;
		});
	}, [allFlps, searchQuery, tabIndex, lastDelegationRecord, totalDelegated]);

	const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
	const isMaxAllocation = totalAllocation >= 100;
	const nonAoTotalAllocation = Object.entries(allocations)
		.filter(([key]) => key !== 'ao')
		.reduce((sum, [_, value]) => sum + value, 0);
	const cannotAllocateMore = nonAoTotalAllocation >= 100;

	const handleAllocationChange = (token: string, change: number) => {
		if (!arProvider.walletAddress) {
			arProvider.setWalletModalVisible(true);
			return;
		}
		if (isSubmitting) return;

		// Don't allow direct modification of AO through this function
		if (token === 'ao' && change !== 0) return;

		// For adding to other tokens, subtract from AO if possible
		if (change > 0 && token !== 'ao') {
			// Calculate total without AO
			const totalWithoutAO = Object.entries(allocations)
				.filter(([key]) => key !== 'ao')
				.reduce((sum, [_, value]) => sum + value, 0);

			// If we're already at max allocation, don't allow further addition
			if (totalWithoutAO >= 100) return;

			// If adding would exceed 100%, adjust the change amount
			if (totalWithoutAO + change > 100) {
				change = 100 - totalWithoutAO;
			}

			// Update allocations by adding to the token and removing from AO
			setAllocations((prev) => {
				const aoAllocation = prev['ao'] || 100 - totalWithoutAO;
				if (aoAllocation < change) return prev; // Don't change if not enough AO allocation

				return {
					...prev,
					[token]: Math.max(0, Math.min(100, (prev[token] || 0) + change)),
					ao: Math.max(0, aoAllocation - change),
				};
			});
		}
		// For reducing other tokens, add back to AO
		else if (change < 0 && token !== 'ao') {
			setAllocations((prev) => {
				const currentValue = prev[token] || 0;
				const newTokenValue = currentValue + change;

				// If reducing would bring the value below 5%, set it to 0 instead
				const finalTokenValue = newTokenValue < 5 && newTokenValue > 0 ? 0 : Math.max(0, Math.min(100, newTokenValue));
				const aoAllocation = prev['ao'] || 0;

				// Calculate how much to add back to AO (the difference between current and final value)
				const amountToAddToAO = currentValue - finalTokenValue;

				return {
					...prev,
					[token]: finalTokenValue,
					ao: Math.min(100, aoAllocation + amountToAddToAO), // add the removed amount to AO
				};
			});
		}
	};

	const flpColorMap = useMemo(() => {
		const colorPalette = [
			'#F9E1C9',
			'#C5DEC2',
			'#F8F1E1',
			'#E5E3D7',
			'#E2E4E8',
			'#B6D8D8',
			'#CFCEE0',
			'#EDDFD2',
			'#C3D8C1',
			'#EDD7E7',
			'#E9D6D4',
			'#E2E4E8',
			'#D8D7E8',
			'#EAEEDC',
			'#C7E1C3',
			'#EDF8F5',
			'#BEEFD1',
			'#C2D1E1',
			'#D8EDED',
		];
		return (allFlps || []).reduce((acc, flp) => {
			const idAsNumber = flp.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
			acc[flp.id] = colorPalette[idAsNumber % colorPalette.length];
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

	const handleSubmitChanges = async () => {
		if (!arProvider.walletAddress) {
			arProvider.setWalletModalVisible(true);
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const currentDelegations = userDelegations?.delegationPrefs || [];

			const changes = [];

			for (const project of CORE_PROJECTS) {
				const currentDelegation = currentDelegations.find((pref) => pref.walletTo === project.process);

				const newFactor = Math.round((allocations[project.id] || 0) * 100);

				if (currentDelegation && currentDelegation.factor > newFactor) {
					changes.push({
						type: 'reduce',
						walletTo: project.process,
						factor: newFactor,
					});
				} else if (!currentDelegation && newFactor > 0) {
					changes.push({
						type: 'increase',
						walletTo: project.process,
						factor: newFactor,
					});
				} else if (currentDelegation && currentDelegation.factor < newFactor) {
					changes.push({
						type: 'increase',
						walletTo: project.process,
						factor: newFactor,
					});
				}
			}

			if (allFlps) {
				for (const flp of allFlps) {
					const currentDelegation = currentDelegations.find((pref) => pref.walletTo === flp.id);

					const newFactor = Math.round((allocations[flp.id] || 0) * 100);

					if (currentDelegation && currentDelegation.factor > newFactor) {
						changes.push({
							type: 'reduce',
							walletTo: flp.id,
							factor: newFactor,
						});
					} else if (!currentDelegation && newFactor > 0) {
						changes.push({
							type: 'increase',
							walletTo: flp.id,
							factor: newFactor,
						});
					} else if (currentDelegation && currentDelegation.factor < newFactor) {
						changes.push({
							type: 'increase',
							walletTo: flp.id,
							factor: newFactor,
						});
					}
				}
			}

			const sortedChanges = changes.sort((a, b) => {
				if (a.type === 'reduce' && b.type === 'increase') return -1;
				if (a.type === 'increase' && b.type === 'reduce') return 1;
				return 0;
			});

			for (const change of sortedChanges) {
				await setDelegation({
					walletFrom: arProvider.walletAddress,
					walletTo: change.walletTo,
					factor: change.factor,
				});
			}
		} catch (error) {
			console.error('Error submitting delegation changes:', error);
			if (String(error).includes('total delegation factors exceed 10000 basis points')) {
				setSubmitError('Total delegation factors exceed 10000 basis points. Please reduce your allocation.');
			} else {
				setSubmitError(error.message || 'Failed to submit changes. Please try again.');
			}
		} finally {
			await refetchUserDelegations();
			setIsSubmitting(false);
		}
	};

	const isLaptop = windowWidth < parseInt(STYLING.cutoffs.max);
	const isTablet = windowWidth < parseInt(STYLING.cutoffs.initial);
	const isMobile = windowWidth < parseInt(STYLING.cutoffs.secondary);

	if (!allFlps) return <LoadingSkeletons isTablet={isTablet} isMobile={isMobile} />;

	const allocationForm = (
		<>
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

					<div style={{ maxHeight: 350, overflowY: 'auto' }}>
						{CORE_PROJECTS.filter((x) => allocations[x.id] && allocations[x.id] > 0).length > 0 && (
							<S.AllocationContainer>
								<S.SectionTitle style={{ fontWeight: 500, margin: 0, fontSize: 12, marginBottom: 6 }}>
									Core Permaweb Tokens
								</S.SectionTitle>
								{CORE_PROJECTS.filter((x) => allocations[x.id] && allocations[x.id] > 0).map((project) => (
									<AllocationItem
										key={project.id}
										logo={project.logo}
										ticker={project.ticker}
										percentage={allocations[project.id] || 0}
										color={coreTokenColors[project.id]}
										isMaxAllocation={cannotAllocateMore}
										disabled={isSubmitting || project.disabled}
										onAllocationChange={(change) => handleAllocationChange(project.id, change)}
										hideControls={project.id === 'ao'}
									/>
								))}
							</S.AllocationContainer>
						)}
						{allFlps
							?.filter((flp) => allocations[flp.id] && allocations[flp.id] > 0)
							.map((flp) => (
								<AllocationItem
									key={flp.id}
									ticker={flp.flp_token_ticker}
									logo={flp.flp_token_logo}
									percentage={allocations[flp.id] || 0}
									color={flpColorMap[flp.id] || '#F2F2F2'}
									isMaxAllocation={cannotAllocateMore}
									disabled={
										isSubmitting ||
										flp.status !== 'Active' ||
										flp.starts_at_ts > Date.now() ||
										!arProvider.walletAddress
									}
									onAllocationChange={(change) => handleAllocationChange(flp.id, change)}
								/>
							))}
					</div>
				</div>

				{isMaxAllocation && (
					<S.Subtitle style={{ padding: '20px 10px 0px', fontSize: '12px' }}>
						You are at 100%, you must remove some percentage of allocation to begin adding more.
					</S.Subtitle>
				)}

				{!arProvider.walletAddress && (
					<S.Subtitle style={{ padding: '20px 10px 0px', fontSize: '12px' }}>
						Please connect your wallet to manage allocations.
					</S.Subtitle>
				)}

				{submitError && (
					<S.Subtitle style={{ padding: '20px 10px 0px', fontSize: '12px', color: 'red' }}>{submitError}</S.Subtitle>
				)}

				<S.SubmitButton disabled={isSubmitting} onClick={handleSubmitChanges}>
					{isSubmitting ? 'Saving...' : 'Confirm Delegation Preferences'}
				</S.SubmitButton>
			</S.AllocationPanel>
		</>
	);

	return (
		<S.Container style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'flex-start', marginBottom: 60 }}>
			<S.LeftPanel>
				<S.Header>
					<S.HeaderContent isTablet={isTablet}>
						<div>
							<S.Title>Discover Permaweb Fair Launch Projects</S.Title>
							<S.Subtitle>
								The Permaweb Index is a fully autonomous permissionless, ecosystem liquidity pool that allows delegation
								<br /> of your yield to a variety of Permaweb ecosystem projects.
							</S.Subtitle>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
							<S.DashboardLink to="/delegate/dashboard">View Dashboard {'>'}</S.DashboardLink>
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

				<S.StatsGrid isTablet={isTablet}>
					<S.StatCard className="total-delegations">
						<div>
							<S.StatLabelRow>
								<div>
									<S.StatLabel>TOTAL DELEGATIONS</S.StatLabel>
									<S.StatValue>
										{lastDelegationRecord ? (
											<>
												{formatNumber(parseBigIntAsNumber(lastDelegationRecord?.summary?.Data.totalDelegatedAO, 12), {
													notation: 'compact',
												})}
												<TokenAvatar logo={ASSETS.aoCircled} size="large" />
											</>
										) : (
											<Skeleton width={60} height={26} style={{ marginTop: 6 }} />
										)}
									</S.StatValue>
								</div>
								<div style={{ display: isMobile ? 'none' : 'block' }}>
									<S.StatLabel>BY USERS</S.StatLabel>
									<S.StatValue style={{ fontSize: 15, marginTop: 15 }}>
										{lastDelegationRecord ? (
											<>
												{formatNumber(
													parseBigIntAsNumber(lastDelegationRecord?.summary?.Data.totalDirectDelegatedAO || '0', 12),
													{
														notation: 'compact',
													}
												)}{' '}
												<S.Ticker>$AO</S.Ticker>
											</>
										) : (
											<Skeleton width={60} height={15} />
										)}
									</S.StatValue>
								</div>
								<div style={{ display: isMobile ? 'none' : 'block' }}>
									<S.StatLabel>BY PERMAWEB INDEX</S.StatLabel>
									<S.StatValue style={{ fontSize: 15, marginTop: 15 }}>
										{lastDelegationRecord ? (
											<>
												{formatNumber(
													parseBigIntAsNumber(lastDelegationRecord?.summary?.Data.totalPiDelegatedAO || '0', 12),
													{
														notation: 'compact',
													}
												)}{' '}
												<S.Ticker>$AO</S.Ticker>
											</>
										) : (
											<Skeleton width={60} height={15} />
										)}
									</S.StatValue>
								</div>
							</S.StatLabelRow>
						</div>
						<TrendChart
							height={65}
							width={isTablet ? 200 : undefined}
							data={convertToChartData(delegationRecords, 'totalDelegatedAO')}
							isLoading={!delegationRecords}
							showDetailedTooltip
						/>
					</S.StatCard>
					<S.StatCard>
						<div>
							<S.StatLabel>FAIR LAUNCH PROJECTS</S.StatLabel>
							<S.StatValue>
								{allFlps ? allFlps.filter((flp) => !!flp.flp_token_name).length : <Skeleton width={60} height={24} />}
							</S.StatValue>
						</div>
						<TrendChart
							height={65}
							width={isTablet ? 200 : undefined}
							data={convertToChartData(createCumulativeFlpData(allFlps), 'totalDelegators')}
							isLoading={!allFlps}
						/>
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
							height={65}
							width={isTablet ? 200 : undefined}
							data={convertToChartData(delegationRecords, 'totalDelegators')}
							isLoading={!delegationRecords}
						/>
					</S.StatCard>
				</S.StatsGrid>

				<div>
					<S.SectionTitle>
						<PiFavicon />
						Add the core of the Permaweb to your allocation.
					</S.SectionTitle>

					<S.CoreTokensContainer isTablet={isTablet}>
						{CORE_PROJECTS.map((project) => (
							<S.CoreTokenCard key={project.id}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
									<S.CoreTokenHeader>
										<TokenAvatar logo={project.logo} size="large" />
										<S.CoreTokenName>{project.name}</S.CoreTokenName>
										<S.CoreTokenTicker>${project.ticker}</S.CoreTokenTicker>
									</S.CoreTokenHeader>
									<S.Subtitle>{project.description}</S.Subtitle>
								</div>
								<Tooltip
									content={
										project.id === 'ao'
											? 'Your allocation is full, reduce allocation from other projects to increase your AO allocation.'
											: null
									}
								>
									{allocations[project.id] && allocations[project.id] > 0 ? (
										<>
											<S.CardAddButton
												disabled
												style={{ backgroundColor: coreTokenColors[project.id] || flpColorMap[project.id] }}
											>
												Added
												<ReactSVG src={ASSETS.checkmark} />
											</S.CardAddButton>
										</>
									) : (
										<S.CardAddButton
											onClick={() => handleAllocationChange(project.id, 5)}
											disabled={cannotAllocateMore || isSubmitting || project.disabled}
										>
											<ReactSVG
												src={ASSETS.plus}
												style={{
													opacity: project.disabled ? 0 : 1,
												}}
											/>
											{project.disabled ? 'Coming Soon' : 'Add'}
										</S.CardAddButton>
									)}
								</Tooltip>
							</S.CoreTokenCard>
						))}
					</S.CoreTokensContainer>
				</div>

				<div>
					<S.SectionTitle>
						<PiFavicon />
						Add Permaweb projects to your current allocation.
					</S.SectionTitle>
					<S.TabsAndSearchContainer isMobile={isMobile}>
						<S.TabsContainer>
							<S.Tab active={tabIndex === 0} onClick={() => setTabIndex(0)}>
								Popular Delegations
							</S.Tab>
							<S.Tab active={tabIndex === 1} onClick={() => setTabIndex(1)}>
								Explore Delegations
							</S.Tab>
						</S.TabsContainer>

						<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
							<S.SearchBar isTablet={isTablet} isMobile={isMobile}>
								<S.SearchInput
									isTablet={isTablet}
									isMobile={isMobile}
									placeholder="Search for Project..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</S.SearchBar>
						</div>
					</S.TabsAndSearchContainer>

					<InMemoryTable
						data={sortedAndFilteredFlps}
						pageSize={pageSize}
						onLoadMore={() => setPageSize((prev) => prev + 30)}
						sortedBy={tabIndex === 0 ? 'amount_delegated' : 'starts_at_ts'}
						isTablet={isTablet}
						headerCells={[
							{ style: { width: 50, minWidth: 50, maxWidth: 50 }, label: '#', align: 'center' },
							{ style: { width: 220, minWidth: 220, maxWidth: 220 }, label: 'NAME' },
							{
								style: { width: 160, minWidth: 160, maxWidth: 160 },
								label: 'TOTAL AO DELEGATED',
								key: 'amount_delegated',
							},
							{ style: { width: 160, minWidth: 160, maxWidth: 160 }, label: 'DIRECT DELEGATION LAST CYCLE' },
							{ style: { width: 160, minWidth: 160, maxWidth: 160 }, label: 'PI DELEGATION LAST CYCLE' },
							{ style: { width: 120, minWidth: 120, maxWidth: 120 }, label: 'START DATE', key: 'starts_at_ts' },
							{ style: { width: 160, minWidth: 160, maxWidth: 160 }, label: 'ADD TO ALLOCATION', align: 'right' },
						]}
						renderRow={(row: any, index: number) => (
							<TableRow
								key={row.id}
								row={row}
								index={index}
								expandedRows={expandedRows}
								setExpandedRows={setExpandedRows}
								allocations={allocations}
								isMaxAllocation={cannotAllocateMore}
								handleAllocationChange={handleAllocationChange}
								getProjectYield={getProjectYield}
								getProjectPiYield={getProjectPiYield}
								getTotalProjectYield={getTotalProjectYield}
								coreTokenColors={coreTokenColors}
								flpColorMap={flpColorMap}
								isSubmitting={isSubmitting}
								isTablet={isTablet}
							/>
						)}
					/>
				</div>
			</S.LeftPanel>
			{isLaptop ? (
				<>
					<S.MobileAllocationButton onClick={() => setShowAllocationModal(true)}>
						View Allocations
					</S.MobileAllocationButton>
					{showAllocationModal && (
						<S.ModalOverlay onClick={() => setShowAllocationModal(false)} isMobile={isMobile}>
							<S.ModalContent onClick={(e) => e.stopPropagation()} isMobile={isMobile}>
								<S.CloseButton onClick={() => setShowAllocationModal(false)}>
									<ReactSVG src={ASSETS.close} />
								</S.CloseButton>
								{allocationForm}
							</S.ModalContent>
						</S.ModalOverlay>
					)}
				</>
			) : (
				allocationForm
			)}
		</S.Container>
	);
}

const createCumulativeFlpData = (flps) => {
	if (!flps || flps.length === 0) return [];

	const sortedFlps = [...flps]
		.filter((flp) => flp && typeof flp.created_at_ts === 'number' && !!flp.flp_token_name)
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

export function convertToChartData(rawData: any[], dataKey: string, chartColor: string = '#0DBD27') {
	if (!rawData || rawData.length === 0) {
		return {
			labels: [],
			datasets: [
				{
					data: [],
					borderColor: chartColor,
					backgroundColor: `${chartColor}33`,
					fill: true,
					tension: 0.4,
					pointRadius: 0,
					borderWidth: 1,
				},
			],
		};
	}

	const sortedRecords = rawData
		.filter((record) => record?.summary?.Data?.[dataKey] !== undefined)
		.sort((a, b) => {
			const timestampA = a?.summary?.Timestamp || 0;
			const timestampB = b?.summary?.Timestamp || 0;
			return timestampA - timestampB;
		});

	const labels = sortedRecords.map((record) =>
		record?.summary?.Timestamp ? formatDate(record.summary.Timestamp, 'dateString') : 'Unknown'
	);

	const values = sortedRecords.map((record) => {
		const value = record?.summary?.Data?.[dataKey];
		if (!value) return 0;
		return dataKey === 'totalDelegatedAO' ? parseFloat(value) / 10 ** 12 : parseInt(value, 10);
	});

	const userValues = sortedRecords.map((record) => {
		const value = record?.summary?.Data?.totalDirectDelegatedAO;
		if (!value) return 0;
		return dataKey === 'totalDelegatedAO' ? parseFloat(value) / 10 ** 12 : parseInt(value, 10);
	});

	const piValues = sortedRecords.map((record) => {
		const value = record?.summary?.Data?.totalPiDelegatedAO;
		if (!value) return 0;
		return dataKey === 'totalDelegatedAO' ? parseFloat(value) / 10 ** 12 : parseInt(value, 10);
	});

	const meta = {
		userValues,
		piValues,
	};

	return {
		labels,
		datasets: [
			{
				data: values,
				borderColor: chartColor,
				backgroundColor: `${chartColor}33`,
				fill: true,
				tension: 0.4,
				pointRadius: 0,
				borderWidth: 1,
				label: 'total',
				// Include meta information
				meta,
			},
		],
	};
}
