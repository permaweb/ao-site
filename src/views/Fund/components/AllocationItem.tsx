import React from 'react';
import styled from 'styled-components';

import { formatTicker } from '../../../helpers/format';

import { TokenAvatar } from './TokenAvatar';

interface AllocationItemProps {
	ticker: string;
	logo?: string;
	percentage: number;
	color: string;
	isMaxAllocation: boolean;
	disabled?: boolean;
	onAllocationChange: (change: number) => void;
}

const Container = styled.div<{ disabled?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};

	&:hover {
		background: #f5f5f5;
	}
`;

const TokenInfo = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const ColorDot = styled.div<{ color: string }>`
	width: 16px;
	height: 16px;
	border-radius: 0.25rem;
	background: ${(props) => props.color};
`;

const Controls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const Button = styled.button<{ variant?: 'add' | 'remove' }>`
	padding: 0.25rem 0.5rem;
	border: 1px solid #ddd;
	background: white;
	border-radius: 0.25rem;
	cursor: pointer;
	font-weight: 600;
	color: ${(props) => (props.variant === 'add' ? '#0DBD27' : 'inherit')};

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const Percentage = styled.span`
	min-width: 40px;
	text-align: right;
	font-weight: 600;
`;

export function AllocationItem({
	ticker,
	logo,
	percentage,
	color,
	isMaxAllocation,
	disabled,
	onAllocationChange,
}: AllocationItemProps) {
	return (
		<Container disabled={disabled} className="allocation-item">
			<TokenInfo>
				<ColorDot color={color} />
				<TokenAvatar logo={logo} size="medium" />
				<span>{formatTicker(ticker)}</span>
			</TokenInfo>
			<Controls>
				<Button onClick={() => onAllocationChange(-5)} disabled={disabled}>
					-5%
				</Button>
				<Button variant="add" onClick={() => onAllocationChange(5)} disabled={isMaxAllocation || disabled}>
					+5%
				</Button>
				<Percentage>{percentage}%</Percentage>
			</Controls>
		</Container>
	);
}
