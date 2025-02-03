import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 0 0 40px 0;
`;

export const GlobalWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 20px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		gap: 40px;
	}
`;

export const GlobalSection = styled.div`
	height: fit-content;
	width: calc(50% - 20px);

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const InfoWrapper = styled(GlobalSection)``;

export const InfoHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 7.5px;
	padding: 22.5px 25px;
	background: ${(props) => props.theme.colors.container.alt2.background};

	p {
		font-size: clamp(24px, 2.75vw, 28px);
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
		text-transform: uppercase;
	}

	svg {
		height: 20px;
		width: 20px;
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
	padding: 25px;
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};

		b {
			font-weight: ${(props) => props.theme.typography.weight.xBold};
		}
	}

	a {
		width: fit-content;
		display: block;
		margin: 20px 0 0 0;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.link.color};
		text-decoration: underline;
		text-decoration-thickness: 1.25px;

		&:hover {
			color: ${(props) => props.theme.colors.link.active};
		}
	}

	#info-body-subheader {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const MetricsWrapper = styled(GlobalSection)`
	position: relative;
`;

export const Metrics = styled.div`
	width: fit-content;
	display: flex;
	gap: 15px;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
`;

export const MetricsSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
`;

export const MetricsValue = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5px;

	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		line-height: 1;
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const MetricsValueMain = styled(MetricsValue)`
	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
	}
`;
