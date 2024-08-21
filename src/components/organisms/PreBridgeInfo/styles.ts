import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const SectionWrapper = styled.div`
	height: fit-content;
	padding: 5px 20px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 100px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const ChartWrapper = styled(SectionWrapper)`
	// padding: 15px 20px 72.5px 10px;
	padding: 0;
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 35px;
	padding: 20px;
`;

export const Description = styled.div`
	display: flex;
	margin-left: -15px;
	svg {
		height: 15px;
		width: 15px;
		margin: 0 10px 0 0;
	}
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.alt1};
		a {
			color: ${(props) => props.theme.colors.font.primary};
			font-weight: ${(props) => props.theme.typography.weight.medium};
			text-decoration: underline;
		}
	}
`;

export const TotalSupply = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 0 0 20px 0;
	p,
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
	span {
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const TotalSupplyAmount = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-transform: uppercase;
		margin: 2.5px 0 0 0;
	}
	svg {
		height: 27.5px;
		width: 27.5px;
		margin: 7.5px 0 0 0;
	}
`;

export const CurrentEarningsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const CurrentEarnings = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 5px 0 0 0;
	h2 {
		line-height: 1;
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	svg {
		height: 38.5px;
		width: 38.5px;
		margin: 6.5px 0 0 0;
	}
`;

export const IconsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 20px;
`;

export const IconGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	p {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.light};
		font-family: ${(props) => props.theme.typography.family.primary};
		text-transform: uppercase;
	}
`;

export const IconsLine = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px 30px;
	svg {
		height: 30px;
		width: 50px;
	}

	div {
		height: 30px;
	}

	.ncc-audit {
		svg {
			height: 30px;
			width: 100px;
		}
	}

	.renascence-audit {
		svg {
			height: 30px;
			width: 125px;
		}
	}

	.codehawks-audit {
		svg {
			height: 30px;
			width: 125px;
		}
	}

	.morpheus-audit {
		svg {
			height: 30px;
			width: 40px;
		}
	}

	a {
		&:hover {
			svg {
				opacity: 0.75;
			}
		}
	}
`;
