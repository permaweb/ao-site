import React from 'react';

import { AddressTooltip } from 'components/atoms/AddressTooltip';
import { formatAddress } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

export default function TxAddress(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [copied, setCopied] = React.useState<boolean>(false);

	const copyAddress = React.useCallback(async () => {
		if (props.address) {
			if (props.address.length > 0) {
				await navigator.clipboard.writeText(props.address);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.address]);

	return (
		<>
			<S.Wrapper disabled={copied}>
				<p onClick={copied ? () => {} : copyAddress}>
					<AddressTooltip address={props.address ?? null} wrap={props.wrap}>
						{copied ? `${language.copied}!` : formatAddress(props.address, props.wrap)}
					</AddressTooltip>
				</p>
			</S.Wrapper>
		</>
	);
}
