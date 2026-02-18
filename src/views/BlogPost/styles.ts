import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { STYLING } from 'helpers/config';

const BLOG_CONTENT_MAX_WIDTH = 600;
const BLOG_HERO_EXTENSION = 120;
const BLOG_HERO_MAX_WIDTH = BLOG_CONTENT_MAX_WIDTH + BLOG_HERO_EXTENSION;

export const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0 40px 0;
`;

export const HeroWrapper = styled.div`
  width: 100%;
  max-width: ${BLOG_HERO_MAX_WIDTH}px;
  margin: 0 auto 24px auto;
`;

export const HeroImageWrapper = styled.div`
  width: 100%;
  min-height: 320px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
    transition: transform ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const Article = styled.article`
  width: 100%;
  max-width: ${BLOG_CONTENT_MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxLg};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.15;
  letter-spacing: -0.3px;
`;

export const Subtitle = styled.p`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.lg};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.5;
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
`;

export const AuthorIcon = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: ${(props) => props.theme.colors.font.alt5};
  flex-shrink: 0;
`;

export const AuthorName = styled.span`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.small};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.4;
`;

export const MetaSecondary = styled.span`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt1};
  line-height: 1.4;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionHeading = styled.h2`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xLg};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.3;
  margin-top: 8px;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const Paragraph = styled.p`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.base};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.625;
`;

export const BackLinkWrapper = styled.div`
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const BackLink = styled(Link)`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.small};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => props.theme.colors.link.color};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.link.active};
    text-decoration: underline;
    text-decoration-thickness: 1.25px;
  }
`;

export const NotFound = styled.div`
  width: 100%;
  max-width: ${BLOG_CONTENT_MAX_WIDTH}px;
  margin: 0 auto;
  padding: 32px 0;

  p {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.base};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.primary};
    line-height: 1.6;
  }
`;

export const NotFoundLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.small};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => props.theme.colors.link.color};

  &:hover {
    color: ${(props) => props.theme.colors.link.active};
    text-decoration: underline;
    text-decoration-thickness: 1.25px;
  }
`;

export const FooterWrapper = styled.div`
  margin-top: 28px;

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    margin-top: 20px;
  }
`;
