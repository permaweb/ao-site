import React from 'react';
import { ReactSVG } from 'react-svg';

import { Modal } from 'components/atoms/Modal';
import { ASSETS } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Tooltip(props: { header?: string; content: React.ReactNode }) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

	return (
		<>
			<S.Icon onClick={() => setShowTooltip(true)}>
				<ReactSVG src={ASSETS.info} />
				<S.Help className={'info'} position={'bottom'}>
					<span>{language.help}</span>
				</S.Help>
			</S.Icon>
			{showTooltip && (
				<Modal header={props.header ?? language.help} handleClose={() => setShowTooltip(false)}>
					<S.ModalWrapper>{props.content}</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
