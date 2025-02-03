import ReactMarkdown from 'react-markdown';

import spec from 'assets/specsMarkdown.md';

import * as S from './styles';

export default function Read() {
	return (
		<S.Wrapper className={'fade-in'}>
			<ReactMarkdown children={spec} />
		</S.Wrapper>
	);
}
