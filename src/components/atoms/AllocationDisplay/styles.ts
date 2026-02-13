import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		color: ${(props) => props.theme.colors.font.primary} !important;
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary} !important;
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		color: ${(props) => props.theme.colors.font.alt1} !important;
	}
`;

export const Indicator = styled.div<{ color: string }>`
	height: 9.5px;
	width: 9.5px;
	background: ${(props) => props.color};
	margin: -0.5px 2.5px 0 0;
`;
