import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const ModuleWrapper = styled.div`
	width: 100%;
`;

export const StakeForm = styled.form`
	width: 100%;
`;

export const TabRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
	cursor: pointer;
	border: none;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) =>
		props.$active ? props.theme.colors.container.primary.background : props.theme.colors.container.alt1.background};
	color: ${(props) => (props.$active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)};
	font-family: ${(props) => props.theme.typography.family.primary};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	font-size: 32px;
	padding: 24px 20px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		font-size: ${(props) => props.theme.typography.size.lg};
	}
`;

export const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		grid-template-columns: 1fr;
	}
`;

export const StatCell = styled.div`
	padding: 20px 22px 24px;

	&:first-child {
		border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		&:first-child {
			border-right: none;
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}

	span {
		display: block;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
		margin-bottom: 8px;
	}

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: 40px;
		color: ${(props) => props.theme.colors.font.primary};
		margin: 0;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		p {
			font-size: 30px;
		}
	}
`;

export const AmountBlock = styled.div`
	margin: 22px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 24px 16px;
`;

export const AmountInput = styled.input`
	flex: 1;
	min-width: 0;
	border: none;
	outline: none;
	background: transparent;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: 84px;
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.primary};
	font-variant-numeric: tabular-nums;

	&::placeholder {
		color: ${(props) => props.theme.colors.font.primary};
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 58px;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		font-size: 42px;
	}
`;

export const AmountUnit = styled.span`
	flex-shrink: 0;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: 74px;
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.primary};

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 48px;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		font-size: 36px;
	}
`;

export const PresetRow = styled.div`
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	gap: 8px;
	padding: 0 22px;

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
`;

export const PresetButton = styled.button<{ $active?: boolean }>`
	cursor: pointer;
	border: 1px solid
		${(props) => (props.$active ? props.theme.colors.button.alt1.background : props.theme.colors.border.primary)};
	background: ${(props) =>
		props.$active ? props.theme.colors.button.alt1.background : props.theme.colors.container.alt1.background};
	color: ${(props) => (props.$active ? props.theme.colors.button.alt1.color : props.theme.colors.font.primary)};
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xLg};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	min-height: 74px;
	padding: 12px 10px;
	text-align: left;

	&:hover {
		border-color: ${(props) => props.theme.colors.button.alt1.background};
	}

	&:last-child {
		color: ${(props) =>
			props.$active ? props.theme.colors.button.alt1.color : props.theme.colors.indicator.active};
	}
`;

export const PeersWrap = styled.div`
	position: relative;
	margin: 16px 22px 0;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 20px 24px 22px;
`;

export const PeersTitle = styled.p`
	margin: 0 0 12px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.lg};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.primary};
`;

export const PeersTable = styled.div`
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
`;

export const PeerRow = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 14px 12px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	&:last-child {
		border-bottom: none;
	}
`;

export const PeerIndex = styled.span`
	width: 24px;
	flex-shrink: 0;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	color: ${(props) => props.theme.colors.font.alt1};
`;

export const PeerInput = styled.input`
	flex: 1;
	min-width: 0;
	border: none;
	outline: none;
	background: transparent;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	color: ${(props) => props.theme.colors.font.primary};

	&::placeholder {
		color: ${(props) => props.theme.colors.border.alt1};
	}
`;

export const RemovePeerButton = styled.button`
	cursor: pointer;
	flex-shrink: 0;
	border: none;
	background: transparent;
	padding: 0;
	margin-left: auto;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.alt1};
	line-height: 1;

	&:hover {
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const AddMoreButton = styled.button`
	cursor: pointer;
	position: absolute;
	left: 50%;
	bottom: 14px;
	transform: translateX(-50%);
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	color: ${(props) => props.theme.colors.font.primary};
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	padding: 4px 22px;
`;

export const ActionWrap = styled.div`
	display: flex;
	justify-content: center;
	padding: 18px 22px 22px;

	button {
		width: 100%;
		height: 90px;
		font-size: 42px;
		font-weight: ${(props) => props.theme.typography.weight.regular};
		border-radius: 0;
		text-transform: none;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		button {
			height: 72px;
			font-size: ${(props) => props.theme.typography.size.xLg};
		}
	}
`;

export const SubmitButton = styled.button`
	cursor: pointer;
	width: 100%;
	height: 90px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};
	color: ${(props) => props.theme.colors.font.primary};
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: 42px;
	font-weight: ${(props) => props.theme.typography.weight.regular};
	text-transform: none;

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		height: 72px;
		font-size: ${(props) => props.theme.typography.size.xLg};
	}
`;

export const FeedbackLine = styled.p<{ $variant?: 'neutral' | 'error' }>`
	padding: 0 22px 20px;
	margin: 0;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	color: ${(props) =>
		props.$variant === 'error' ? props.theme.colors.indicator.active : props.theme.colors.font.alt1};
`;

export const DescriptionPanel = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 14px;
	padding: 4px 0 0;

	h2 {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xLg};
		color: ${(props) => props.theme.colors.font.primary};
		line-height: 1.3;
		margin: 0;
	}

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
		line-height: 1.55;
		margin: 0;
	}
`;
