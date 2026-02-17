import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

export const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  justify-content: space-between;

  @media (max-width: ${STYLING.cutoffs.desktop}) {
    flex-direction: column-reverse;
  }
`;

export const DelegationsWrapper = styled.div`
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: ${STYLING.cutoffs.desktop}) {
    width: 100%;
  }
`;

export const SummaryWrapper = styled.div`
  height: fit-content;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px;
  position: sticky;
  top: 100px;

  @media (max-width: ${STYLING.cutoffs.desktop}) {
    width: 100%;
    position: relative;
    top: auto;
  }
`;

export const ConnectWrapper = styled.div<{ isConnected: boolean }>`
  display: flex;
  align-items: center;
  gap: 17.5px;
  padding: 10px 17.5px;
  transition: all 100ms;

  &:hover {
    background: ${(props) =>
      props.isConnected
        ? props.theme.colors.container.primary.background
        : props.theme.colors.container.alt2.background} !important;
    border: 1px solid
      ${(props) => (props.isConnected ? props.theme.colors.border.primary : props.theme.colors.border.alt1)} !important;
    cursor: ${(props) => (props.isConnected ? 'default' : 'pointer')};
  }

  p {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    font-size: ${(props) => props.theme.typography.size.base};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;
