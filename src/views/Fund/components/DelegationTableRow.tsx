import React from 'react';
import styled from 'styled-components';

import { formatTicker } from '../../../helpers/format';
import * as S from '../styles';

import { ArrowSquareDownIcon } from './ArrowSquareDownIcon';
import { FlpDetailsRow } from './FlpDetailsRow';
import { TokenAvatar } from './TokenAvatar';

const CardContainer = styled.div<{ isExpanded?: boolean }>`
	background-color: ${(props) => (props.isExpanded ? '#f5f5f5' : '#fff')};
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
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

const CardFooter = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: stretch;
`;

export interface DelegationTableRowProps {
	row: any;
	index: number;
	expandedRows: number[];
	setExpandedRows: (value: number[] | ((prev: number[]) => number[])) => void;
	delegationPercentage: number;
	isTablet?: boolean;
}

export function DelegationTableRow({
	row,
	index,
	expandedRows,
	setExpandedRows,
	delegationPercentage,
	isTablet,
}: DelegationTableRowProps) {
	const isExpanded = expandedRows.includes(row.id);

	const toggleExpand = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setExpandedRows((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
	};

	if (isTablet) {
		return (
			<CardContainer onClick={toggleExpand} isExpanded={isExpanded}>
				<CardHeader>
					<S.TokenInfo>
						<TokenAvatar logo={row.flp_token_logo} size="large" />
						{row.flp_token_name && <span>{row.flp_token_name}</span>}
						<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
					</S.TokenInfo>
					<S.DetailsSectionValue style={{ fontWeight: 500, fontSize: '16px' }}>
						{delegationPercentage}%
					</S.DetailsSectionValue>
				</CardHeader>
				<CardFooter>
					<S.SeeDetailsButton onClick={toggleExpand} isCard>
						<div style={{ width: 100, height: 1, borderBottom: '1px solid #C8C8C8' }} />
						<span>{isExpanded ? 'Close Details' : 'See Details'}</span>
						<ArrowSquareDownIcon style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
						<div style={{ width: 100, height: 1, borderBottom: '1px solid #C8C8C8' }} />
					</S.SeeDetailsButton>
				</CardFooter>
				{isExpanded && <FlpDetailsRow row={row} isExpanded={isExpanded} colSpan={1} isTablet={isTablet} />}
			</CardContainer>
		);
	}

	return (
		<React.Fragment key={row.id}>
			<S.TableRow onClick={toggleExpand} className={isExpanded ? 'expanded' : ''}>
				<S.TableCell>
					<S.TokenInfo>
						<TokenAvatar logo={row.flp_token_logo} size="large" />
						{row.flp_token_name && <span>{row.flp_token_name}</span>}
						<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
					</S.TokenInfo>
				</S.TableCell>
				<S.TableCell align="right">
					<S.RowActionContainer>
						<S.SeeDetailsButton onClick={toggleExpand}>
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
			<FlpDetailsRow row={row} isExpanded={isExpanded} colSpan={3} isTablet={isTablet} />
		</React.Fragment>
	);
}
