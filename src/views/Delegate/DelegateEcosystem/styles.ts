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
	justify-content: space-between;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary} !important;
`;

export const TabsWrapper = styled.div`
	display: flex;
`;

export const Tab = styled.div<{ active: boolean }>`
	button {
		border: none !important;
		background: ${(props) =>
			props.active ? props.theme.colors.container.primary.background : props.theme.colors.button.primary.background};
		border-right: 1px solid ${(props) => props.theme.colors.border.primary} !important;

		span {
			color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)} !important;
		}

		svg {
			color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)} !important;
			fill: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)} !important;
		}

		&:hover {
			background: ${(props) => props.theme.colors.container.primary.background};

			span {
				color: ${(props) => props.theme.colors.font.primary} !important;
			}

			svg {
				color: ${(props) => props.theme.colors.font.primary} !important;
				fill: ${(props) => props.theme.colors.font.primary} !important;
			}
		}

		&:focus {
			background: ${(props) => props.theme.colors.container.primary.background};

			span {
				color: ${(props) => props.theme.colors.font.primary} !important;
			}

			svg {
				color: ${(props) => props.theme.colors.font.primary} !important;
				fill: ${(props) => props.theme.colors.font.primary} !important;
			}
		}
	}
`;

export const SearchWrapper = styled.div`
	width: 50%;
	position: relative;

	> * {
		margin: 0 !important;
	}

	input {
		height: 40px !important;
		margin: 0 !important;
		border: none !important;
		border-left: 1px solid ${(props) => props.theme.colors.border.primary} !important;
		background: ${(props) => props.theme.colors.container.alt1.background} !important;
	}

	svg {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translate(0, -50%);
		height: 17.5px;
		width: 17.5px;
		color: ${(props) => props.theme.colors.font.alt1};
	}
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

export const TableHeaderCell = styled.div<{ flex: number; width?: number; align: 'right' | 'left' | 'center' }>`
	height: 37.5px;
	min-width: ${(props) => (props.width ? `${props.width}px` : 'none')};
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

export const TableBodyRowWrapper = styled.div`
	width: 100%;
`;

export const TableBodyRow = styled.div<{ open: boolean }>`
	width: 100%;
	display: flex;
	transition: all 100ms;
	background: ${(props) =>
		props.open ? props.theme.colors.container.primary.active : props.theme.colors.container.primary.background};

	&:hover {
		cursor: pointer;
		background: ${(props) => props.theme.colors.container.primary.active};
	}

	> * {
		&:not(:last-child) {
			border-right: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const TableBodyRowDetail = styled.div`
	width: 100%;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.active};
`;

export const PanelWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 20px;
	padding: 20px;
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

export const TableBodyCell = styled.div<{ flex: number; width?: number; align: 'right' | 'left' | 'center' }>`
	height: 50px;
	min-width: ${(props) => (props.width ? `${props.width}px` : 'none')};
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

export const TableEmpty = styled.div`
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
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const ProjectIndex = styled.div<{ active: boolean }>`
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => (props.active ? props.theme.colors.indicator.active : props.theme.colors.font.alt1)};
	}
`;

export const ProjectId = styled.button`
	display: flex;
	gap: 7.5px;
	align-items: center;
	margin: 0 0 12.5px 0;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
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

export const ProjectBody = styled.div``;

export const ProjectShortDescription = styled.div`
	margin: 0 0 20px 0;

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

export const ProjectLongDescription = styled.div`
	margin: 0 0 20px 0;

	p {
		height: 100%;
		white-space: normal;
		overflow: hidden;
		line-height: 1.5;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
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
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;
