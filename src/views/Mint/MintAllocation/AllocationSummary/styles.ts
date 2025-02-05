import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	padding: 20px;
`;

export const Header = styled.div`
	width: 100%;
	padding: 0 0 7.5px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	span {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
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
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
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
`;

export const ChartKeyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 20px;
	margin: 20px 0 0 0;
`;

export const ChartKeyLine = styled.div`
	display: flex;
	align-items: center;
	gap: 2.5px;
`;

export const ChartKey = styled.div<{ background: string }>`
	min-height: 15px;
	min-width: 15px;
	background: ${(props) => props.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt4};
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
	line-height: calc(${(props) => props.theme.typography.size.xSmall} + 5px);
	font-size: ${(props) => props.theme.typography.size.xSmall};
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

	span {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
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
`;

export const SummaryLineLabel = styled.div`
	width: 140px;
	display: flex;
	align-items: center;
	gap: 10px;
	span {
		width: 100%;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const SummaryLineActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		display: none;
	}
`;

export const SummaryLineActions = styled.div`
	display: flex;
	align-items: center;
	gap: 17.5px;

	button {
		span {
			font-family: ${(props) => props.theme.typography.family.alt1} !important;
			font-weight: ${(props) => props.theme.typography.weight.bold} !important;
			text-decoration: underline;
			text-decoration-thickness: 1.25px;
		}
	}

	#indicator {
		span {
			color: ${(props) => props.theme.colors.indicator.primary} !important;
		}

		&:hover {
			span {
				color: ${(props) => props.theme.colors.indicator.active} !important;
			}
		}

		&:disabled {
			span {
				color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
			}

			&:hover {
				span {
					color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
				}
			}
		}
	}
`;

export const SummaryLinePercentage = styled.div`
	width: 40px;
	display: flex;
	justify-content: flex-end;
	P {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		text-align: right;
	}
`;

export const ActionMain = styled.div`
	width: 100%;
	margin: 25px 0 0 0;
`;
