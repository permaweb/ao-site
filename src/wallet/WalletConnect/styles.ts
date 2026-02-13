import styled from 'styled-components';

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
    font-size: ${(props) => props.theme.typography.size.xSmall};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;
