import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div``;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const S1Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
`;

export const Action = styled.div`
	button {
		span {
			font-size: ${(props) => props.theme.typography.size.base} !important;
		}
	}
`;

export const PrimaryAmount = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 35px 20px 20px 20px;
	position: relative;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
	h2 {
		margin: 10px 0;
		font-weight: ${(props) => props.theme.typography.weight.xBold};
	}
`;

export const LoadingWrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const WalletLoadingWrapper = styled(LoadingWrapper)`
	position: absolute;
	bottom: 0;
	right: 0;
	height: 30px;
	bottom: 5px;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		position: relative;
	}
`;

export const Loader = styled.div``;
