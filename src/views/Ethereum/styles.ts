import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div``;

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 60px;
`;

export const DepositWithdrawTopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

export const S1Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
`;

export const TabsWrapper = styled.div`
	width: 100%;
`;

export const TabsHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	button {
		flex: 1;
	}
`;

export const TabContent = styled.div`
	margin: 40px 0 0 0;
`;

export const ActionWrapper = styled.div`
	margin: 20px 0 0 0;
`;

export const Action = styled.div`
	button {
		span {
			font-size: ${(props) => props.theme.typography.size.base} !important;
		}
	}
`;

export const Form = styled.div<{ invalid: boolean }>`
	display: flex;
	align-items: center;
	z-index: 20;
	position: relative;
	input {
		height: 75px;
		font-size: ${(props) => props.theme.typography.size.h2};
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) =>
			!props.invalid ? props.theme.colors.font.primary : props.theme.colors.warning.primary} !important;
		padding: 15px;
		border-radius: 0px;
		&:disabled {
			background: transparent !important;
			color: ${(props) => props.theme.colors.button.alt1.disabled.color} !important;
			box-shadow: none;
			border: 1px solid ${(props) => props.theme.colors.form.disabled.border};
		}
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		&[type='number'] {
			-moz-appearance: textfield;
			appearance: textfield;
		}
	}
`;

export const FormFieldInfo = styled.div`
	position: absolute;
	top: -13.5px;
	left: 0;
	display: flex;
	align-items: center;
	gap: 12.5px;
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const FormFieldAction = styled.div`
	position: absolute;
	top: -13.5px;
	right: 0;
	display: flex;
	align-items: center;
	gap: 12.5px;
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
	button {
		height: 20px;
		width: fit-content !important;
		padding: 0 7.5px;
		border: 1px solid ${(props) => props.theme.colors.button.alt1.border};
		border-radius: ${STYLING.dimensions.radius.alt3};
		background: ${(props) => props.theme.colors.button.alt1.background};
		span {
			color: ${(props) => props.theme.colors.font.primary};
			font-size: 11px;
			font-weight: ${(props) => props.theme.typography.weight.regular};
			text-transform: uppercase;
		}
		&:disabled {
			background: ${(props) => props.theme.colors.button.alt1.disabled.background} !important;
			border: 1px solid ${(props) => props.theme.colors.button.alt1.disabled.border} !important;
			span {
				color: ${(props) => props.theme.colors.button.alt1.disabled.color} !important;
			}
			svg {
				color: ${(props) => props.theme.colors.button.alt1.disabled.color} !important;
			}
		}
		&:hover {
			background: ${(props) => props.theme.colors.button.alt1.active.background};
			border: 1px solid ${(props) => props.theme.colors.button.alt1.active.border};
		}
	}
`;

export const FormFieldLabel = styled.div<{ disabled: boolean }>`
	height: 67.5px;
	display: flex;
	align-items: center;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(0, -50%);
	padding: 0 15px;
	margin: 2.5px 2.5px 0 0;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-top-right-radius: ${STYLING.dimensions.radius.primary};
	border-bottom-right-radius: ${STYLING.dimensions.radius.primary};
	svg {
		height: 32.5px;
		width: 32.5px;
	}
	p {
		color: ${(props) =>
			props.disabled ? props.theme.colors.button.primary.disabled.color : props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.light};
		font-family: ${(props) => props.theme.typography.family.alt1};
	}
`;

export const FormFieldWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	margin-bottom: 20px;
`;

export const FormEndWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const RecipientWrapper = styled.div`
	button {
		span {
			color: ${(props) => props.theme.colors.font.alt1};
			font-size: ${(props) => props.theme.typography.size.small};
			font-weight: ${(props) => props.theme.typography.weight.medium};
			font-family: ${(props) => props.theme.typography.family.alt1};
			text-decoration: underline;
			&:hover {
				color: ${(props) => props.theme.colors.font.primary};
			}
		}

		&:disabled {
			span {
				color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
			}
		}
	}
`;

export const RecipientActions = styled.div`
	align-self: flex-end;
	margin: 10px 0;

	button {
		height: 50px;
	}
	button span {
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
	}
`;

export const ConversionLink = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 0 0 0 auto;
	font-size: ${(props) => props.theme.typography.size.xxSmall};
	gap: 4px;

	a {
		font-family: 'Roboto Mono', monospace !important;
		color: ${(props) => props.theme.colors.font.alt1};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-decoration: underline;
		&:hover {
			color: ${(props) => props.theme.colors.font.primary};
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
