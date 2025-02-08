import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	min-height: calc(100vh - (${STYLING.dimensions.nav.height} + 20px));
	justify-content: space-between;
	position: relative;
	z-index: 3;
`;

export const GraphicWrapper = styled.div`
	video {
		height: calc(100vh - (${STYLING.dimensions.nav.height} + 20px));
		width: 100vw;
		object-fit: cover;
		position: fixed;
		top: ${STYLING.dimensions.nav.height};
		left: 0;
		z-index: 2;
		opacity: 0.85;
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
		position: relative;
		transition: ${open} ${fadeIn2};
		padding: 0 0 0 20px;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: ${(props) => props.theme.colors.view.background};
			z-index: -1;
			filter: blur(0);
		}
	}

	p {
		max-width: 415px;
		line-height: 1.5;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-size: clamp(16px, 1.65vw, 18px);
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-align: right;
		padding: 30px 0 20px 20px;
		margin: -10px 0 0 0;
		position: relative;
		transition: ${open} ${fadeIn2};

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
	}
`;

export const MetricsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: flex-end;
	justify-content: space-between;

	> * {
		&:first-child {
			padding: 25px 25px 0 0;
		}
		&:last-child {
			padding: 25px 0 0 25px;
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;

		> * {
			&:first-child {
				padding: 0;
			}
			&:last-child {
				padding: 0;
			}
		}
	}
`;

export const MetricsSection = styled.div`
	width: 465px;
	position: relative;
	transition: ${open} ${fadeIn2};

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

	> * {
		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
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
		height: 22.5px;
		display: block;
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;

export const MetricsValue = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	p {
		height: 22.5px;
		display: block;
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}

	#text-loader {
		min-height: 22.5px;
	}
`;

export const Indicator = styled.div`
	height: 11.5px;
	width: 11.5px;
	background: ${(props) => props.theme.colors.indicator.active};
	border-radius: 50%;
	animation: pulse 1.075s infinite;

	@keyframes pulse {
		0%,
		100% {
			background: ${(props) => props.theme.colors.indicator.active};
			transform: scale(1);
		}
		50% {
			background: ${(props) => props.theme.colors.indicator.primary};
			transform: scale(1.15);
		}
	}
`;

export const LinksWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 28.5px;
	position: relative;
	padding: 20px 20px 16.5px 20px;

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

	a {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		line-height: 1;
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;
