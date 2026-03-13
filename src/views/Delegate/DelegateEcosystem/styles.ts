import styled, { keyframes } from 'styled-components';

import { STYLING } from 'helpers/config';

const withOpacity = (color: string, opacity: number): string => {
  const clamped = Math.max(0, Math.min(1, opacity));

  if (/^#([0-9a-fA-F]{6})$/.test(color)) {
    const alpha = Math.round(clamped * 255)
      .toString(16)
      .padStart(2, '0');
    return `${color}${alpha}`;
  }

  if (/^#([0-9a-fA-F]{3})$/.test(color)) {
    const expanded = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    const alpha = Math.round(clamped * 255)
      .toString(16)
      .padStart(2, '0');
    return `${expanded}${alpha}`;
  }

  return color;
};

const skeletonShimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const TableWrapper = styled.div`
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
    font-size: ${(props) => `clamp(${props.theme.typography.size.xSmall}, 2vw, ${props.theme.typography.size.base})`};
    color: ${(props) => props.theme.colors.font.alt1};
  }

  @media (max-width: ${STYLING.cutoffs.initial}) {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    padding: 18px 16px 16px 16px;
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

  @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const TabsWrapper = styled.div`
  display: flex;

  @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
    width: 100%;
  }
`;

export const Tab = styled.div<{ active: boolean }>`
  @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
    flex: 1;
  }

  button {
    border: none !important;
    background: ${(props) =>
      props.active ? props.theme.colors.container.primary.background : props.theme.colors.container.alt1.background};
    border-right: 1px solid ${(props) => props.theme.colors.border.primary} !important;

    @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
      width: 100%;
    }

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
  width: 40%;
  min-width: 240px;
  position: relative;

  @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
    width: 100%;
    min-width: 0;
  }

  > * {
    margin: 0 !important;
  }

  input {
    height: 40px !important;
    margin: 0 !important;
    border: none !important;
    border-left: 1px solid ${(props) => props.theme.colors.border.primary} !important;
    background: ${(props) => props.theme.colors.container.alt1.background} !important;
    font-size: ${(props) => props.theme.typography.size.xSmall} !important;

    @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
      border-left: none !important;
      border-top: 1px solid ${(props) => props.theme.colors.border.primary} !important;
    }
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

export const ProjectSelectWrapper = styled.div`
  min-width: 260px;
  max-width: 380px;
  flex: 1;

  > div {
    width: 100%;
  }

  button {
    width: 100%;

    span {
      white-space: nowrap;
    }
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

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    > :nth-child(1) {
      display: none;
    }
  }

  @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
    > :nth-child(4) {
      display: none;
    }

    > :nth-child(2),
    > :nth-child(3),
    > :nth-child(5) {
      flex: 1;
    }
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    > :nth-child(3) {
      display: none;
    }

    > :nth-child(2),
    > :nth-child(5) {
      flex: 1;
    }

    > * {
      &:not(:last-child) {
        border-right: none;
      }
    }
  }
`;

export const TableHeaderCell = styled.div<{
  flex: number;
  width?: number;
  align: 'right' | 'left' | 'center';
  sortable?: boolean;
  active?: boolean;
}>`
  height: 37.5px;
  min-width: ${(props) => (props.width ? `${props.width}px` : 'none')};
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.align === 'right' ? 'flex-end' : props.align === 'center' ? 'center' : 'flex-start'};
  gap: 5px;
  padding: 0 15px;
  flex: ${(props) => props.flex};
  transition: color ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    font-size: ${(props) => props.theme.typography.size.xxSmall};
    color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)};
  }

  &:hover {
    span {
      color: ${(props) =>
        props.sortable
          ? props.theme.colors.font.primary
          : props.active
          ? props.theme.colors.font.primary
          : props.theme.colors.font.alt1};
    }
  }
`;

export const SortIndicator = styled.span<{ active?: boolean }>`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt2)};
  line-height: 1;
`;

export const Table = styled.div<{ $isLoading?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.$isLoading ? '420px' : '0')};
  justify-content: flex-start;

  > * {
    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    }
  }
`;

export const TableBodyRowWrapper = styled.div`
  width: 100%;
`;

export const TableBodyRow = styled.div<{ open: boolean; $isPlaceholder?: boolean }>`
  width: 100%;
  display: flex;
  transition: background ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  background: ${(props) =>
    props.open ? props.theme.colors.container.primary.active : props.theme.colors.container.primary.background};

  &:hover {
    cursor: ${(props) => (props.$isPlaceholder ? 'default' : props.open ? 'zoom-out' : 'zoom-in')};
    background: ${(props) =>
      props.$isPlaceholder
        ? props.open
          ? props.theme.colors.container.primary.active
          : props.theme.colors.container.primary.background
        : props.theme.colors.container.primary.active};
  }

  > * {
    &:not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.colors.border.primary};
    }
  }

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    > :nth-child(1) {
      display: none;
    }
  }

  @media (max-width: ${STYLING.cutoffs.tabletSecondary}) {
    > :nth-child(4) {
      display: none;
    }

    > :nth-child(2),
    > :nth-child(3),
    > :nth-child(5) {
      flex: 1;
    }
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    > :nth-child(3) {
      display: none;
    }

    > :nth-child(2),
    > :nth-child(5) {
      flex: 1;
    }

    > * {
      &:not(:last-child) {
        border-right: none;
      }
    }
  }
