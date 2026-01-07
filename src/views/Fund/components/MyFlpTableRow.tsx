import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getClaimableBalance, withdrawFLPToken } from 'api/fair-launch-api';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useArweaveProvider } from 'providers/ArweaveProvider';

import { formatNumber, formatTicker, parseBigIntAsNumber } from '../../../helpers/format';
import * as S from '../styles';

import { Skeleton } from './LoadingSkeletons';
import { TokenAvatar } from './TokenAvatar';

const CardContainer = styled.div`
	background-color: #fff;
	border-radius: 8px;
	padding: 15px;
	margin-bottom: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	border: 1px solid #eee;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	font-size: 13px;
	font-family: ${(props) => props.theme.typography.family.primary};
`;

const CardBody = styled.div`
	display: grid;
	grid-template-columns: 1fr auto; /* For label and value/action */
	align-items: center;
	gap: 15px;
`;

const CardStatLabel = styled.div`
	font-size: 11px;
	text-transform: uppercase;
	font-weight: 400;
`;

const CardStatValue = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 13px;
	font-family: ${(props) => props.theme.typography.family.primary};
`;

const CardFooter = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: stretch;
`;

const StaticTableRow = styled.tr`
	background-color: #fff;
	border-bottom: 1px solid #eee;
`;

const ErrorMessage = styled.div`
	color: red;
	font-size: 12px;
	margin-top: 4px;
`;

export interface MyFlpTableRowProps {
	row: any;
	index: number;
	isTablet?: boolean;
}

export function MyFlpTableRow({ row, index, isTablet }: MyFlpTableRowProps) {
	const arProvider = useArweaveProvider();
	const [isClaiming, setIsClaiming] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { data: claimableBalance } = useQuery({
		queryKey: ['claimableBalance', row.id, arProvider.walletAddress],
		queryFn: () => getClaimableBalance(arProvider.walletAddress, row.id),
		enabled: !!arProvider.walletAddress,
	});

	const queryClient = useQueryClient();

	if (isTablet) {
		return (
			<CardContainer>
				<CardHeader>
					<S.TokenInfo>
						<TokenAvatar logo={row.flp_token_logo} size="large" />
						{row.flp_token_name && <span>{row.flp_token_name}</span>}
						<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
					</S.TokenInfo>
				</CardHeader>
				<CardBody>
					<CardStatLabel>Available to Claim</CardStatLabel>
					<CardStatValue>
						{claimableBalance ? (
							formatNumber(parseBigIntAsNumber(claimableBalance, row.flp_token_denomination))
						) : (
							<Skeleton width={80} height={20} />
						)}
						<TokenAvatar logo={row.flp_token_logo} size="medium" />
					</CardStatValue>
				</CardBody>
				<CardFooter>
					<S.AddButton
						disabled={!claimableBalance || claimableBalance === '0' || isClaiming}
						onClick={async () => {
							try {
								setError(null);
								setIsClaiming(true);
								await withdrawFLPToken(row.id);
								queryClient.invalidateQueries({ queryKey: ['claimableBalance', row.id, arProvider.walletAddress] });
							} catch (error) {
								console.error('Error claiming FLP tokens:', error);
								setError(error instanceof Error ? error.message : 'Failed to claim tokens');
							} finally {
								setIsClaiming(false);
							}
						}}
					>
						{isClaiming ? 'Claiming...' : 'Claim'}
					</S.AddButton>
					{error && <ErrorMessage>{error}</ErrorMessage>}
				</CardFooter>
			</CardContainer>
		);
	}

	return (
		<StaticTableRow>
			<S.TableCell>
				<S.TokenInfo>
					<TokenAvatar logo={row.flp_token_logo} size="large" />
					{row.flp_token_name && <span>{row.flp_token_name}</span>}
					<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
				</S.TokenInfo>
			</S.TableCell>
			<S.TableCell>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
					<span>
						{claimableBalance ? (
							formatNumber(parseBigIntAsNumber(claimableBalance, row.flp_token_denomination))
						) : (
							<Skeleton width={100} height={20} />
						)}
					</span>
					<TokenAvatar logo={row.flp_token_logo} size="medium" />
				</div>
			</S.TableCell>
			<S.TableCell align="right">
				<S.RowActionContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
					<S.AddButton
						disabled={!claimableBalance || claimableBalance === '0' || isClaiming}
						onClick={async () => {
							try {
								setError(null);
								setIsClaiming(true);
								await withdrawFLPToken(row.id);
								// invalidate the query
								queryClient.invalidateQueries({ queryKey: ['claimableBalance', row.id, arProvider.walletAddress] });
							} catch (error) {
								console.error('Error claiming FLP tokens:', error);
								setError(error instanceof Error ? error.message : 'Failed to claim tokens');
							} finally {
								setIsClaiming(false);
							}
						}}
					>
						{isClaiming ? 'Claiming...' : 'Claim'}
					</S.AddButton>
					{error && <ErrorMessage>{error}</ErrorMessage>}
				</S.RowActionContainer>
			</S.TableCell>
		</StaticTableRow>
	);
}
