import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:hover {
	}
`;

export const HeaderTitle = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Body = styled.div`
	width: 100%;
`;

export const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 30px;
	@media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
		grid-template-columns: 1fr;
	}
`;

export const GridElement = styled.div``;

export const Project = styled.button<{ active: boolean }>`
	height: 100%;
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	background: ${(props) =>
		props.active ? props.theme.colors.container.primary.active : props.theme.colors.container.primary.background};
	border: 1px solid
		${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.border.primary)};
	outline: 1.25px solid ${(props) => (props.active ? props.theme.colors.indicator.active : 'transparent')};

	&:hover {
		background: ${(props) => props.theme.colors.container.primary.active};
		border: 1px solid
			${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.border.primary)};
	}
`;

export const ProjectHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ProjectTitle = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const ProjectIndex = styled.div<{ active: boolean }>`
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.font.alt1)};
	}
`;

export const ProjectBody = styled.div`
	margin: 20px 0 0 0;
`;

export const ProjectDescription = styled.div`
	height: 80px;
	p {
		height: 100%;
		white-space: normal;
		overflow: hidden;
		line-height: 1.5;
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.alt1};
		text-align: left;
	}
`;

export const ProjectFooter = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	margin: 20px 0 0 0;
`;

export const ProjectMarketCap = styled.div`
	width: fit-content;
`;

export const ProjectMarketCapHeader = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const ProjectMarketCapValue = styled.div`
	margin: 7.5px 0 0 0;
	p,
	span {
		display: flex;
		align-items: center;
		gap: 2.5px;
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	p {
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const IndicatorWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 7.5px;

	span {
		color: ${(props) => props.theme.colors.indicator.active};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}

	svg {
		height: 15px;
		width: 15px;
		color: ${(props) => props.theme.colors.indicator.active};
		fill: ${(props) => props.theme.colors.indicator.active};
		margin: 2.5px 0 0 0;
	}
`;
