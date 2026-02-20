import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
  padding: 16px;
`;

export const Header = styled.div`
  width: 100%;

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.xLg};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const Body = styled.div`
  width: 100%;
  margin: 3.5px 0 0 0;
`;

export const ChartWrapper = styled.div`
  width: 100%;
`;

export const ChartHeader = styled.div`
  margin: 0 0 16px 0;

  span {
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.alt1};
  }
`;

export const Chart = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const ChartKeyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px 0 0 0;
`;

export const ChartKeyLine = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5px;
`;

export const ChartKey = styled.div<{ background: string }>`
  min-height: 9.5px;
  min-width: 9.5px;
  background: ${(props) => props.background};
`;

export const ChartKeyText = styled.p`
  font-size: ${(props) => props.theme.typography.size.xSmall};
  font-family: ${(props) => props.theme.typography.family.primary};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.font.primary};
  margin: 0 0 0 2.5px;
`;

export const Percentage = styled.p`
  line-height: calc(${(props) => props.theme.typography.size.xSmall} + 5px);
  font-size: ${(props) => props.theme.typography.size.xSmall};
  font-family: ${(props) => props.theme.typography.family.primary};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.font.alt1};
  padding: 0 !important;
  border: none !important;
`;

export const SummaryWrapper = styled.div`
  margin: 24px 0 0 0;
`;

export const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 7.5px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.base};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const SummarySubheader = styled.div`
  padding: 7.5px 0 2.5px 0;

  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.alt1};
  }
`;

export const SummaryInfoLine = styled.div`
  margin: -5px 0 0 0;
  span {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.primary};
  }
`;

export const SummaryBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 0 0;

  > * {
    &:not(:last-child) {
      padding: 0 0 10px 0;
      border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    }
  }
`;

export const SummaryDivider = styled.div`
  height: 1px;
  border-top: 1px dotted ${(props) => props.theme.colors.border.alt1};
  margin: 12.5px 0 0 0;
`;

export const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SummaryLineLabel = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  gap: 7px;
  span {
    width: 100%;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: ${(props) => props.theme.typography.family.primary};
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-weight: ${(props) => props.theme.typography.weight.medium};
  }
`;

export const SummaryLineActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SummaryLineActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    min-height: 0 !important;
    height: auto !important;
    padding: 0.5px 3.5px !important;
    span {
      font-family: ${(props) => props.theme.typography.family.primary} !important;
      font-weight: ${(props) => props.theme.typography.weight.regular} !important;
      font-size: ${(props) => props.theme.typography.size.xxxxSmall} !important;
    }
  }

  #indicator {
    span {
      color: ${(props) => props.theme.colors.indicator.primary} !important;
    }

    &:hover {
      span {
        color: ${(props) => props.theme.colors.indicator.active} !important;
      }
    }

    &:disabled {
      span {
        color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
      }

      &:hover {
        span {
          color: ${(props) => props.theme.colors.button.primary.disabled.color} !important;
        }
      }
    }
  }

  @media (max-width: ${STYLING.cutoffs.mobile}) {
    display: none;
  }
`;

export const SummaryLinePercentage = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
  P {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    font-size: ${(props) => props.theme.typography.size.xSmall};
    text-align: right;
  }
`;

export const ActionMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ActionSave = styled.div`
  flex: 1;
  width: 100%;
`;

export const ActionReset = styled.div`
  button {
    min-height: 0 !important;
    height: auto !important;
    min-width: 0 !important;
    width: fit-content !important;
    padding: 0 !important;
    span {
      font-size: ${(props) => props.theme.typography.size.xSmall} !important;
      font-weight: ${(props) => props.theme.typography.weight.regular} !important;
      color: ${(props) => props.theme.colors.font.alt1} !important;
    }
  }
`;

export const InfoWrapper = styled.div`
  margin: 28px 0;

  P {
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    font-size: ${(props) => props.theme.typography.size.xSmall};
  }
`;
