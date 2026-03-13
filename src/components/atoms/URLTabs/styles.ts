import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
  height: fit-content;
  margin: auto 0 0 0;
  position: relative;
`;

export const TabsHeader = styled.div<{ useFixed: boolean }>`
  @media (max-width: ${STYLING.cutoffs.mobile}) {
    position: relative;
    top: auto;
  }
`;

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 0 11.5px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Tab = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const TabAction = styled.button<{ active: boolean; icon: boolean }>`
  font-size: ${(props) => props.theme.typography.size.xLg};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  font-family: ${(props) => props.theme.typography.family.primary};
  color: ${(props) => props.theme.colors.font.primary};
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)};

    svg {
      color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)};
      fill: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt1)};
    }
  }

  display: flex;
  align-items: center;

  &:after {
    display: block;
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -12.5px;
    background: ${(props) =>
      props.active ? props.theme.colors.tabs.active.background : props.theme.colors.transparent};
    height: 3.5px;
    border-radius: ${STYLING.dimensions.radius.primary};
    width: 100%;
  }
`;

export const Icon = styled.div<{ active: boolean }>`
  svg {
    height: 23.5px;
    width: 23.5px;
    padding: 3.5px 0 0 0;
    margin: 0 12.5px 0 0;
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const Content = styled.div``;

export const View = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  margin: 25px 0 0 0;
`;
