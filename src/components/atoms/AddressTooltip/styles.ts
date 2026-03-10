import styled from 'styled-components';

export const Tooltip = styled.span<{ position: string }>`
  position: absolute;
  z-index: 2;
  display: none !important;
  white-space: nowrap;
  max-width: 90vw;
  overflow: hidden;
  text-overflow: ellipsis;

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
    line-height: 1.65;
    word-break: break-all;
  }
`;

export const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  &:hover {
    ${Tooltip} {
      display: block !important;
    }
  }
`;
