import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const BalancesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

export const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  @media (max-width: ${STYLING.cutoffs.initial}) {
    flex-direction: column;
  }
`;

export const HeaderInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const HeaderInfo = styled.div`
  h6 {
    font-weight: ${(props) => props.theme.typography.weight.bold};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const HeaderTooltip = styled.div`
  button {
    display: flex;
    align-items: center;
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    font-size: ${(props) => props.theme.typography.size.base};
    color: ${(props) => props.theme.colors.link.color};

    svg {
      height: 15px;
      width: 15px;
      fill: ${(props) => props.theme.colors.link.color};
      margin: 5.5px 5.5px 0 0;
    }

    &:hover {
      color: ${(props) => props.theme.colors.link.active};

      svg {
        color: ${(props) => props.theme.colors.link.active};
      }
    }
    &:focus {
      color: ${(props) => props.theme.colors.link.active};

      svg {
        color: ${(props) => props.theme.colors.link.active};
      }
    }
  }
`;

export const HeaderLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  a {
    font-weight: ${(props) => props.theme.typography.weight.medium};
    font-size: ${(props) => props.theme.typography.size.base};
  }
`;

export const BalancesBodyWrapper = styled(BodyWrapper)`
  flex-direction: column;
`;

export const BalancesFlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: ${STYLING.cutoffs.desktop}) {
    flex-direction: column;
  }
`;

export const BalanceFlexSection = styled.div`
  flex: 1;

  @media (max-width: ${STYLING.cutoffs.desktop}) {
    width: 100%;
  }
`;

export const BalanceQuantityBody = styled.div`
  display: flex;
  align-items: center;
  gap: 7.5px;

  p,
  span {
    font-size: ${(props) => props.theme.typography.size.lg};
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.xBold};
  }

  p {
    display: flex;
    align-items: center;
    gap: 7.5px;
  }

  svg {
    height: 20px;
    width: 20px;
    margin: 6.5px 0 0 0;
  }

  #ao-logo {
    svg {
      height: 30px;
      width: 30px;
      margin: 6.5px 3.5px 0 0;
    }
  }
`;

export const BalancesPrimaryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const BalancesBreakdownWrapper = styled(BalancesPrimaryWrapper)``;

export const BalancesGlobalWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  ${BalanceQuantityBody} {
    p,
    span {
      font-size: ${(props) => props.theme.typography.size.xLg};
    }

    #text-loader {
      min-height: 40px;
    }
  }

  @media (max-width: ${STYLING.cutoffs.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const BalancesPrimaryFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px 100px;
`;

export const BalanceQuantitySection = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5px;
`;

export const BalanceQuantityEndSection = styled(BalanceQuantitySection)`
  align-items: flex-end;

  @media (max-width: ${STYLING.cutoffs.secondary}) {
    align-items: flex-start;
  }
`;

export const BalanceQuantityHeader = styled.div`
  span {
    font-size: ${(props) => props.theme.typography.size.xSmall};
    color: ${(props) => props.theme.colors.font.alt1};
  }
`;

export const ModalWrapper = styled.div`
  span {
    font-size: ${(props) => props.theme.typography.size.base};
    font-family: ${(props) => props.theme.typography.family.primary};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;
