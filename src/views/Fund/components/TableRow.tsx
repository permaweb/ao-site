import React, { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

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

	return (
		<React.Fragment key={row.id}>
			<S.TableRow
				onClick={() => {
					setExpandedRows((prev) => (prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]));
				}}
				className={isExpanded ? 'expanded' : ''}
			>
				<S.TableCell align="center">{index + 1}</S.TableCell>
				<S.TableCell style={{ position: 'relative' }}>
					<S.TokenInfo>
						<TokenAvatar logo={row.flp_token_logo} size="large" />
						{row.flp_token_name && <span>{row.flp_token_name}</span>}
						<span style={{ color: '#757575' }}>{formatTicker(row.flp_token_ticker)}</span>
					</S.TokenInfo>
					<div style={{ position: 'absolute', left: 45, bottom: 14, zIndex: 9999999 }}>
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
						) : isNotStartedYet ? (
							<Tooltip content={timeRemainingText}>
								<S.AddButton disabled>Not started yet</S.AddButton>
							</Tooltip>
						) : (
							<>
								<ReactSVG
									src={ASSETS.plus}
									style={{
										width: '16px',
										height: '16px',
										color:
											isSubmitting || isMaxAllocation || row.status !== 'Active' || isNotStartedYet
												? '#aaa'
												: '#51c85b',
									}}
								/>
								<S.AddButton
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										handleAllocationChange(row.id, 5);
									}}
									disabled={isSubmitting || isMaxAllocation || row.status !== 'Active'}
								>
									Add
								</S.AddButton>
							</>
						)}
					</S.RowActionContainer>
				</S.TableCell>
			</S.TableRow>
			<FlpDetailsRow row={row} isExpanded={isExpanded} colSpan={7} />
		</React.Fragment>
	);
};
