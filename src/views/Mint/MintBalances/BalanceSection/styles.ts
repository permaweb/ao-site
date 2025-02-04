import styled, { DefaultTheme } from 'styled-components';

import { STYLING } from 'helpers/config';
import { EthTokenEnum, TokenEarningsType } from 'helpers/types';

function getBalanceWrapper(type: TokenEarningsType, theme: DefaultTheme) {
	switch (type) {
		case 'ao':
		case 'arweave':
			return `
				background: ${theme.colors.container.alt1.background};
			`;
		case EthTokenEnum.StEth:
		case EthTokenEnum.DAI:
			return `
				background: ${theme.colors.container.primary.background};
				border: 1px solid ${theme.colors.border.primary};
			`;
	}
}

export const BalanceSection = styled.div<{ type: TokenEarningsType }>`
	width: 100%;
	padding: 20px;
	${(props) => getBalanceWrapper(props.type, props.theme)};
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		padding: 40px 25px;
	}
`;

export const BalanceHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
		gap: 30px;
	}
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

export const BalanceWalletWrapper = styled.div`
	position: relative;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		width: 100%;
	}
`;

export const BalanceWalletAction = styled.div`
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		button {
			height: 55px !important;
			width: 100% !important;
		}
	}
`;

export const BalanceWalletDropdown = styled.div`
	width: 300px;
	max-width: 90vw;
	position: absolute;
	z-index: 1;
	top: 47.5px;
	right: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 12.5px 20px 13.5px 20px;
	border-radius: ${STYLING.dimensions.radius.primary};

	button {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 7.5px;
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};

		svg {
			height: 15.5px;
			width: 15.5px;
			margin: 5.5px 0 0 0;
			color: ${(props) => props.theme.colors.font.primary};
			fill: ${(props) => props.theme.colors.font.primary};
		}

		&:hover {
			color: ${(props) => props.theme.colors.font.alt1};

			svg {
				color: ${(props) => props.theme.colors.font.alt1};
				fill: ${(props) => props.theme.colors.font.alt1};
			}
		}
	}

	#disconnect-action {
		&:hover {
			color: ${(props) => props.theme.colors.warning.primary};

			svg {
				color: ${(props) => props.theme.colors.warning.primary};
				fill: ${(props) => props.theme.colors.warning.primary};
			}
		}
	}

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		top: 60.5px;
		right: auto;
		left: 0;
		width: 100%;
	}
`;

export const BalanceWalletDropdownLine = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 0 0 10px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};

		b {
			font-weight: ${(props) => props.theme.typography.weight.xBold};
		}
	}

	svg {
		height: 16.5px;
		width: 16.5px;
		margin: 6.5px 2.5px 0 5px;
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
	gap: 25px;
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

	#ao-logo {
		svg {
			height: 25px;
			width: 25px;
			margin: 6.5px 3.5px 0 0;
		}
	}
`;

export const BalanceQuantityFooter = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BalanceAction = styled.div`
	width: 100%;
	button {
		span {
			font-size: ${(props) => props.theme.typography.size.small} !important;
		}

		svg {
			height: 17.5px !important;
			width: 17.5px !important;
			margin: 3.5px 9.5px 0 0 !important;
		}
	}
`;

export const ActionWrapper = styled.div`
	width: 100%;
	padding: 0 20px 20px 20px;
`;
