import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Loader } from 'components/atoms/Loader';
import { ENDPOINTS } from 'helpers/config';

import * as S from './styles';

const POLICY = 'YaCWs9oWm2g1GwwRSQYNJ0sa70zSdSmExx3vRkrpc_o';

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
