import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	min-height: calc(100vh - 115px);
	justify-content: space-between;
	position: relative;
	z-index: 3;
`;

export const GraphicWrapper = styled.div`
	video {
		height: calc(100vh - ${STYLING.dimensions.nav.height});
		width: 100vw;
		object-fit: cover;
		position: fixed;
		top: ${STYLING.dimensions.nav.height};
		left: 0;
		z-index: 2;
	}
`;

export const ContentWrapper = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;
	margin: 0 0 0 auto;

	h4 {
		line-height: 1.35;
		font-weight: ${(props) => props.theme.typography.weight.regular};
		background: ${(props) => props.theme.colors.view.background};
	}

	p {
		max-width: 415px;
		line-height: 1.35;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-align: right;
		padding: 10px 0 0 0;
		background: ${(props) => props.theme.colors.view.background};
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
	width: 425px;
	max-width: 90vw;
	backdrop-filter: blur(7.5px);
	background: ${(props) => props.theme.colors.view.background};

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
