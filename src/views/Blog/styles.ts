import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 8px 14px;
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => (props.$active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)};
  background: ${(props) => props.theme.colors.container.alt2.background};
  border: 1px solid ${(props) => (props.$active ? props.theme.colors.border.primary : 'transparent')};

  cursor: pointer;
  transition: color ${STYLING.motion.duration.fast}, border-color ${STYLING.motion.duration.fast};

  &:hover {
    color: ${(props) => props.theme.colors.font.primary};
    border-color: ${(props) => props.theme.colors.border.primary};
  }
`;

export const Category = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => props.theme.colors.font.alt5};
  line-height: 1.4;
  background: ${(props) => props.theme.colors.container.alt2.background};
`;

export const GridTitle = styled.h3`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xLg};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.2;
  transition: color ${STYLING.motion.duration.fast};
`;

export const Excerpt = styled.p`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.small};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt2};
  line-height: 1.6;
`;

export const Author = styled.span`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt1};
  line-height: 1.4;
`;

export const PostMeta = styled.span`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt1};
  line-height: 1.4;
  margin-top: auto;
  padding-top: 6px;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 300px;

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  }
`;

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;

  &:hover ${GridTitle} {
    color: ${(props) => props.theme.colors.font.alt1};
  }

  &:hover ${CardImageWrapper} img {
    transform: scale(1.05);
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  padding: 16px 0 0 0;
`;
