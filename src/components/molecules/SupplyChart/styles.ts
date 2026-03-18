import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 398.5px;
	width: 100%;
	position: relative;
	cursor: crosshair;
	overflow: hidden;

	canvas {
		width: calc(100% + 15px) !important;
		position: absolute;
		top: 9.5px;
		left: -9.5px;
	}
`;
