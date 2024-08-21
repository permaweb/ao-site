import styled from 'styled-components';

export const DisconnectWrapper = styled.div`
	width: fit-content;
	margin: 40px 0 0 auto;
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

export const WalletAction = styled.div<{ connected: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;

	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.primary};
		text-transform: uppercase;
	}

	.indicator {
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background: ${(props) =>
			props.connected ? props.theme.colors.indicator.active : props.theme.colors.warning.primary};
	}

	svg {
		margin-bottom: -2px;
		height: 14px;
		width: 14px;
	}
`;
