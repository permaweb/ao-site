import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 12.5px;
	padding: 23.5px 25px 20px 25px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.lg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		justify-content: space-between;
		flex-wrap: wrap;
	}
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const TableNavigation = styled.div`
	width: 100%;
	display: flex;
`;

export const TableHeaderRow = styled.div`
	width: 100%;
	display: flex;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

	> * {
		&:not(:last-child) {
			border-right: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const TableHeaderCell = styled.div<{ flex: number; align: 'right' | 'left' | 'center' }>`
	height: 37.5px;
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.align === 'right' ? 'flex-end' : props.align === 'center' ? 'center' : 'flex-start'};
	padding: 0 15px;
	flex: ${(props) => props.flex};

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const Table = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	> * {
		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const TableBodyRow = styled.div`
	width: 100%;
	display: flex;

	> * {
		&:not(:last-child) {
			border-right: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const TableBodyCell = styled.div<{ flex: number; align: 'right' | 'left' | 'center' }>`
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.align === 'right' ? 'flex-end' : props.align === 'center' ? 'center' : 'flex-start'};
	padding: 0 15px;
	display: flex;
	align-items: center;
	gap: 12.5px;
	flex: ${(props) => props.flex};

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.primary};
	}

	img,
	svg {
		height: 22.5px;
		width: 22.5px;
		border-radius: 50%;
	}
`;

export const TableBodyImage = styled.div<{ hasImage: boolean; size?: number }>`
	height: ${(props) => (props.size ? `${props.size}px` : '22.5px')};
	width: ${(props) => (props.size ? `${props.size}px` : '22.5px')};
	border-radius: 50%;
	background: ${(props) => (props.hasImage ? 'transparent' : props.theme.colors.container.alt3.background)};

	img {
		height: ${(props) => (props.size ? `${props.size}px` : '22.5px')};
		width: ${(props) => (props.size ? `${props.size}px` : '22.5px')};
		border-radius: 50%;
	}

	svg {
		height: 17.5px;
		width: 17.5px;
		color: ${(props) => props.theme.colors.font.primary};
		fill: ${(props) => props.theme.colors.font.primary};
	}
`;

export const TableLoading = styled.div`
	height: 45px;
	display: flex;
	align-items: center;
	padding: 0 15px;

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BodySection = styled.div`
	flex: 1;
	position: relative;
	padding: 20px 25px;
`;

export const BodySectionHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.lg};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BodySectionDescription = styled.div`
	min-height: 70px;
	margin: 10px 0 0 0;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const BodySectionAction = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;
	margin: 40px 0 0 0;

	p {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;
