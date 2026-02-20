import styled from 'styled-components';

export const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28.5px;
  position: relative;
  padding: 40px;

  a {
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-family: ${(props) => props.theme.typography.family.alt1};
    line-height: 1;
  }
`;
