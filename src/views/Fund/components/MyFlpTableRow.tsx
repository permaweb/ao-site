import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getClaimableBalance, withdrawFLPToken } from 'api/fair-launch-api';
import React, { useState } from 'react';
import styled from 'styled-components';

import { ASSETS } from 'helpers/config';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { formatNumber, formatTicker, parseBigIntAsNumber } from '../../../helpers/format';
import * as S from '../styles';

import { Skeleton } from './LoadingSkeletons';
import { TokenAvatar } from './TokenAvatar';

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
}

export function MyFlpTableRow({ row, index }: MyFlpTableRowProps) {
	const arProvider = useArweaveProvider();
	const [isClaiming, setIsClaiming] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { data: claimableBalance } = useQuery({
		queryKey: ['claimableBalance', row.id, arProvider.walletAddress],
		queryFn: () => getClaimableBalance(arProvider.walletAddress, row.id),
		enabled: !!arProvider.walletAddress,
	});

	const queryClient = useQueryClient();

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
