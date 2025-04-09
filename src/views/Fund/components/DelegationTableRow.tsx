import React from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { formatNumber, formatTicker } from '../../../helpers/format';
import * as S from '../styles';

import { ArrowSquareDownIcon } from './ArrowSquareDownIcon';
import { FlpDetailsRow } from './FlpDetailsRow';
import { TokenAvatar } from './TokenAvatar';

export interface DelegationTableRowProps {
	row: any;
	index: number;
	expandedRows: number[];
	setExpandedRows: (value: number[] | ((prev: number[]) => number[])) => void;
	delegationPercentage: number;
}

export function DelegationTableRow({
	row,
	index,
	expandedRows,
	setExpandedRows,
	delegationPercentage,
}: DelegationTableRowProps) {
	const isExpanded = expandedRows.includes(row.id);

	return (
		<React.Fragment key={row.id}>
			<S.TableRow
				onClick={() => {
					setExpandedRows((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
				}}
				className={isExpanded ? 'expanded' : ''}
			>
				<S.TableCell>
					<S.TokenInfo>
						<TokenAvatar logo={row.flp_token_logo} size="large" />
						{row.flp_token_name && <span>{row.flp_token_name}</span>}
						<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
					</S.TokenInfo>
				</S.TableCell>
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
						<S.DetailsSectionValue style={{ fontWeight: 500 }}>{delegationPercentage}%</S.DetailsSectionValue>
						<S.DetailsSectionValue>Delegated</S.DetailsSectionValue>
					</S.RowActionContainer>
				</S.TableCell>
			</S.TableRow>
			<FlpDetailsRow row={row} isExpanded={isExpanded} colSpan={3} />
		</React.Fragment>
	);
}
