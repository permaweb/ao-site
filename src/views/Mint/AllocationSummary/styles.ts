import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	padding: 20px;
`;

export const Header = styled.div`
	width: 100%;
	padding: 0 0 7.5px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Body = styled.div`
	width: 100%;
	margin: 20px 0 0 0;
`;

export const ChartWrapper = styled.div`
	width: 100%;
`;

export const ChartHeader = styled.div`
	margin: 0 0 20px 0;
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const Chart = styled.div`
	height: auto;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 40px 0 20px 0;
		padding: 0;
	}
`;

export const ChartKeyWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px 35px;
	margin: 20px 0 0 0;
`;

export const ChartKeyLine = styled.div`
	display: flex;
	align-items: center;
	gap: 2.5px;
`;

export const ChartKey = styled.div<{ background: string }>`
	height: 15px;
	width: 15px;
	background: ${(props) => props.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: 2.5px;
`;

export const ChartKeyText = styled.p`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-family: ${(props) => props.theme.typography.family.primary};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary};
	margin: 0 0 0 2.5px;
`;

export const Percentage = styled.p`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	line-height: calc(${(props) => props.theme.typography.size.xSmall} + 5px);
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.alt1};
	padding: 0 !important;
	border: none !important;
`;

export const SummaryWrapper = styled.div`
	margin: 30px 0 0 0;
`;

export const SummaryHeader = styled.div`
	padding: 0 0 7.5px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const SummaryBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12.5px;
	margin: 12.5px 0 0 0;

	> * {
		&:not(:last-child) {
			padding: 0 0 12.5px 0;
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const SummaryLine = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	P {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	span {
		font-weight: ${(props) => props.theme.typography.weight.regular};
	}
`;
