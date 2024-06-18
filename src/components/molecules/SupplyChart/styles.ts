import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 400px;
	width: 100%;
	position: relative;
`;

export const Label = styled.div`
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		text-transform: uppercase;
	}
`;

export const YLabel = styled(Label)`
	margin: 0 0 20px 5px;
`;

export const XLabel = styled(Label)`
	margin: 10px 0 0 0;
	display: flex;
	justify-content: center;
`;
