import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function WalletConnectionStatus() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();

	const connected = useMemo(() => !!ethProvider.walletAddress || !!arProvider.walletAddress, [arProvider, ethProvider]);

	return (
		<>
			<S.WalletAction connected={connected}>
				<div className={'indicator'} />
				<span>{connected ? language.walletsConnected : language.noWalletsConnected}</span>
				{!!ethProvider.walletAddress && <ReactSVG src={ASSETS.ethereum} />}
				{!!arProvider.walletAddress && <ReactSVG src={ASSETS.arweave} />}
			</S.WalletAction>
		</>
	);
}
