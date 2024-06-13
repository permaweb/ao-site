import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	padding: 20px;
`;

export const Amounts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const AmountLine = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
`;

export const Amount = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-transform: uppercase;
	}
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const AltAmount = styled(Amount)`
	span {
		display: block;
	}

	p,
	span {
		text-align: right;
		@media (max-width: ${STYLING.cutoffs.secondary}) {
			text-align: left;
		}
	}

	p {
		color: ${(props) => props.theme.colors.indicator.number};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-transform: uppercase;
	}

	.primary-text {
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const TooltipLine = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin: 0 -6.5px 0 0;
	button {
		width: 25px !important;
	}
`;

export const InfoModalBody = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.alt1};
	}
`;

export const LoadingWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: -25px 0 0 0;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const Loader = styled.div``;
