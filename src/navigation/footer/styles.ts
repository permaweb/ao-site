import styled from 'styled-components';

export const FooterRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	position: relative;
	margin-top: 80px;
	padding: 40px;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const LinksWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 28.5px;

	a {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		line-height: 1;
		text-transform: none;
	}
`;

export const UtcTime = styled.span`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-family: ${(props) => props.theme.typography.family.primary};
	line-height: 1;
	text-transform: none;
	white-space: nowrap;
	color: ${(props) => props.theme.colors.font.alt2};
`;
