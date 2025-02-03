import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 410.5px;
	width: 100%;
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: ${(props) => props.theme.colors.view.background};
		z-index: -1;
		filter: blur(10px);
	}
`;
