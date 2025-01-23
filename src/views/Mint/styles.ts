import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 60px;
	padding: 20px 0 40px 0;
`;

export const GlobalWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		gap: 40px;
	}
`;

export const GlobalSection = styled.div`
	width: 50%;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const InfoWrapper = styled(GlobalSection)`
	padding: 0 70px 0 0;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 0;
	}
`;

export const InfoHeader = styled.div`
	margin: 0 0 30px 0;
	h6 {
		line-height: 1;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xxLg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		h6 {
			line-height: 1.5;
		}
	}
`;

export const InfoBody = styled.div`
	margin: 20px 0 0 0;
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}

	b {
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	a {
		width: fit-content;
		display: block;
		margin: 20px 0 0 0;
		font-size: ${(props) => props.theme.typography.size.xxSmall};
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
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 55px 40px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 20px;
	}
`;

export const Metrics = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 25px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		padding: 0;
	}
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
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	p,
	span {
		text-align: center;
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		p,
		span {
			text-align: left;
		}
	}
`;

export const MetricsMain = styled(MetricsSection)`
	justify-content: center;

	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
