import { Link } from 'react-router-dom';

import HyperTextLoad from 'components/hyperTextLoad';
import { ASSETS, REDIRECTS, URLS } from 'helpers/config';

import * as S from './styles';

export default function BlockedMessage() {
	return (
		<S.Wrapper className={'fade-in'}>
			<S.Message>
				<p>
					Unfortunately, persons in the US will not be able to mint <b>$AO</b> tokens via bridging to the network.
					<br />
					<br />
					<a href={REDIRECTS.ipBlock} target={'_blank'}>
						contact your representatives to stop this madness
					</a>
					.
				</p>
			</S.Message>
			<img src={ASSETS.ipBlock} />
			<div className="button-wrapper">
				<Link to={URLS.base}>
					<button className="glitch primary link-terminal-blue" data-text="→ Go back">
						<HyperTextLoad word={'→ Go back'} textType="span" speed={1} />
					</button>
				</Link>
			</div>
		</S.Wrapper>
	);
}
