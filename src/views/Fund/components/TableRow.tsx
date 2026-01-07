import React, { useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

import { ASSETS } from 'helpers/config';
import { formatAddress, formatDate } from 'helpers/utils';

import { formatNumber, formatTicker } from '../../../helpers/format';
import * as S from '../styles';

import { ColorDot } from './AllocationItem';
import { ArrowSquareDownIcon } from './ArrowSquareDownIcon';
import { FlpDetailsRow } from './FlpDetailsRow';
import { IdBlock } from './IdBlock';
import { TokenAvatar } from './TokenAvatar';
import Tooltip from './Tooltip';

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
	font-family: ${(props) => props.theme.typography.family.primary};
`;

const CardBody = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
`;

const CardStat = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	font-weight: 400;

	.label {
		font-size: 11px;
		text-transform: uppercase;
	}
	.value {
		font-size: 13px;
		font-family: ${(props) => props.theme.typography.family.primary};
		display: flex;
		align-items: center;
		gap: 6px;
	}
`;

const CardFooter = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: stretch;
`;

interface TableRowProps {
	row: any;
	index: number;
	expandedRows: string[];
	setExpandedRows: (callback: (prev: string[]) => string[]) => void;
	allocations: Record<string, number>;
	isMaxAllocation: boolean;
	handleAllocationChange: (token: string, change: number) => void;
	getProjectYield: (projectProcess: string) => number;
	getProjectPiYield: (projectProcess: string) => number;
	getTotalProjectYield: (projectProcess: string) => number;
	coreTokenColors: Record<string, string>;
	flpColorMap: Record<string, string>;
	isSubmitting: boolean;
	isTablet?: boolean;
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
	getProjectPiYield,
	getTotalProjectYield,
	coreTokenColors,
	flpColorMap,
	isSubmitting,
	isTablet,
}) => {
	const isExpanded = expandedRows.includes(row.id);
	const isNotStartedYet = useMemo(() => row.starts_at_ts > Date.now(), [row.starts_at_ts]);

	const timeRemainingText = useMemo(() => {
		if (!isNotStartedYet) return '';

		const startDate = new Date(row.starts_at_ts);
		const currentDate = new Date();
		const diffTime = Math.abs(startDate.getTime() - currentDate.getTime());

		const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

		const formattedDate = formatDate(row.starts_at_ts, 'dateString', true);

		return (
			<div style={{ whiteSpace: 'normal', textAlign: 'left' }}>
				<div>The Fairlaunch will start on:</div>
				<div style={{ fontWeight: 'bold', margin: '4px 0' }}>{formattedDate}</div>
				<div>
					in approx ~ {days > 0 ? `${days} days, ` : ''}
					{hours > 0 ? `${hours} hours, ` : ''}
					{minutes} minutes from now.
				</div>
			</div>
		);
	}, [row.starts_at_ts, isNotStartedYet]);

	const toggleExpand = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setExpandedRows((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
	};

	const addActionContent =
		allocations[row.id] && allocations[row.id] > 0 ? (
			<>
				<ColorDot color={coreTokenColors[row.id] || flpColorMap[row.id]} />
				<S.AddButton disabled style={{ backgroundColor: coreTokenColors[row.id] || flpColorMap[row.id], flexGrow: 1 }}>
					Added
					<ReactSVG src={ASSETS.checkmark} style={{ width: '16px', height: '16px' }} />
				</S.AddButton>
			</>
		) : isNotStartedYet ? (
			<Tooltip content={timeRemainingText}>
				<S.AddButton disabled style={{ flexGrow: 1 }}>
					Not started yet
				</S.AddButton>
			</Tooltip>
		) : (
			<S.AddButton
				style={{ flexGrow: 1 }}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					handleAllocationChange(row.id, 5);
				}}
				disabled={isSubmitting || isMaxAllocation || row.status !== 'Active'}
			>
				<ReactSVG
					src={ASSETS.plus}
					style={{
						width: '16px',
						height: '16px',
						color: isSubmitting || isMaxAllocation || row.status !== 'Active' || isNotStartedYet ? '#aaa' : '#23BE30',
					}}
				/>
				Add
			</S.AddButton>
		);

	if (isTablet) {
		return (
			<React.Fragment key={`${row.id}-tablet`}>
				<CardContainer onClick={toggleExpand} isExpanded={isExpanded}>
					<CardHeader>
						<S.TokenInfo>
							<TokenAvatar logo={row.flp_token_logo} size="large" />
							{row.flp_token_name && <span>{row.flp_token_name}</span>}
							<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
							<IdBlock label={formatAddress(row.id, false)} value={row.id} />
						</S.TokenInfo>
					</CardHeader>
					<CardBody>
						<CardStat>
							<span className="label">Total AO Delegated</span>
							<span className="value">
								{formatNumber(getTotalProjectYield(row.id))}
								<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
							</span>
						</CardStat>
						<CardStat>
							<span className="label">Direct Delegation (Last Cycle)</span>
							<span className="value">
								{formatNumber(getProjectYield(row.id))}
								<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
							</span>
						</CardStat>
						<CardStat>
							<span className="label">PI Delegation (Last Cycle)</span>
							<span className="value">
								{formatNumber(getProjectPiYield(row.id))}
								<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
							</span>
						</CardStat>
						<CardStat>
							<span className="label">Start Date</span>
							<span className="value">{formatDate(row.starts_at_ts, 'dateString') || 'Unknown'}</span>
						</CardStat>
					</CardBody>
					<CardFooter>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
							{addActionContent}
						</div>
						<S.SeeDetailsButton onClick={toggleExpand} isCard>
							<div style={{ width: 100, height: 1, borderBottom: '1px solid #C8C8C8' }} />
							<span>{isExpanded ? 'Close Details' : 'See Details'}</span>
							<ArrowSquareDownIcon style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
							<div style={{ width: 100, height: 1, borderBottom: '1px solid #C8C8C8' }} />
						</S.SeeDetailsButton>
					</CardFooter>
					{isExpanded && <FlpDetailsRow row={row} isExpanded={isExpanded} colSpan={1} isTablet={isTablet} />}
				</CardContainer>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment key={row.id}>
			<S.TableRow onClick={toggleExpand} className={isExpanded ? 'expanded' : ''}>
				<S.TableCell align="center">{index + 1}</S.TableCell>
				<S.TableCell style={{ position: 'relative' }}>
					<S.TokenInfo>
						<TokenAvatar logo={row.flp_token_logo} size="large" />
						{row.flp_token_name && <span>{row.flp_token_name}</span>}
						<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
					</S.TokenInfo>
					<div style={{ position: 'absolute', left: 45, bottom: 14, zIndex: 1000 }}>
						<IdBlock label={formatAddress(row.id, false)} value={row.id} />
					</div>
				</S.TableCell>
				<S.TableCell>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
						<span>{formatNumber(getTotalProjectYield(row.id))}</span>
						<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
					</div>
				</S.TableCell>
				<S.TableCell>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
						<span>{formatNumber(getProjectYield(row.id))}</span>
						<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
					</div>
				</S.TableCell>
				<S.TableCell>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
						<span>{formatNumber(getProjectPiYield(row.id))}</span>
						<TokenAvatar logo={ASSETS.aoCircled} size="medium" />
					</div>
				</S.TableCell>
				<S.TableCell>{formatDate(row.starts_at_ts, 'dateString') || 'Unknown'}</S.TableCell>
				<S.TableCell align="right">
					<S.RowActionContainer>
						<S.SeeDetailsButton onClick={toggleExpand}>
							<div style={{ width: 200, height: 1, borderBottom: '1px solid #C8C8C8' }} />
							<span>{isExpanded ? 'Close Details' : 'See Details'}</span>
							<ArrowSquareDownIcon style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
							<div style={{ width: 200, height: 1, borderBottom: '1px solid #C8C8C8' }} />
						</S.SeeDetailsButton>
						{addActionContent}
					</S.RowActionContainer>
				</S.TableCell>
			</S.TableRow>
			{isExpanded && <FlpDetailsRow row={row} isExpanded={isExpanded} colSpan={7} isTablet={isTablet} />}
		</React.Fragment>
	);
};
