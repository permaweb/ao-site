import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	@media (max-width: ${STYLING.cutoffs.mobile}) {
		width: 100%;

		button {
			width: 100% !important;
		}
	}
`;

export const PanelWrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const Metrics = styled.div`
	width: fit-content;
	display: flex;
	gap: 15px;
	flex-direction: column;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	padding: 0 10px 10px 0;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: ${(props) => props.theme.colors.view.background};
		z-index: -1;
		filter: blur(5px);
	}
`;

export const MetricsSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5px;
`;

export const MetricsValue = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	span {
		line-height: 1;
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const MetricsValueMain = styled(MetricsValue)`
	display: flex;
	align-items: center;
	gap: 10.5px;
	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary};

		span {
			font-size: ${(props) => props.theme.typography.size.xLg};
		}
	}

	svg {
		height: 20px;
		width: 20px;
		margin: 6.5px 0 0 0;
	}

	#ao-logo {
		svg {
			height: 30px;
			width: 30px;
		}
	}

	#text-loader {
		min-height: 40px;
	}
`;

export const ChartWrapper = styled.div`
	height: 398.5px;
	width: 100%;
	position: relative;
	cursor: crosshair;
	overflow: hidden;

	canvas {
		width: calc(100% + 15px) !important;
		position: absolute;
		top: 9.5px;
		left: -9.5px;
	}
`;

export const InfoWrapper = styled.div`
	margin: 27.5px 0 0 0;
`;

export const InfoHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 7.5px;
	padding: 0 0 20px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.primary};
		color: ${(props) => props.theme.colors.font.primary};
	}

	svg {
		height: 12px;
		width: 12px;
		color: ${(props) => props.theme.colors.indicator.primary};
		fill: ${(props) => props.theme.colors.indicator.primary};
		margin: 7.5px 0 0 0;
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		h6 {
			line-height: 1.5;
		}
	}
`;

export const InfoBody = styled.div`
	margin: 25px 0 0 0;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt1};
		line-height: 1.65;

		b {
			font-weight: ${(props) => props.theme.typography.weight.medium};
			color: ${(props) => props.theme.colors.font.primary};
		}
	}

	a {
		width: fit-content;
		display: block;
		margin: 20px 0 0 auto;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
		text-decoration: underline;
		text-decoration-thickness: 1.25px;
		transition: all 100ms;

		&:hover {
			color: ${(props) => props.theme.colors.font.alt1};
		}
	}

	#info-body-subheader {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
