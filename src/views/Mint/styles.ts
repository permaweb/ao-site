import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const TokenSectionsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const TokenSectionWrapper = styled.div`
	height: 500px;
	width: 100%;
`;

export const TokenSectionHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	padding: 25px;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const TokenSectionTitle = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const TokenSectionDescription = styled.div`
	max-width: 550px;
	display: flex;
	gap: 6.5px;
	svg {
		height: 15px;
		width: 15px;
		fill: ${(props) => props.theme.colors.icon.primary.fill};
		margin: 1.5px 0 0 0;
	}
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};

		b {
			font-weight: ${(props) => props.theme.typography.weight.bold};
		}
	}
`;

export const TokenSectionBalance = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 1.5px;
`;

export const TokenSectionBalanceHeader = styled.div``;

export const TokenSectionBalanceQuantity = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	span {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;
