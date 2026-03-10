import { ViewHeader } from 'components/atoms/ViewHeader';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletConnect } from 'wallet/WalletConnect';

import { DelegateCore } from './DelegateCore';
import { DelegateEcosystem } from './DelegateEcosystem';
import { DelegateSummary } from './DelegateSummary';
import * as S from './styles';

export default function Delegate() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<S.Wrapper>
			<ViewHeader header={language.delegate} actions={[<WalletConnect />]} />
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
