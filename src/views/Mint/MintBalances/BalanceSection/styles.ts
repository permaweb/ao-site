import styled, { DefaultTheme } from 'styled-components';

import { STYLING } from 'helpers/config';
import { BridgeTokenEarningsType, EthTokenEnum } from 'helpers/types';

function getBalanceWrapper(type: BridgeTokenEarningsType, theme: DefaultTheme) {
	switch (type) {
		case EthTokenEnum.StEth:
		case EthTokenEnum.DAI:
		case EthTokenEnum.USDS:
			return `
				background: ${theme.colors.container.primary.background};
				border: 1px solid ${theme.colors.border.primary};
			`;
	}
}

export const BalanceSection = styled.div<{ type: BridgeTokenEarningsType }>`
	width: 100%;
	${(props) => getBalanceWrapper(props.type, props.theme)};
`;

export const BalanceHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	padding: 20px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
		gap: 30px;
	}
`;

export const BalanceHeader = styled.div`
	width: 100%;
	span {
		line-height: 1;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const BalanceWalletWrapper = styled.div`
	position: relative;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		width: 100%;
	}
`;

export const BalanceWalletAction = styled.div`
	button span {
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
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
	gap: 15px;
	padding: 12.5px 20px 13.5px 20px;
	border-radius: ${STYLING.dimensions.radius.primary};

	button {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 7.5px;
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
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

	@media (max-width: ${STYLING.cutoffs.mobile}) {
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
		font-family: ${(props) => props.theme.typography.family.primary};

		b {
			font-weight: ${(props) => props.theme.typography.weight.regular};
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
	min-height: 250px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 25px;
	padding: 20px;
`;

export const BalanceContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const BalanceQuantityLines = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const BalanceQuantityLine = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2.5px;

	span,
	p {
		display: flex;
		align-items: center;
		gap: 2.5px;
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}

	span {
		color: ${(props) => props.theme.colors.font.alt1};
	}

	p {
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const AssetTicker = styled.span`
	margin-left: 4px;
	color: ${(props) => props.theme.colors.font.alt1};
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

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		align-items: flex-start;
	}
`;

export const BalancesQuantityFlexSection = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 25px;
	margin: 0 0 0 auto;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
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
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
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
	display: flex;
	align-items: flex-end;
	gap: 1.5px;
	position: relative;

	p {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		color: ${(props) => props.theme.colors.font.alt1} !important;
		background: ${(props) => props.theme.colors.container.primary.background};
		position: relative;
		z-index: 1;
		white-space: nowrap;
	}

	span {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary} !important;
		margin-left: auto;
		background: ${(props) => props.theme.colors.container.primary.background};
		position: relative;
		z-index: 1;
		white-space: nowrap;
	}

	.quantity-divider {
		height: 1px;
		width: 100%;
		border-top: 1px dotted ${(props) => props.theme.colors.border.alt2};
		margin: 0 2.5px 5px 2.5px;
	}
`;

export const BalanceAction = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	button {
		width: 100%;
		min-width: unset;

		span {
			font-size: ${(props) => props.theme.typography.size.small} !important;
		}

		svg {
			height: 17.5px !important;
			width: 17.5px !important;
			margin: 3.5px 9.5px 0 0 !important;
		}
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
	}
`;

export const ActionWrapper = styled.div`
	width: 100%;
	padding: 0 20px 20px 20px;
`;

export const ApyRow = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 15px;
`;

export const ApyText = styled.span`
	font-size: ${(props) => props.theme.typography.size.small} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	color: ${(props) => props.theme.colors.indicator.active} !important;
	display: flex;
	margin: 0 0 1.5px 0;
`;

export const YieldContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

export const HeaderRow = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
`;

export const HeaderRowStart = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const NativeYieldText = styled.span`
	display: inline-flex;
	align-items: baseline;
	gap: 4px;
`;

export const NativeYieldLabel = styled.span`
	color: ${(props) => props.theme.colors.font.alt1} !important;
	font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	line-height: 1.35;
	letter-spacing: 0;
`;

export const NativeYieldValue = styled.span`
	color: ${(props) => props.theme.colors.font.primary} !important;
	font-size: ${(props) => props.theme.typography.size.small} !important;
	font-weight: ${(props) => props.theme.typography.weight.semiBold} !important;
	line-height: 1.35;
	letter-spacing: 0;
`;

export const ConvertButtonLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	button & span {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
	}

	small {
		font-size: ${(props) => props.theme.typography.size.xxxSmall};
	}
`;

export const ModalWrapper = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		line-height: 1.6;
		margin: 0;
	}
`;

export const NetworkDisconnectedContent = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const NetworkDisconnectedIconText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	margin-top: -16px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.primary};
		margin: 0;
	}

	/* ReactSVG wrapper - ensure icon container is visible */
	> span,
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 0;
		flex-shrink: 0;
	}

	svg {
		height: 16px;
		width: 16px;
		min-height: 16px;
		min-width: 16px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const NetworkDisconnected = styled.div`
	width: 100%;
	min-height: 240px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0 0 0;

	> *:last-child {
		flex-shrink: 0;
		width: 100%;
	}
`;

export const TooltipWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const TooltipDivider = styled.div`
	height: 1px;
	width: 100%;
	border-top: 1px solid ${(props) => props.theme.colors.border.alt2};
	margin: 12.5px 0;
`;
