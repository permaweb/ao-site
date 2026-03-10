import styled, { keyframes } from 'styled-components';

import { STYLING } from 'helpers/config';

const previewReveal = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, calc(-100% - 10px)) scale(0.94);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, calc(-100% - 10px)) scale(1);
    filter: blur(0);
  }
`;

export const Wrapper = styled.span`
  position: relative;
  display: inline;
`;

export const PreviewContainer = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  transform: translate(-50%, calc(-100% - 10px));
  transform-origin: 50% 100%;
  z-index: 1100;
  min-width: 160px;
  max-width: 280px;
  overflow: hidden;
  border-radius: ${STYLING.dimensions.radius.alt3};
  background: ${(props) => props.theme.colors.container.alt1.background};
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  animation: ${previewReveal} ${STYLING.motion.duration.fast} ${STYLING.motion.easing.decelerate} forwards;
  pointer-events: none;
`;

export const PreviewContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 10px;
`;

export const IconWrapper = styled.svg`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 2px;
  color: ${(props) => props.theme.colors.font.alt2};
  opacity: 0.85;
`;

export const PreviewText = styled.div`
  min-width: 0;
  flex: 1;
`;

export const PreviewTitle = styled.div`
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxSmall};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) => props.theme.colors.font.primary};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PreviewDescription = styled.div`
  margin-top: 2px;
  font-family: ${(props) => props.theme.typography.family.primary};
  font-size: ${(props) => props.theme.typography.size.xxxSmall};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  color: ${(props) => props.theme.colors.font.alt2};
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;
