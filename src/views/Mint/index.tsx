import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { URLTabs } from 'components/molecules/URLTabs';
import { ASSETS, URLS } from 'helpers/config';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { useLocationProvider } from 'providers/LocationProvider';

import { MintAllocation } from './MintAllocation';
import { MintBalances } from './MintBalances';
import * as S from './styles';

// TODO: Language
export default function Mint() {
	const { active } = useParams();
	const navigate = useNavigate();

	const ethProvider = useEthereumProvider();
	const locationProvider = useLocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	React.useEffect(() => {
		if (!active) navigate(URLS.mintDeposits);
	}, [navigate]);

	const TABS = React.useMemo(
		() => [
			{
				label: language.deposits,
				icon: ASSETS.deposit,
				disabled: false,
				url: URLS.mintDeposits,
				view: () => <MintBalances />,
			},
			{
				label: language.yield,
				icon: ASSETS.yield,
				disabled: false,
				url: URLS.mintYield,
				view: () => <MintAllocation />,
			},
		],
		[]
	);

	if (locationProvider.country === 'US') return <BlockedMessage />;

	return (
		<>
			<S.Wrapper>
				<S.GlobalWrapper>
					<S.InfoWrapper className={'fade-in'}>
						<S.InfoHeader>
							<h6>{language.fairLaunch}</h6>
						</S.InfoHeader>
						<S.InfoBody>
							<p>
								<span id={'info-body-subheader'}>Just like Bitcoin, every $AO is minted by the community.</span>
								<br />
								<br />
								<b>21 Million Tokens:</b> A fixed supply with a continuous halving emission curve.
								<br />
								<br />
								<b>Bridge Assets to Mint $AO:</b> Participate by bridging qualified assets like stETH and DAI, or by
								holding AR.
								<br />
								<br />
								<b>No Pre-mine, No Insider Allocation:</b> Ensuring a truly decentralized and equitable distribution.
							</p>
							<a href={'#'} target={'_blank'} className={'primary-text'}>
								Learn More
							</a>
						</S.InfoBody>
					</S.InfoWrapper>
					<S.MetricsWrapper className={'border-wrapper-alt1 fade-in'}>
						<S.Metrics>
							<S.MetricsMain>
								<S.MetricsValue>
									<span className={'primary-text'}>{'Fair Launch Deposits'}</span>
									<p>{ethProvider.totalDeposited?.usdTotal?.display ?? <EllipsisLoader />}</p>
								</S.MetricsValue>
							</S.MetricsMain>
						</S.Metrics>
					</S.MetricsWrapper>
				</S.GlobalWrapper>
				<URLTabs tabs={TABS} activeUrl={TABS[0].url} />
			</S.Wrapper>
		</>
	);
}
