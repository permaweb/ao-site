import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding: 10px 0 35px 0;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		padding: 0 0 40px 0;
	}
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

export const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 10px;
`;

export const HeaderInfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

export const HeaderInfo = styled.div`
	h6 {
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const HeaderTooltip = styled.div`
	button {
		display: flex;
		align-items: center;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.link.color};

		svg {
			height: 15px;
			width: 15px;
			fill: ${(props) => props.theme.colors.link.color};
			margin: 5.5px 5.5px 0 0;
		}

		&:hover {
			color: ${(props) => props.theme.colors.link.active};

			svg {
				color: ${(props) => props.theme.colors.link.active};
			}
		}
		&:focus {
			color: ${(props) => props.theme.colors.link.active};

			svg {
				color: ${(props) => props.theme.colors.link.active};
			}
		}
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

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		position: relative;
	}
`;

export const MetricsSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
`;

export const MetricsValue = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
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

export const BalancesPrimaryWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
	margin: 0 0 20px 0;
`;

export const BalancesBreakdownWrapper = styled(BalancesPrimaryWrapper)``;

export const BalanceQuantityBody = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
	}

	p {
		display: flex;
		align-items: center;
		gap: 7.5px;
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
			margin: 6.5px 3.5px 0 0;
		}
	}
`;

export const BalancesGlobalWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	padding: 24.5px 20px 20px 20px;

	${BalanceQuantityBody} {
		p,
		span {
			font-size: ${(props) => props.theme.typography.size.xLg};
		}

		#text-loader {
			min-height: 40px;
		}
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}
`;

export const BalancesPrimaryFlexWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px 100px;
`;

export const BalanceQuantitySection = styled.div`
	width: 175px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 2.5px;
`;

export const BalanceQuantityEndSection = styled(BalanceQuantitySection)`
	align-items: flex-end;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		align-items: flex-start;
	}
`;

export const BalanceQuantityHeader = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const ModalWrapper = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;
