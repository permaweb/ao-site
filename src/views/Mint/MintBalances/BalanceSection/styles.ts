import styled, { DefaultTheme } from 'styled-components';

import { STYLING } from 'helpers/config';
import { TokenEarningsType } from 'helpers/types';

function getBalanceWrapper(type: TokenEarningsType, theme: DefaultTheme) {
	switch (type) {
		case 'arweave':
			return `
				background: ${theme.colors.container.alt1.background};
			`;
		case 'stEth':
		case 'dai':
			return `
				background: ${theme.colors.container.primary.background};
			`;
	}
}

export const BalanceSection = styled.div<{ type: TokenEarningsType }>`
	width: 100%;
	padding: 20px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	${(props) => getBalanceWrapper(props.type, props.theme)};
`;

export const BalanceHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
`;

export const BalanceHeader = styled.div`
	span {
		line-height: 1;
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const BalanceBodyWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin: 40px 0 0 0;
	flex-wrap: wrap;
	gap: 20px;
`;

export const BalanceQuantitySection = styled.div`
	width: 175px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 2.5px;
`;

export const BalanceQuantityEndSection = styled(BalanceQuantitySection)`
	align-items: flex-end;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		align-items: flex-start;
	}
`;

export const BalancesQuantityFlexSection = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
	margin: 0 0 0 auto;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0;
	}
`;

export const BalanceQuantityHeader = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BalanceQuantityBody = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
	}

	p {
		display: flex;
		align-items: center;
		gap: 7.5px;
		margin: 1.5px 0 0 0;
	}

	svg {
		height: 20px;
		width: 20px;
		margin: 6.5px 0 0 0;
	}
`;

export const BalanceQuantityFooter = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	button {
		margin: 3.5px 0 0 0;
		span {
			color: ${(props) => props.theme.colors.link.color} !important;
			font-family: ${(props) => props.theme.typography.family.alt1} !important;
		}

		&:hover {
			text-decoration: underline;
			text-decoration-thickness: 1.25px;
			text-decoration-color: ${(props) => props.theme.colors.link.active} !important;
			span {
				color: ${(props) => props.theme.colors.link.active} !important;
			}
		}
		&:focus {
			text-decoration: underline;
			text-decoration-thickness: 1.25px;
			text-decoration-color: ${(props) => props.theme.colors.link.active} !important;
			span {
				color: ${(props) => props.theme.colors.link.active} !important;
			}
		}
	}
`;
