import { Button } from 'components/atoms/Button';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { formatAddress } from 'helpers/utils';
import { Footer } from 'navigation/footer';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { DelegateCore } from './DelegateCore';
import { DelegateEcosystem } from './DelegateEcosystem';
import { DelegateSummary } from './DelegateSummary';
import * as S from './styles';

export default function Delegate() {
	const arProvider = useArweaveProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	function getWalletConnect() {
		let label = language.connectWallet;

		if (arProvider.walletAddress) label = formatAddress(arProvider.walletAddress, false);

		return (
			<S.ConnectWrapper
				className={'border-wrapper-primary'}
				onClick={() => (arProvider.walletAddress ? {} : arProvider.setWalletModalVisible(true))}
				isConnected={!!arProvider.walletAddress}
			>
				<p>{label}</p>
				{arProvider.walletAddress && (
					<Button type={'alt2'} label={language.disconnect} handlePress={() => arProvider.handleDisconnect()} />
				)}
			</S.ConnectWrapper>
		);
	}

	return (
		<S.Wrapper className={'fade-in'}>
			<ViewHeader header={language.delegate} actions={[getWalletConnect()]} />
			<S.BodyWrapper>
				<S.DelegationsWrapper>
					<DelegateCore />
					<DelegateEcosystem />
				</S.DelegationsWrapper>
				<S.SummaryWrapper className={'border-wrapper-alt1'}>
					<DelegateSummary />
				</S.SummaryWrapper>
			</S.BodyWrapper>
			<Footer />
		</S.Wrapper>
	);
}
