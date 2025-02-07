import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12.5px;

	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.lg};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-family: ${(props) => props.theme.typography.family.alt1};
	}

	svg {
		height: 22.5px;
		width: 22.5px;
		margin: 6.5px 0 0 0px;
	}
`;

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TabsWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;

	button {
		flex: 1;
	}
`;

export const Form = styled.div<{ invalid: boolean }>`
	display: flex;
	align-items: center;
	z-index: 20;
	position: relative;
	input {
		height: 75px;
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		color: ${(props) =>
			!props.invalid ? props.theme.colors.font.primary : props.theme.colors.warning.primary} !important;
		padding: 15px;
		border-radius: 0;
		margin: 0 !important;
		&:disabled {
			background: transparent !important;
			color: ${(props) => props.theme.colors.form.disabled.label} !important;
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

export const FormHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 12.5px;

	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const FormFieldAction = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 12.5px;
`;

export const FormFieldLabel = styled.div<{ disabled: boolean }>`
	height: 67.5px;
	display: flex;
	gap: 12.5px;
	align-items: center;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(0, -50%);
	padding: 0 15px;
	margin: 0 2.5px 0 0;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-top-right-radius: ${STYLING.dimensions.radius.primary};
	border-bottom-right-radius: ${STYLING.dimensions.radius.primary};
	svg {
		height: 27.5px;
		width: 27.5px;
		margin: 6.5px 0 0 0px;
	}
	p {
		color: ${(props) =>
			props.disabled ? props.theme.colors.button.primary.disabled.color : props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-family: ${(props) => props.theme.typography.family.alt1};
		text-transform: uppercase;
	}
`;

export const FormMessage = styled.div`
	p {
		color: ${(props) => props.theme.colors.warning.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-family: ${(props) => props.theme.typography.family.alt1};
	}
`;

export const RecipientWrapper = styled.div``;

export const ActionWrapper = styled.div`
	button {
		span {
			font-size: ${(props) => props.theme.typography.size.small} !important;
		}

		svg {
			height: 17.5px !important;
			width: 17.5px !important;
			margin: 3.5px 9.5px 0 0 !important;
		}
	}
`;

export const EndWrapper = styled.div``;

export const EndActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 15px;
`;
