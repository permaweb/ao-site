import styled from 'styled-components';

export const Ellipsis = styled.span`
	min-height: 27.5px;
	width: 15px;
	display: flex;
	font-weight: ${(props) => props.theme.typography.weight.bold} !important;
`;
