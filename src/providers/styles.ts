import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const WalletListContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 25px;
	flex-wrap: wrap;
	padding: 20px 0 40px 0;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
	}
`;

export const WalletListItem = styled.button`
	width: 187.5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 15px;
	gap: 8.5px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1} !important;
	border-radius: ${STYLING.dimensions.radius.alt1};
	span {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-family: ${(props) => props.theme.typography.family.primary};
	}
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.active};
		border: 1px solid ${(props) => props.theme.colors.border.alt4} !important;
	}

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		width: calc(100% - 40px);
		margin: auto;
		padding: 25px 15px;
	}
`;

export const WalletItemImageWrapper = styled.div`
	min-height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 30px;
	}
`;

export const WalletLink = styled.div`
	margin: 10px 0 0 0;
	padding: 0 20px;
	text-align: center;
	a,
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-family: ${(props) => props.theme.typography.family.primary};
	}
	a {
		text-decoration: underline;
	}
	span {
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const TermsContainer = styled.div`
	width: 100%;
	padding: 15px 15px 0 15px;

	> * {
		&:not(:last-child) {
			padding: 0 0 15px 0;
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const TermsHeader = styled.h3`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-family: ${(props) => props.theme.typography.family.primary};
	color: ${(props) => props.theme.colors.font.primary};
	margin-bottom: 15px;
`;

export const TermsSection = styled.p`
	margin-bottom: 15px;
	line-height: 1.5;
`;

export const TermsTitle = styled.b`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	font-family: ${(props) => props.theme.typography.family.primary};
	color: ${(props) => props.theme.colors.font.primary};
	margin-bottom: 5px;
`;

export const TermsText = styled.span`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	font-family: ${(props) => props.theme.typography.family.primary};
	color: ${(props) => props.theme.colors.font.alt1};
`;
