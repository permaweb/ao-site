import React from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

import { ASSETS } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';
import Tooltip from 'views/Fund/components/Tooltip';

import { IProps } from './types';

const StyledIcon = styled(ReactSVG)`
	height: 18px;
	width: 18px;
	cursor: help;

	svg {
		color: ${(props) => props.theme.colors.font.alt1};
		fill: ${(props) => props.theme.colors.font.alt1};
	}
`;

export default function ApyTooltip(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<Tooltip
			content={
				<div>
					<p>{language.apyExplanation}</p>
					<p>{language.nativeYieldExplanation}</p>
				</div>
			}
			position={props.position || 'top'}
		>
			<StyledIcon src={ASSETS.info} />
		</Tooltip>
	);
}
