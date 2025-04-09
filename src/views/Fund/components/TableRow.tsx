import { useQuery } from '@tanstack/react-query';
import { getFlpInfo } from 'api/fair-launch-api';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { retryable } from 'helpers/network';
import { formatDate } from 'helpers/utils';

import { formatNumber, formatTicker, parseBigIntAsNumber } from '../../../helpers/format';
import * as S from '../styles';

import { ColorDot } from './AllocationItem';
import { ArrowSquareDownIcon } from './ArrowSquareDownIcon';
import { Skeleton } from './LoadingSkeletons';
import { TokenAvatar } from './TokenAvatar';

interface TableRowProps {
	row: any;
	index: number;
	expandedRows: string[];
	setExpandedRows: (callback: (prev: string[]) => string[]) => void;
	allocations: Record<string, number>;
	isMaxAllocation: boolean;
	handleAllocationChange: (token: string, change: number) => void;
	getProjectYield: (projectProcess: string) => number;
	coreTokenColors: Record<string, string>;
	flpColorMap: Record<string, string>;
}

export const TableRow: React.FC<TableRowProps> = ({
	row,
	index,
	expandedRows,
	setExpandedRows,
	allocations,
	isMaxAllocation,
	handleAllocationChange,
	getProjectYield,
	coreTokenColors,
	flpColorMap,
}) => {
	const isExpanded = expandedRows.includes(row.id);

	const { data: flpInfo, isLoading: flpInfoLoading } = useQuery({
		queryKey: ['flp-info', row.id],
		queryFn: async () => {
			const flpInfo = await retryable(getFlpInfo)(row.id!);
			console.log('onFlpInfo', flpInfo);
			return flpInfo;
		},
		enabled: !!row.id && isExpanded,
	});

	const totalToDistribute = useMemo(() => {
		try {
			return parseBigIntAsNumber(flpInfo?.['Token-Supply-To-Use'], Number(flpInfo?.['Token-Denomination']));
		} catch {
			return 0;
		}
	}, [flpInfo]);

	const totalSupply = useMemo(() => {
		try {
			let supply: string = flpInfo?.['Total-Token-Supply-At-Creation'];

			try {
				supply = JSON.parse(supply);
			} catch {}

			return parseBigIntAsNumber(supply, Number(flpInfo?.['Token-Denomination']));
		} catch {
			return 0;
		}
	}, [flpInfo]);

	const percentageOfSupply = useMemo(() => {
		if (totalSupply === 0) return 0;
		return (Number(totalToDistribute) / Number(totalSupply)) * 100;
	}, [totalToDistribute, totalSupply]);

	const runTime = useMemo(() => {
		if (!row.starts_at_ts || !row.ends_at_ts) return 'Indefinitely';

		const startDate = new Date(row.starts_at_ts);
		const endDate = new Date(row.ends_at_ts);

		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		const years = Math.floor(diffDays / 365);
		const remainingDays = diffDays % 365;

		if (years > 0) {
			return `${years} year${years > 1 ? 's' : ''}${
				remainingDays > 0 ? `, ${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''
			}`;
		} else {
			return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
		}
	}, [row.starts_at_ts, row.ends_at_ts]);

	return (
		<React.Fragment key={row.id}>
			<S.TableRow
				onClick={() => {
					setExpandedRows((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
				}}
				className={isExpanded ? 'expanded' : ''}
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
							<span>{isExpanded ? 'Close Details' : 'See Details'}</span>
							<ArrowSquareDownIcon style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
							<div style={{ width: 200, height: 1, borderBottom: '1px solid #C8C8C8' }} />
						</S.SeeDetailsButton>
						{allocations[row.id] && allocations[row.id] > 0 ? (
							<>
								<ColorDot color={coreTokenColors[row.id] || flpColorMap[row.id]} />
								<S.AddButton disabled style={{ backgroundColor: coreTokenColors[row.id] || flpColorMap[row.id] }}>
									Added
									<ReactSVG src={ASSETS.checkmark} style={{ width: '16px', height: '16px' }} />
								</S.AddButton>
							</>
						) : (
							<>
								<ReactSVG
									src={ASSETS.plus}
									style={{
										width: '16px',
										height: '16px',
										color:
											isMaxAllocation || row.status !== 'Active' || row.starts_at_ts > Date.now() ? '#aaa' : '#51c85b',
									}}
								/>
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
							</>
						)}
					</S.RowActionContainer>
				</S.TableCell>
			</S.TableRow>
			{isExpanded && (
				<S.DetailsRow>
					<S.DetailsCell colSpan={6}>
						<S.DetailsContent>
							{flpInfoLoading ? (
								<>
									<div>
										<S.SocialLinks>
											<Skeleton width={24} height={24} style={{ marginRight: '10px' }} />
											<Skeleton width={24} height={24} />
										</S.SocialLinks>

										<S.DetailsDescription>
											<Skeleton width="100%" height={60} />
										</S.DetailsDescription>
									</div>

									<S.DetailsSectionsGrid>
										<div>
											<S.DetailsSectionHeading>Unlock Date</S.DetailsSectionHeading>
											<S.DetailSectionContent>
												<div>
													<S.DetailsSectionLabel>TOKEN UNLOCKS</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														<Skeleton width={120} height={20} />
													</S.DetailsSectionValue>
												</div>
												<div>
													<S.DetailsSectionLabel>RUN TIME</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														<Skeleton width={150} height={20} />
													</S.DetailsSectionValue>
												</div>
											</S.DetailSectionContent>
										</div>

										<div>
											<S.DetailsSectionHeading>Amount</S.DetailsSectionHeading>
											<S.DetailSectionContent>
												<div>
													<S.DetailsSectionLabel>DELEGATORS</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														<Skeleton width={120} height={20} />
													</S.DetailsSectionValue>
												</div>
											</S.DetailSectionContent>
										</div>

										<div>
											<S.DetailsSectionHeading>Supply</S.DetailsSectionHeading>
											<S.DetailSectionContent>
												<div>
													<S.DetailsSectionLabel>TOTAL FAIR LAUNCH VS TOTAL SUPPLY</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														<Skeleton width={180} height={20} />
													</S.DetailsSectionValue>
												</div>
												<div>
													<S.DetailsSectionLabel>PERCENTAGE OF SUPPLY</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														<Skeleton width={60} height={20} />
													</S.DetailsSectionValue>
												</div>
												<div>
													<S.DetailsSectionLabel>DECAY RATE</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														<Skeleton width={60} height={20} />
													</S.DetailsSectionValue>
												</div>
											</S.DetailSectionContent>
										</div>
									</S.DetailsSectionsGrid>
								</>
							) : (
								<>
									<div>
										<S.SocialLinks>
											{row.twitter_handle && (
												<Link to={`https://x.com/${row.twitter_handle}`} target="_blank">
													<ReactSVG src={ASSETS.x} />
												</Link>
											)}
											{row.website_url && (
												<Link to={row.website_url} target="_blank">
													<ReactSVG src={ASSETS.website} />
												</Link>
											)}
										</S.SocialLinks>

										<S.DetailsDescription>{flpInfo?.['Flp-Long-Description']}</S.DetailsDescription>
									</div>

									<S.DetailsSectionsGrid>
										<div>
											<S.DetailsSectionHeading>Unlock Date</S.DetailsSectionHeading>
											<S.DetailSectionContent>
												<div>
													<S.DetailsSectionLabel>TOKEN UNLOCKS</S.DetailsSectionLabel>
													<S.DetailsSectionValue>{formatDate(row.starts_at_ts, 'dateString')}</S.DetailsSectionValue>
												</div>
												<div>
													<S.DetailsSectionLabel>RUN TIME</S.DetailsSectionLabel>
													<S.DetailsSectionValue style={{ color: '#51C85B' }}>{runTime}</S.DetailsSectionValue>
												</div>
											</S.DetailSectionContent>
										</div>

										<div>
											<S.DetailsSectionHeading>Amount</S.DetailsSectionHeading>
											<S.DetailSectionContent>
												<div>
													<S.DetailsSectionLabel>DELEGATORS</S.DetailsSectionLabel>
													<S.DetailsSectionValue>TODO</S.DetailsSectionValue>
												</div>
											</S.DetailSectionContent>
										</div>

										<div>
											<S.DetailsSectionHeading>Supply</S.DetailsSectionHeading>
											<S.DetailSectionContent>
												<div>
													<S.DetailsSectionLabel>TOTAL FAIR LAUNCH VS TOTAL SUPPLY</S.DetailsSectionLabel>
													<S.DetailsSectionValue>
														{formatNumber(totalToDistribute)} / {formatNumber(totalSupply)}
													</S.DetailsSectionValue>
												</div>
												<div>
													<S.DetailsSectionLabel>PERCENTAGE OF SUPPLY</S.DetailsSectionLabel>
													<S.DetailsSectionValue>{percentageOfSupply.toFixed(2)}%</S.DetailsSectionValue>
												</div>
												<div>
													<S.DetailsSectionLabel>DECAY RATE</S.DetailsSectionLabel>
													<S.DetailsSectionValue>{flpInfo?.['Decay-Factor']}</S.DetailsSectionValue>
												</div>
											</S.DetailSectionContent>
										</div>
									</S.DetailsSectionsGrid>
								</>
							)}
						</S.DetailsContent>
					</S.DetailsCell>
				</S.DetailsRow>
			)}
		</React.Fragment>
	);
};
