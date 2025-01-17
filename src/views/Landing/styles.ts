import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	min-height: calc(100vh - 115px);
	justify-content: space-between;
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;

	h4 {
		line-height: 1.35;
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}

	p {
		max-width: 415px;
		line-height: 1.35;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-align: right;
		margin: 10px 0 0 0;
	}
`;

export const MetricsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: center;
	justify-content: space-between;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const MetricsSection = styled.div`
	width: 385px;
	max-width: 90vw;

	> * {
		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
	}
`;

export const MetricsLine = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 0;

	span {
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const MetricsValue = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;
	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Indicator = styled.div`
	height: 12.5px;
	width: 12.5px;
	background: ${(props) => props.theme.colors.indicator.active};
	border-radius: 50%;
`;
