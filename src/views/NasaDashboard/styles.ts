import styled from 'styled-components';

import { STYLING } from 'helpers/config';

import * as MintS from '../Mint/styles';

export const PageWrapper = styled(MintS.Wrapper)`
	padding-top: 40px;
	max-width: 1200px;
	margin: 0 auto;
`;

export const HeaderBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	h1 {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.h3};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
		margin: 0;
	}

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt1};
		margin: 0;
	}
`;

export const HeaderTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;

	@media (max-width: ${STYLING.cutoffs.mobile}) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const ActionButton = styled.div`
	flex-shrink: 0;
`;

export const TableWrapper = styled.div`
	width: 100%;
`;

export const TableHead = styled.div`
	display: grid;
	grid-template-columns: minmax(260px, 3fr) minmax(140px, 1fr);
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		display: none;
	}
`;

export const HeadCell = styled.div`
	padding: 14px 16px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.alt1};

	&:not(:last-child) {
		border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	}
`;

export const TableBody = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: minmax(260px, 3fr) minmax(140px, 1fr);

	&:not(:last-child) {
		border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		grid-template-columns: 1fr;
	}
`;

export const Cell = styled.div`
	padding: 16px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	color: ${(props) => props.theme.colors.font.primary};
	overflow-wrap: anywhere;

	&:not(:last-child) {
		border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	}

	@media (max-width: ${STYLING.cutoffs.tablet}) {
		&:not(:last-child) {
			border-right: none;
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;
