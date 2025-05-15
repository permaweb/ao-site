import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { STYLING } from 'helpers/config';

interface TooltipProps {
	content: ReactNode;
	children: ReactNode;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

const TooltipWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

const TooltipContent = styled.div<{ position: string }>`
	position: absolute;
	z-index: 1000;
	background-color: ${(props) => props.theme.colors.tooltip?.background || '#333'};
	color: ${(props) => props.theme.colors.tooltip?.color || 'white'};
	padding: 10px 15px;
	border-radius: ${STYLING.dimensions.radius.alt2};
	font-size: 14px;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s, visibility 0.3s;
	width: max-content;
	max-width: 300px;
	text-align: left;
	line-height: 1.4;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	white-space: normal;
	pointer-events: none;

	${(props) => {
		switch (props.position) {
			case 'top':
				return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
        `;
			case 'right':
				return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 8px;
        `;
			case 'left':
				return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 8px;
        `;
			case 'bottom':
			default:
				return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
        `;
		}
	}}

	&:after {
		content: '';
		position: absolute;
		border-width: 5px;
		border-style: solid;

		${(props) => {
			const bgColor = props.theme.colors.tooltip?.background || '#333';
			switch (props.position) {
				case 'top':
					return `
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-color: ${bgColor} transparent transparent transparent;
          `;
				case 'right':
					return `
            top: 50%;
            right: 100%;
            transform: translateY(-50%);
            border-color: transparent ${bgColor} transparent transparent;
          `;
				case 'left':
					return `
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            border-color: transparent transparent transparent ${bgColor};
          `;
				case 'bottom':
				default:
					return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-color: transparent transparent ${bgColor} transparent;
          `;
			}
		}}
	}

	${TooltipWrapper}:hover & {
		opacity: 1;
		visibility: visible;
	}
`;

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'bottom' }) => {
	if (!content) return children;

	return (
		<TooltipWrapper>
			{children}
			<TooltipContent position={position}>{content}</TooltipContent>
		</TooltipWrapper>
	);
};

export default Tooltip;
