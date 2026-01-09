import { ViewHeader } from 'components/atoms/ViewHeader';
import { Footer } from 'navigation/footer';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { DelegateCore } from './DelegateCore';
import { DelegateEcosystem } from './DelegateEcosystem';
import * as S from './styles';

export default function Delegate() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<S.Wrapper className={'fade-in'}>
			<ViewHeader header={language.delegate} />
			<S.BodyWrapper>
				<DelegateCore />
				<DelegateEcosystem />
			</S.BodyWrapper>
			<Footer />
		</S.Wrapper>
	);
}
