import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div``;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const S1Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
`;

export const CalcWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7.5px;
`;

export const CalcInfo = styled.div`
	button {
		width: 25px !important;
	}
`;

export const CalcModalBody = styled.div`
	p {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.alt1};
	}
`;

export const CalcBody = styled.div`
	width: 100%;
	overflow: hidden;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	> * {
		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const CalcLine = styled.div`
	height: 40px;
	width: 100%;
	display: flex;
	> * {
		&:not(:last-child) {
			border-right: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const CalcCell = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	flex: 1;
`;

export const CalcCellEmpty = styled(CalcCell)`
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		display: none;
	}
`;

export const CalcHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 0 12.5px;
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		text-transform: uppercase;
	}
	svg {
		height: 15px;
		width: 15px;
		margin: 5px 0 0 0;
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const CalcLineHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 0 12.5px;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const CalcLineHeaderCenter = styled(CalcLineHeader)`
	margin: 0 auto;
`;

export const CalcInput = styled.div`
	width: 100%;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	div {
		width: 100%;
		margin: 0;
		input {
			height: 100%;
			width: 100%;
			margin: 0;
			border: none !important;
			border-top: 1px solid ${(props) => props.theme.colors.border.primary} !important;
			box-shadow: none !important;
			font-size: ${(props) => props.theme.typography.size.base};
			border-radius: 0;
			padding: 10px 40px 10px 10px;
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			&[type='number'] {
				-moz-appearance: textfield;
				appearance: textfield;
			}
			@media (max-width: ${STYLING.cutoffs.secondary}) {
				border: 1px solid ${(props) => props.theme.colors.border.primary} !important;
			}
		}
	}
`;

export const CalcInputClear = styled.div`
	width: fit-content !important;
	position: absolute;
	top: 50%;
	right: 12.5px;
	transform: translate(0, -50%);
	button {
		height: 25px !important;
		width: 25px !important;
	}
`;

export const CalcOutput = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt2.background};
	span {
		color: ${(props) => props.theme.colors.indicator.number};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-transform: uppercase;
		display: block;
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		justify-content: flex-start;
		margin: 0 12.5px;
	}
`;

export const Action = styled.div`
	button {
		span {
			font-size: ${(props) => props.theme.typography.size.base} !important;
		}
	}
`;

export const PrimaryAmount = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 35px 20px 20px 20px;
	position: relative;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
	h2 {
		margin: 10px 0;
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const LoadingWrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const WalletLoadingWrapper = styled(LoadingWrapper)`
	position: absolute;
	bottom: 0;
	right: 0;
	height: 30px;
	bottom: 5px;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		position: relative;
	}
`;

export const Loader = styled.div``;
