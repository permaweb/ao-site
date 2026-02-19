import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { STYLING } from 'helpers/config';

const BLOG_MAX_WIDTH = 1020;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${BLOG_MAX_WIDTH}px;
  margin: 0 auto;
  padding: 22px 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const IntroTitle = styled.h1`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.h4};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.12;
  letter-spacing: -0.02em;
`;

export const FeaturedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 80px;
`;

export const FeaturedLabel = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 4px 10px;
  border: 1px solid ${(props) => props.theme.colors.border.alt3};
  background: ${(props) => props.theme.colors.container.alt1.background};
  font-family: ${(props) => props.theme.typography.family.alt1};
  font-size: ${(props) => props.theme.typography.size.xxxxSmall};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => props.theme.colors.font.alt2};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const FeaturedCardLink = styled(Link)`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 18px;
  text-decoration: none;
  color: inherit;

  &:hover h3 {
    color: ${(props) => props.theme.colors.font.alt2};
  }

  &:hover img {
    transform: scale(1.02);
  }

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  background: ${(props) => props.theme.colors.container.alt1.background};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  }

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    height: 240px;
  }
`;

export const FeaturedCard = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px;
  background: ${(props) => props.theme.colors.container.alt1.background};
`;

export const FeaturedCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => (props.$active ? props.theme.colors.font.primary : props.theme.colors.font.alt2)};
  background: transparent;
  border: none;
  opacity: ${(props) => (props.$active ? 1 : 0.7)};

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.font.primary};
    opacity: 1;
  }

  &:active {
    color: ${(props) => props.theme.colors.font.primary};
    opacity: 1;
  }
`;

export const SearchWrapper = styled.div`
  height: 40px;
  min-width: 240px;
  max-width: 310px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  background: ${(props) => props.theme.colors.container.alt1.background};
  transition: border-color ${STYLING.motion.duration.fast}, box-shadow ${STYLING.motion.duration.fast};

  &:focus-within {
    border-color: ${(props) => props.theme.colors.border.alt3};
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.border.alt1};
  }

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    max-width: 100%;
  }
`;

export const SearchIcon = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  flex-shrink: 0;

  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1.5px solid ${(props) => props.theme.colors.font.alt2};
    border-radius: 999px;
    top: 1px;
    left: 0;
  }

  span {
    position: absolute;
    width: 6px;
    height: 1.5px;
    background: ${(props) => props.theme.colors.font.alt2};
    transform: rotate(45deg);
    transform-origin: center;
    right: 0;
    bottom: 1px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  border: none;
  background: transparent;
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.4;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.font.alt1};
  }
`;

export const SearchHint = styled.span`
  flex-shrink: 0;
  font-family: ${(props) => props.theme.typography.family.alt1};
  font-size: ${(props) => props.theme.typography.size.xxxxSmall};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => props.theme.colors.font.alt1};

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    display: none;
  }
`;

export const Category = styled.span`
  display: inline-block;
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxxxSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt2};
  line-height: 1.3;
`;

export const GridTitle = styled.h3`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xLg};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.2;
  letter-spacing: -0.01em;
  transition: color ${STYLING.motion.duration.fast};
`;

export const Excerpt = styled.p`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.base};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt2};
  line-height: 1.6;
`;

export const PostMeta = styled.span`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxxSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt1};
  line-height: 1.4;
`;

export const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: ${(props) => props.theme.colors.border.alt3};
  flex-shrink: 0;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 34px 34px;

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 270px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  background: ${(props) => props.theme.colors.container.alt1.background};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  }

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    height: 240px;
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    height: 210px;
  }
`;

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-decoration: none;
  color: inherit;

  &:hover ${GridTitle} {
    color: ${(props) => props.theme.colors.font.alt2};
  }

  &:hover ${CardImageWrapper} img {
    transform: scale(1.02);
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MetaLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;
