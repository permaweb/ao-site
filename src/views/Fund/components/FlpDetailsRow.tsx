import { useQuery } from '@tanstack/react-query';
import { getFlpInfo } from 'api/fair-launch-api';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { retryable } from 'helpers/network';
import { formatDate } from 'helpers/utils';

import { formatNumber, parseBigIntAsNumber } from '../../../helpers/format';
import * as S from '../styles';

import { IdBlock } from './IdBlock';
import { Skeleton } from './LoadingSkeletons';

interface FlpDetailsRowProps {
	row: any;
	isExpanded: boolean;
	colSpan: number;
}

export const FlpDetailsRow: React.FC<FlpDetailsRowProps> = ({ row, isExpanded, colSpan }) => {
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
		if (!flpInfo) return 0;
		try {
			let supply: string = flpInfo?.['Total-Token-Supply-At-Creation'];

			try {
				if (supply.includes('"')) {
					supply = JSON.parse(supply);
				}
			} catch {}

			return parseBigIntAsNumber(String(supply), Number(flpInfo?.['Token-Denomination']));
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

	if (!isExpanded) return null;

	return (
		<S.DetailsRow>
			<S.DetailsCell colSpan={colSpan}>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
					<S.IdBlockContainer>
						<IdBlock label={row.id} value={row.id} />
					</S.IdBlockContainer>
					<S.ViewOnAoLink to={`https://ao.link/entity/${row.id}`} target="_blank">
						View on ao.link {'>'}
					</S.ViewOnAoLink>
				</div>

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

								{/* <div>
									<S.DetailsSectionHeading>Amount</S.DetailsSectionHeading>
									<S.DetailSectionContent>
										<div>
											<S.DetailsSectionLabel>DELEGATORS</S.DetailsSectionLabel>
											<S.DetailsSectionValue>
												<Skeleton width={120} height={20} />
											</S.DetailsSectionValue>
										</div>
									</S.DetailSectionContent>
								</div> */}

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

								{/* <div>
									<S.DetailsSectionHeading>Amount</S.DetailsSectionHeading>
									<S.DetailSectionContent>
										<div>
											<S.DetailsSectionLabel>DELEGATORS</S.DetailsSectionLabel>
											<S.DetailsSectionValue>TODO</S.DetailsSectionValue>
										</div>
									</S.DetailSectionContent>
								</div> */}

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
											<S.DetailsSectionValue>
												{percentageOfSupply.toFixed(2)}
												{percentageOfSupply !== Infinity ? '%' : ''}
											</S.DetailsSectionValue>
										</div>
										<div>
											<S.DetailsSectionLabel>DECAY RATE</S.DetailsSectionLabel>
											<S.DetailsSectionValue>{Number(flpInfo?.['Decay-Factor']).toFixed(4)}%</S.DetailsSectionValue>
										</div>
									</S.DetailSectionContent>
								</div>
							</S.DetailsSectionsGrid>
						</>
					)}
				</S.DetailsContent>
			</S.DetailsCell>
		</S.DetailsRow>
	);
};
