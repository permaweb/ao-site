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
	gap: 0;
	border-bottom: 2px solid ${(props) => props.theme.colors.border.alt1};
	margin-bottom: 10px;
`;

export const TabButton = styled.button<{ active: boolean; disabled: boolean }>`
	background: none;
	border: none;
	padding: 12px 0;
	font-size: ${(props) => props.theme.typography.size.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.primary.alt1)};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	position: relative;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	transition: color 0.2s ease;
	flex: 1;
	text-align: center;

	&:hover {
		color: ${(props) => !props.disabled && props.theme.colors.font.primary};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		right: 0;
		height: 2px;
		background: ${(props) => props.theme.colors.button.alt1.background};
		transform: scaleX(${(props) => (props.active ? 1 : 0)});
		transition: transform 0.2s ease;
	}
`;

export const StepperWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
	padding: 20px 0;
`;

export const StepperItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	flex: 1;
`;

export const StepperStep = styled.div<{ active: boolean; completed: boolean }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-family: ${(props) => props.theme.typography.family.alt1};
	border: 2px solid;
	margin-bottom: 8px;
	transition: all 0.3s ease;

	${(props) => {
		if (props.completed) {
			return `
				background: ${props.theme.colors.button.alt1.background};
				border-color: ${props.theme.colors.button.alt1.background};
				color: ${props.theme.colors.button.alt1.color};
			`;
		} else if (props.active) {
			return `
				background: transparent;
				border-color: ${props.theme.colors.button.alt1.background};
				color: ${props.theme.colors.button.alt1.background};
			`;
		} else {
			return `
				background: transparent;
				border-color: ${props.theme.colors.border.alt1};
				color: ${props.theme.colors.font.primary.alt1};
			`;
		}
	}}
`;

export const StepperLabel = styled.span<{ active: boolean; completed: boolean }>`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-family: ${(props) => props.theme.typography.family.alt1};
	text-align: center;
	transition: color 0.3s ease;

	color: ${(props) => {
		if (props.completed || props.active) {
			return props.theme.colors.font.primary;
		} else {
			return props.theme.colors.font.primary.alt1;
		}
	}};
`;

export const StepperConnector = styled.div<{ completed: boolean }>`
	position: absolute;
	top: 20px;
	left: calc(50% + 20px);
	right: calc(-50% + 20px);
	height: 2px;
	background: ${(props) =>
		props.completed ? props.theme.colors.button.alt1.background : props.theme.colors.border.alt1};
	transition: background 0.3s ease;
	z-index: 1;
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

export const YieldHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-bottom: 20px;

	> span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const YieldComparison = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	flex: 1;

	> svg {
		height: 20px;
		width: 20px;
		margin: 0;
		color: ${(props) => props.theme.colors.font.primary.alt1};
		flex-shrink: 0;
	}
`;

export const YieldToken = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 16px;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border-radius: ${STYLING.dimensions.radius.alt2};
	flex-grow: 1;
	height: fit-content;

	div {
		height: 24px;
	}

	svg {
		height: 24px;
		width: 24px;
		margin: 0;
		flex-shrink: 0;
	}

	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};

		&.yield {
			color: ${(props) => props.theme.colors.button.alt1.background};
			font-weight: ${(props) => props.theme.typography.weight.bold};
			margin-left: auto;
		}
	}
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

export const UpgradeCheckboxWrapper = styled.label`
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 15px;

	input[type='checkbox'] {
		margin-right: 10px;
		height: 18px;
		width: 18px;
		&:disabled {
			cursor: not-allowed;
		}
	}

	font-size: ${(props) => props.theme.typography.size.xSmall};
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	cursor: pointer;
`;

export const ModalContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		line-height: 1.6;
	}
`;

export const ModalActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
	margin-top: 10px;

	button {
		min-width: 120px; // Give buttons some minimum width
	}
`;

export const CompleteScreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 20px;
`;

export const CompleteIcon = styled.div`
	font-size: 60px;
	color: ${(props) => props.theme.colors.button.alt1.background};
	margin-bottom: 10px;
`;

export const CompleteTitle = styled.h2`
	color: ${(props) => props.theme.colors.font.primary};
	font-size: ${(props) => props.theme.typography.size.lg};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-family: ${(props) => props.theme.typography.family.alt1};
	margin: 0;
`;

export const CompleteMessage = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-size: ${(props) => props.theme.typography.size.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
	margin: 0;
`;

export const TxHashWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
	max-width: 400px;
`;

export const TxHashLabel = styled.span`
	color: ${(props) => props.theme.colors.font.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const TxHash = styled.div`
	background: ${(props) => props.theme.colors.container.alt1.background};
	padding: 12px;
	border-radius: ${STYLING.dimensions.radius.primary};
	word-break: break-all;
	color: ${(props) => props.theme.colors.font.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-family: monospace;
	margin-bottom: 8px;
`;
