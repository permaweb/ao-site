import styled from 'styled-components';

export const Help = styled.div<{ position: string }>`
  position: absolute;
  z-index: 2;
  display: none;
  white-space: nowrap;
  padding: 3.25px 5px 2.25px 5px;

  ${(props) => {
    switch (props.position) {
      case 'top':
        return `
		  bottom: 100%;
		  left: 50%;
		  transform: translateX(-50%);
		  margin-bottom: 5px;
		`;
      case 'bottom':
        return `
		  top: 100%;
		  left: 50%;
		  transform: translateX(-50%);
		  margin-top: 5px;
		`;
      case 'left':
        return `
		  right: 100%;
		  top: 50%;
		  transform: translateY(-50%);
		  margin-right: 5px;
		`;
      case 'right':
        return `
		  left: 100%;
		  top: 50%;
		  transform: translateY(-50%);
		  margin-left: 5px;
		`;
      case 'top-left':
        return `
		  bottom: 100%;
		  left: 0;
		  margin-bottom: 5px;
		`;
      case 'top-right':
        return `
		  bottom: 100%;
		  right: 0;
		  margin-bottom: 5px;
		`;
      case 'bottom-left':
        return `
		  top: 100%;
		  left: 0;
		  margin-top: 5px;
		`;
      case 'bottom-right':
        return `
		  top: 100%;
		  right: 0;
		  margin-top: 5px;
		`;
      default:
        return `
		  top: 100%;
		  left: 50%;
		  transform: translateX(-50%);
		  margin-top: 5px;
		`;
    }
  }}

  span {
    display: block;
    line-height: 1.5;
  }
`;

export const Icon = styled.div`
  height: 16.5px;
  width: 16.5px;
  position: relative;

  svg {
    height: 16.5px;
    width: 16.5px;
    color: ${(props) => props.theme.colors.font.primary};
    transition: all 100ms;
  }

  &:hover {
    cursor: pointer;

    ${Help} {
      display: block;
    }

    svg {
      opacity: 0.75;
    }
  }
`;

export const ModalWrapper = styled.div`
  padding: 0 20px 20px 20px;
`;
