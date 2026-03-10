import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	margin-top: 32px;
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const GlobalWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 20px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		gap: 0;
		padding: 15px 0;
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
	gap: 5px;
	padding: 23.5px 25px 20px 25px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xLg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 25px;
		border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

		p,
		span {
			text-align: center;
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
	gap: 6px;

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
		height: 18px;
		width: 18px;
		margin: 0;
		flex-shrink: 0;
	}
`;

export const NetworkHeaderWallet = styled.div`
	display: flex;
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
`;

export const NetworkHeaderWalletActions = styled.div`
	display: flex;
	align-items: center;
	gap: 17.5px;
	margin: 0 0 0 auto;
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
	}
`;

export const NetworkSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
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
