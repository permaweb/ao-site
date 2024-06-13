import styled from 'styled-components';

export const Wrapper = styled.div`
	min-height: 100vh;
	width: 100%;
	position: relative;
`;

export const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const Header = styled.h2`
	font-size: 28px;
`;

export const Divider = styled.div`
	height: 32px;
	width: 1px;
	margin: 0 22.5px;
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Message = styled.p`
	font-size: 18px;
	margin-right: 10px;
`;
