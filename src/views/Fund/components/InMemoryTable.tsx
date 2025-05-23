import React from 'react';
import styled from 'styled-components';

import { SortByIcon } from './SortByIcon';
interface InMemoryTableProps {
	data: any[];
	pageSize: number;
	onLoadMore?: () => void;
	sortedBy?: string;
	headerCells: {
		label: string | React.ReactNode;
		align?: 'left' | 'center' | 'right';
		style?: React.CSSProperties;
		key?: string;
	}[];
	renderRow: (row: any, index: number) => React.ReactNode;
	isTablet?: boolean;
}

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const TableHeader = styled.th<{ align?: 'left' | 'center' | 'right' }>`
	text-align: ${(props) => props.align || 'left'};
	padding: 10px;
	font-size: 11px;
	font-weight: 400;
	vertical-align: middle;
`;

const TableBody = styled.tbody`
	tr:last-child td {
		border-bottom: none;
	}
`;

const LoadMoreButton = styled.button`
	margin: 0 auto;
	padding: 10px 20px;
	background: transparent;
	border: 1px solid #ddd;
	border-radius: 0.5rem;
	cursor: pointer;
	font-weight: 500;

	&:hover {
		background: #f5f5f5;
	}
`;

export function InMemoryTable({
	sortedBy,
	data,
	pageSize,
	onLoadMore,
	headerCells,
	renderRow,
	isTablet,
}: InMemoryTableProps) {
	const displayedData = data.slice(0, pageSize);
	const hasMore = data.length > pageSize;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
			<Table>
				{!isTablet && (
					<thead>
						<tr>
							{headerCells.map((cell, index) => (
								<TableHeader key={index} align={cell.align} style={cell.style}>
									{cell.key && sortedBy === cell.key && <SortByIcon style={{ marginRight: 10, marginLeft: 10 }} />}
									{cell.label}
								</TableHeader>
							))}
						</tr>
					</thead>
				)}
				<TableBody>{displayedData.map((row, index) => renderRow(row, index))}</TableBody>
			</Table>
			{hasMore && onLoadMore && <LoadMoreButton onClick={onLoadMore}>Load More</LoadMoreButton>}
		</div>
	);
}