`;

export const PlaceholderCircle = styled.div<{ size?: number }>`
  height: ${(props) => (props.size ? `${props.size}px` : '22.5px')};
  width: ${(props) => (props.size ? `${props.size}px` : '22.5px')};
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.container.alt3.background} 25%,
    ${(props) => props.theme.colors.container.alt2.background} 37%,
    ${(props) => props.theme.colors.container.alt3.background} 63%
  );
  background-size: 240% 100%;
  animation: ${skeletonShimmer} 1.5s linear infinite;
  opacity: 0.62;
`;

export const PlaceholderLine = styled.div<{ width: string; height?: number; align?: 'left' | 'right' | 'center' }>`
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? `${props.height}px` : '10px')};
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.container.alt3.background} 25%,
    ${(props) => props.theme.colors.container.alt2.background} 37%,
    ${(props) => props.theme.colors.container.alt3.background} 63%
  );
  background-size: 240% 100%;
  animation: ${skeletonShimmer} 1.5s linear infinite;
  opacity: 0.62;
  margin-left: ${(props) => (props.align === 'right' ? 'auto' : props.align === 'center' ? 'auto' : '0')};
  margin-right: ${(props) => (props.align === 'left' ? 'auto' : props.align === 'center' ? 'auto' : '0')};
`;

export const TableBodyRowDetail = styled.div<{ open: boolean }>`
  width: 100%;
  display: grid;
  grid-template-rows: ${(props) => (props.open ? '1fr' : '0fr')};
  opacity: ${(props) => (props.open ? 1 : 0)};
  border-top: 1px solid ${(props) => (props.open ? props.theme.colors.border.primary : 'transparent')};
  background: ${(props) => props.theme.colors.container.primary.active};
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
  transition: grid-template-rows ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate},
    opacity ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate},
    border-color ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
`;

export const TableBodyRowDetailInner = styled.div`
  overflow: hidden;
`;

export const PanelWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 15px 20px calc(50px + 15px);

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    padding: 20px 15px;
  }
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

export const TableBodyCell = styled.div<{
  flex: number;
  width?: number;
  align: 'right' | 'left' | 'center';
  interactive?: boolean;
  hoverColor?: string;
}>`
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
  transition: background ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  cursor: ${(props) => (props.interactive ? 'pointer' : 'inherit')};

  &:hover {
    background: ${(props) =>
      props.interactive && props.hoverColor ? withOpacity(props.hoverColor, 0.1) : 'transparent'};
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    padding: 0 10px;
    gap: 8px;
  }

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

export const ProjectNameWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    font-size: ${(props) => props.theme.typography.size.xSmall};
    color: ${(props) => props.theme.colors.font.primary};
    display: block;
    max-width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span.ticker {
    font-size: ${(props) => props.theme.typography.size.xxSmall};
    color: ${(props) => props.theme.colors.font.alt1};

    @media (max-width: ${STYLING.cutoffs.tablet}) {
      display: none;
    }
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

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    height: ${(props) => (props.size ? `${props.size}px` : '18px')};
    width: ${(props) => (props.size ? `${props.size}px` : '18px')};

    img {
      height: ${(props) => (props.size ? `${props.size}px` : '18px')};
      width: ${(props) => (props.size ? `${props.size}px` : '18px')};
    }
  }
`;

export const TableEmpty = styled.div<{ $isLoading?: boolean }>`
  height: ${(props) => (props.$isLoading ? 'auto' : '45px')};
  min-height: ${(props) => (props.$isLoading ? '84px' : '0')};
  display: flex;
  align-items: ${(props) => (props.$isLoading ? 'flex-start' : 'center')};
  gap: ${(props) => (props.$isLoading ? '12px' : '0')};
  padding: ${(props) => (props.$isLoading ? '15px' : '0 15px')};

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

export const ProjectHeaderLeft = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
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
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: ${(props) => props.theme.typography.size.xLg};
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.primary};
  }

  span.ticker {
    font-size: ${(props) => props.theme.typography.size.xSmall};
    color: ${(props) => props.theme.colors.font.alt1};
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

export const ProjectIdRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 12.5px 0;
`;

export const ProjectId = styled.button`
  display: flex;
  gap: 7.5px;
  align-items: center;
  margin: 0;

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
  flex-shrink: 0;
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ProjectLink = styled.div`
  a {
    font-size: ${(props) => props.theme.typography.size.xxSmall};
    color: ${(props) => props.theme.colors.font.alt1};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.font.primary};
    }
  }
`;

export const ProjectBody = styled.div``;

export const ProjectShortDescription = styled.div`
  margin: 0 0 8px 0;

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
    p,
    span {
      text-align: left;
    }
  }
`;

export const ProjectLineDates = styled.div`
  display: flex;
  gap: 36px;
  align-items: center;
`;

export const ProjectInfoLine = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    font-size: ${(props) => props.theme.typography.size.xxSmall};
    color: ${(props) => props.theme.colors.font.alt1};
  }

  p {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.small};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const LoadMoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClaimWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 20px;
  margin: 0 0 20px 0;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  background: ${(props) => props.theme.colors.container.alt1.background};

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
  }
`;

export const ClaimInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    font-size: ${(props) => props.theme.typography.size.xxSmall};
    color: ${(props) => props.theme.colors.font.alt1};
  }

  p {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    font-size: ${(props) => props.theme.typography.size.small};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const ClaimButton = styled.button<{ disabled?: boolean }>`
  height: 36px;
  padding: 0 20px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  background: ${(props) =>
    props.disabled ? props.theme.colors.container.alt2.background : props.theme.colors.container.primary.background};
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xSmall};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => (props.disabled ? props.theme.colors.font.alt2 : props.theme.colors.font.primary)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.container.primary.active};
    border-color: ${(props) => props.theme.colors.font.primary};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    width: 100%;
    height: 32px;
    padding: 0 16px;
  }
`;
