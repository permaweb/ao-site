import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	height: fit-content;
	width: 500px;
	padding: 20px;
	position: relative;
	display: flex;
    flex-direction: column;
    justify-content: space-between;
	gap: 100px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Section = styled.div`
	display: flex;
    flex-direction: column;
`;

export const WalletAction = styled.button<{ connected: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;

	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-family: ${(props) => props.theme.typography.family.primary};
		text-transform: uppercase;

		&:hover {
			color: ${(props) => props.theme.colors.font.alt1};
		}
	}

	pointer-events: ${(props) => (props.connected ? 'none' : 'default')};

	.indicator {
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background: ${(props) =>
			props.connected ? props.theme.colors.indicator.active : props.theme.colors.warning.primary};
	}
`;

export const Description = styled.div`
	display: flex;
	margin: 20px 0 0 0;
	svg {
		height: 15px;
		width: 15px;
		margin: 0 10px 0 0;
	}
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.alt1};
		a {
			color: ${(props) => props.theme.colors.font.primary};
			font-weight: ${(props) => props.theme.typography.weight.medium};
			text-decoration: underline;
		}
	}
`;

export const TotalSupply = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 0 0 20px 0;
	p,
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
	span {
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const TotalSupplyAmount = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-transform: uppercase;
		margin: 2.5px 0 0 0;
	}
	svg {
		height: 27.5px;
		width: 27.5px;
		margin: 7.5px 0 0 0;
	}
`;

export const CurrentEarningsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const CurrentEarnings = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 5px 0 0 0;
	h2 {
		line-height: 1;
		font-weight: ${(props) => props.theme.typography.weight.xBold};
	}
	svg {
		height: 38.5px;
		width: 38.5px;
		margin: 6.5px 0 0 0;
	}
`;

export const IconsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const IconLine = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5px;
	p {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.primary};
		text-transform: uppercase;
	}
	svg {
		height: 30px;
		width: 50px;
	}

	div {
		height: 30px;
	}

	.ncc-audit {
		svg {
			height: 30px;
			width: 100px;
		}
	}
`;

export const DisconnectWrapper = styled.div`
	width: fit-content;
	margin: 20px 0 0 auto;
	button {
		span {
			color: ${(props) => props.theme.colors.warning.primary};
			font-size: ${(props) => props.theme.typography.size.small};
			font-weight: ${(props) => props.theme.typography.weight.bold};
			font-family: ${(props) => props.theme.typography.family.primary};
			text-transform: uppercase;
		}
		&:hover {
			span {
				color: ${(props) => props.theme.colors.warning.alt1};
			}
		}
	}
`;
