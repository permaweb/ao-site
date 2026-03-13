import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 10px 0 20px 0;

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    flex-direction: column;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    width: 100%;
  }
`;
