import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	min-height: 100vh;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		margin: 0;
	}
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const GlobalWrapper = styled.div`
	--global-pad-top: 23.5px;
	--global-pad-bottom: 20px;
	--global-row-gap: 5px;
	--global-label-line-height: 1.5em;
	--global-value-height: 27.5px;
	--global-section-min-height: calc(
		var(--global-pad-top) + var(--global-pad-bottom) + var(--global-row-gap) + var(--global-label-line-height) +
			var(--global-value-height)
	);

	width: 100%;
	min-height: var(--global-section-min-height);
	display: flex;
	justify-content: space-between;
	gap: 20px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		gap: 0;
	}
`;

export const GlobalSectionsFlex = styled.div`
	display: flex;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const GlobalSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: var(--global-row-gap);
	min-height: var(--global-section-min-height);
	padding: 23.5px 25px 20px 25px;
	flex: 1;
	min-width: 0;

	p {
		min-height: var(--global-value-height);
		min-width: 14ch;
		display: inline-flex;
		align-items: center;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xLg};
		color: ${(props) => props.theme.colors.font.primary};
		line-height: var(--global-value-height);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
		font-feature-settings: 'tnum' on;
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		min-height: auto;
		padding: 25px;
		border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		align-items: center;

		p,
		span {
			text-align: center;
			justify-content: center;
		}
	}
`;

export const GlobalSubSection = styled(GlobalSection)`
	min-width: 250px;
	max-width: 100%;
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 23.5px 35px 20px 35px;

	p,
	span {
		display: flex;
		justify-content: center;
		text-align: center;
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 25px;
		border-left: none;
		border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

		&:last-child {
			border-bottom: none;
		}
	}
`;

export const DepositsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 15px;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		padding: 0;
		background: ${(props) => props.theme.colors.container.alt1.background} !important;
	}
`;

export const NetworkWrapper = styled.div`
	width: 100%;
`;

export const NetworkHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 23.5px 25px 20px 25px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
	}
`;

export const NetworkHeader = styled.div`
	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xLg};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const NetworkHeaderDivider = styled.div`
	height: 25px;
	width: 1px;
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const NetworkHeaderArweave = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
		white-space: nowrap;
	}

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary};
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
	}
`;

export const NetworkHeaderAddress = styled.p<{ disabled?: boolean }>`
	cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
	user-select: none;
	opacity: ${(props) => (props.disabled ? 0.6 : 1)};

	&:hover {
		text-decoration: ${(props) => (props.disabled ? 'none' : 'underline')};
	}
`;

export const NetworkHeaderAddressRow = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	.network-header-logo,
	.network-header-logo > div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.network-header-logo {
		flex-shrink: 0;
		line-height: 0;
	}

	.network-header-logo svg {
		height: 17px;
		width: 17px;
		margin: 0;
		flex-shrink: 0;
	}
`;

export const NetworkHeaderWallet = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 20px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.lg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};

		svg {
			height: 17.5px;
			width: 17.5px;
			color: ${(props) => props.theme.colors.font.alt1};
			fill: ${(props) => props.theme.colors.font.alt1};
			margin: 5.5px 0 0 0;
		}
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
	}
`;

export const NetworkHeaderWalletActions = styled.div`
	display: flex;
	align-items: center;
	gap: 17.5px;
	margin: 0 0 0 auto;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		margin: 0 auto;
	}
`;

export const NetworkBodyWrapper = styled.div`
	width: 100%;
`;

export const NetworkBodyInfoLine = styled.div`
	width: 100%;
	padding: 20px 25px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const NetworkSectionsWrapper = styled.div`
	width: 100%;
	display: flex;

	> * {
		&:not(:last-child) {
			border-right: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;

		> * {
			&:not(:last-child) {
				border-right: none;
				border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
			}
		}
	}
`;

export const NetworkSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 15px 0 0 0;
	}
`;

export const NetworkSectionHeader = styled.div`
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 25px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		border-bottom: none;
	}
`;

export const NetworkSectionBody = styled.div`
	> * {
		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		> * {
			&:not(:last-child) {
				border-bottom: none;
			}
		}
	}
`;

export const NetworkSectionBodyValue = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	gap: 17.5px;
	padding: 0 25px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.lg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	svg {
		height: 24px;
		width: 24px;
		color: ${(props) => props.theme.colors.font.alt1};
		fill: ${(props) => props.theme.colors.font.alt1};
		margin: 5.5px 0 0 0;
	}
`;

export const NetworkDisconnectedIconText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	margin-top: -12px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.primary};
		margin: 0;
	}

	svg {
		height: 18px;
		width: 18px;
		color: ${(props) => props.theme.colors.font.primary};
		fill: ${(props) => props.theme.colors.font.primary};
	}
`;

export const NetworkDisconnected = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 24px;
	padding: 40px 15px;
`;

export const ModalWrapper = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;
