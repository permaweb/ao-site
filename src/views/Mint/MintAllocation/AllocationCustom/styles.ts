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

export const Project = styled.div<{ active: boolean }>`
	height: 100%;
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background: ${(props) =>
		props.active ? props.theme.colors.container.primary.active : props.theme.colors.container.primary.background};
	border: 1px solid
		${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.border.primary)};
	outline: 1.25px solid ${(props) => (props.active ? props.theme.colors.indicator.active : 'transparent')};
	transition: all 125ms;

	&:hover {
		cursor: pointer;
		background: ${(props) => props.theme.colors.container.primary.active};
		border: 1px solid
			${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.border.primary)};
	}
`;

export const ProjectHeader = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
	align-items: center;
	justify-content: space-between;
`;

export const ProjectHeaderDetails = styled.div`
	display: flex;
	gap: 12.5px;
	align-items: center;
`;

export const ProjectLogo = styled.div`
	img {
		height: 25px;
		width: 25px;
		margin: 2.5px 2.5px 0 0;
	}
`;

export const ProjectTitle = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const ProjectId = styled.button`
	display: flex;
	gap: 7.5px;
	align-items: center;
	margin: 0 0 12.5px 0;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	p {
		color: ${(props) => props.theme.colors.font.primary};
	}

	span {
		color: ${(props) => props.theme.colors.font.alt2};
	}

	svg {
		height: 16.5px;
		width: 16.5px;
		color: ${(props) => props.theme.colors.font.primary};
		fill: ${(props) => props.theme.colors.font.primary};
		margin: 2.5px 0 0 0;
	}

	&:hover {
		p,
		svg {
			color: ${(props) => props.theme.colors.font.alt1};
		}

		svg {
			fill: ${(props) => props.theme.colors.font.alt1};
		}
	}
`;

export const ProjectTicker = styled.div`
	margin: 2.5px 0 0 0;
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt2};
		text-transform: uppercase;
	}
`;

export const ProjectLinks = styled.div`
	display: flex;
	gap: 15px;
	align-items: center;
`;

export const ProjectLink = styled.div`
	svg {
		height: 17.5px;
		width: 17.5px;
		color: ${(props) => props.theme.colors.font.alt1};
		fill: ${(props) => props.theme.colors.font.alt1};

		&:hover {
			color: ${(props) => props.theme.colors.font.primary};
			fill: ${(props) => props.theme.colors.font.primary};
		}
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

export const ProjectBody = styled.div``;

export const ProjectShortDescription = styled.div`
	height: 60px;
	p {
		height: 100%;
		white-space: normal;
		overflow: hidden;
		line-height: 1.5;
		font-size: ${(props) => props.theme.typography.size.xSmall};
		color: ${(props) => props.theme.colors.font.alt1};
		text-align: left;
	}
`;

export const ProjectLongDescription = styled.div`
	margin: 0 0 20px 0;
	p {
		height: 100%;
		white-space: normal;
		overflow: hidden;
		line-height: 1.5;
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
		text-align: left;
	}
`;

export const ProjectDisclaimer = styled(ProjectLongDescription)`
	margin: 0;
	p {
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const ProjectLinesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin: 20px 0 0 0;
`;

export const ProjectLineWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	align-items: center;
	justify-content: space-between;

	> * {
		&:first-child {
			p,
			span {
				text-align: left;
			}
		}
		&:last-child {
			p,
			span {
				text-align: right;
			}
		}
	}
`;

export const ProjectInfoLine = styled.div`
	display: flex;
	flex-direction: column;

	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	p {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.base};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const ProjectFooter = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
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

export const LoadingWrapper = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const EmptyWrapper = styled(LoadingWrapper)``;

export const PanelWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 20px;
	padding: 0 20px 20px 20px;
`;

export const PanelWrapperStart = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const PanelWrapperEnd = styled(PanelWrapperStart)``;

export const PanelActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 20px;
`;
