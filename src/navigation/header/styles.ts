import styled from 'styled-components';

import { open, transition2 } from 'helpers/animations';
import { STYLING } from 'helpers/config';

export const Wrapper = styled.header`
  height: ${STYLING.dimensions.nav.height};
  width: 100%;
  position: sticky;
  z-index: 4;
  top: 0;
  background: ${(props) => props.theme.colors.view.background};
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionStart = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

export const LogoWrapper = styled.div`
  height: 28.5px;
  width: 28.5px;
  animation: ${open} ${transition2};

  svg {
    height: 28.5px;
    width: 28.5px;
    margin: 2.25px 0 0 0;
    path {
      fill: ${(props) => props.theme.colors.icon.primary.fill};
    }
    &:hover {
      path {
        fill: ${(props) => props.theme.colors.icon.primary.active};
      }
    }
  }

  @media (max-width: ${STYLING.cutoffs.initial}) {
    height: 30.5px;
    width: 30.5px;

    svg {
      height: 30.5px;
      width: 30.5px;
      margin: 0;
    }
  }
`;

export const DesktopNavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 2.5px 0 0 0;
  animation: ${open} ${transition2};

  a {
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    line-height: 1;
    text-transform: none;
    transition: none;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  a.active-route {
    opacity: 1;
  }

  @media (max-width: ${STYLING.cutoffs.initial}) {
    display: none;
  }
`;

export const SectionEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const DesktopSocialWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 8.5px 0 0 0;
  animation: ${open} ${transition2};

  svg {
    height: 20px;
    width: 20px;
    fill: ${(props) => props.theme.colors.icon.primary.fill};

    &:hover {
      color: ${(props) => props.theme.colors.icon.primary.active};
      fill: ${(props) => props.theme.colors.icon.primary.active};
    }
  }

  @media (max-width: ${STYLING.cutoffs.initial}) {
    display: none;
  }
`;

export const MobileNavWrapper = styled.div`
  display: none;
  @media (max-width: ${STYLING.cutoffs.initial}) {
    display: block;
  }
`;

export const MobilePathsWrapper = styled.div`
  width: 100%;

  a {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-family: ${(props) => props.theme.typography.family.primary};
    text-transform: none;
    transition: none;
  }
`;

export const MobileSocialWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 20px;
  margin: 20px 0 0 0;

  svg {
    height: 20px;
    width: 20px;
    fill: ${(props) => props.theme.colors.icon.primary.fill};
  }
`;
