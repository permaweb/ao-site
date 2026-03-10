import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	padding-top: 32px;
	padding-bottom: 32px;
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
		opacity: 0.5;
		pointer-events: none;
	}
`;

export const ContentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	margin: 0 0 0 auto;

	h4 {
		line-height: 1.35;
		position: relative;
		transition: ${open} ${fadeIn2};
		padding: 0 20px 0 0px;
		font-size: ${(props) => props.theme.typography.size.xxxLg};

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
		max-width: 350px;
		text-wrap: balance;
		line-height: 1.5;
		font-size: clamp(15px, 1.65vw, 17px);
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
		text-align: left;
		padding: 30px 20px 20px 0px;
		margin: -10px 0 0 0;
		position: relative;
		transition: ${open} ${fadeIn2};

		a {
			font-size: clamp(14px, 1.65vw, 16px);
			font-family: ${(props) => props.theme.typography.family.primary};
			font-weight: ${(props) => props.theme.typography.weight.regular};
			color: ${(props) => props.theme.colors.font.primary};
			text-decoration: underline;

			&:hover {
				color: ${(props) => props.theme.colors.font.alt1};
			}
		}

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
		font-size: ${(props) => props.theme.typography.size.small};
		text-transform: none;
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
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}

	#text-loader {
		min-height: 22.5px;
	}
`;

export const Indicator = styled.div`
	height: 6px;
	width: 6px;
	background: ${(props) => props.theme.colors.indicator.active};
	border-radius: 50%;
	position: relative;
	flex-shrink: 0;

	&:before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: ${(props) => props.theme.colors.indicator.active};
		animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes ping {
		0% {
			transform: scale(1);
			opacity: 0.75;
		}
		75%,
		100% {
			transform: scale(2.8);
			opacity: 0;
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
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		line-height: 1;
		text-transform: none;
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;
