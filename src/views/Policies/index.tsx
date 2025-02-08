import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Loader } from 'components/atoms/Loader';
import { ENDPOINTS } from 'helpers/config';

import * as S from './styles';

const POLICY = 'A5WOUE88R5ydeWNOjQ5843WDDUy9O-yCfmHWWSREAEY';

export default function Policies() {
	const [policy, setPolicy] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			const response = await fetch(ENDPOINTS.arTxEndpoint(POLICY));
			setPolicy(await response.text());
		})();
	}, []);

	return policy ? (
		<S.Wrapper className={'fade-in'}>
			<ReactMarkdown children={policy} />
		</S.Wrapper>
	) : (
		<Loader />
	);
}
