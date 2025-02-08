import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Loader } from 'components/atoms/Loader';
import { ENDPOINTS } from 'helpers/config';

import * as S from './styles';

const POLICY = 'qMQP3uo-8Y3AqqiE59iD9C3L1S01BW8gSDNPZ7tPSCk';

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
