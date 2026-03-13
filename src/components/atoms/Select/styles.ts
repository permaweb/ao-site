import styled from 'styled-components';

export const Wrapper = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	align-items: center;
`;

export const Label = styled.div<{ disabled: boolean }>`
	margin: 0 0 5px 0;
	span {
		color: ${(props) =>
			props.disabled ? props.theme.colors.button.primary.disabled.color : props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		line-height: 1.5;
	}
`;

export const Dropdown = styled.button<{ active: boolean }>`
	height: 42px;
	text-align: left;
	padding: 0 12.5px;
	display: flex;
	gap: 4px;
	align-items: center;
	background: ${(props) =>
		props.active ? props.theme.colors.button.primary.active.background : props.theme.colors.button.primary.background};
	transition: all 100ms;
	&:disabled {
		background: ${(props) => props.theme.colors.button.primary.disabled.background};
		span {
			color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
		}
		svg {
			color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
		}
	}

	span {
		margin-right: 8px;
		width: fit-content;
		text-overflow: ellipsis;
		overflow: hidden;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xLg} !important;
		font-weight: ${(props) => props.theme.typography.weight.light} !important;
		color: ${(props) => props.theme.colors.button.primary.color} !important;
	}
`;

export const DropdownArrow = styled.div<{ disabled: boolean }>`
	svg {
		margin-top: 5px;
		height: 25px !important;
		width: 25px !important;
		transform: rotate(90deg);
		color: ${(props) =>
			props.disabled ? props.theme.colors.button.primary.disabled.color : props.theme.colors.font.primary};
	}
`;

export const Options = styled.ul`
	width: 100%;
	position: absolute;
	top: 50px;
	z-index: 20;
	padding: 10px 0;
`;

export const Option = styled.li<{ active: boolean }>`
	text-align: center;
	height: 37.5px;
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: ${(props) => (props.active ? 'default' : 'pointer')};
	pointer-events: ${(props) => (props.active ? 'none' : 'all')};
	color: ${(props) => (props.active ? props.theme.colors.font.light1 : props.theme.colors.font.primary)};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	background: ${(props) =>
		props.active ? props.theme.colors.container.alt7.background : props.theme.colors.container.primary.active};
	border: 1px solid transparent;
	padding: 5px 15px;
	transition: all 100ms;
	&:hover {
		color: ${(props) => props.theme.colors.font.light1};
		background: ${(props) => props.theme.colors.container.alt7.background};
	}
	svg {
		width: 20px !important;
		height: 20px !important;
		vertical-align: bottom;
	}
`;
