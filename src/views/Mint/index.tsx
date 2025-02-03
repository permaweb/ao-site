import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { SupplyChart } from 'components/molecules/SupplyChart';
import { URLTabs } from 'components/molecules/URLTabs';
import { ASSETS, URLS } from 'helpers/config';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { useLocationProvider } from 'providers/LocationProvider';

import { MintAllocation } from './MintAllocation';
import { MintBalances } from './MintBalances';
import * as S from './styles';

// TODO: Language
// TODO: Next mint cycle
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
					<S.InfoWrapper className={'border-wrapper-alt1 fade-in'}>
						<S.InfoHeader>
							<ReactSVG src={ASSETS.plus} />
							<p>{language.fairLaunch}</p>
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
							<a href={'#'} target={'_blank'}>
								{language.learnMore}
							</a>
						</S.InfoBody>
					</S.InfoWrapper>
					<S.MetricsWrapper className={'fade-in'}>
						<S.Metrics>
							<S.MetricsSection>
								<S.MetricsValueMain>
									<span className={'primary-text'}>{language.fairLaunchDeposits}</span>
									<p>{ethProvider.totalDeposited?.usdTotal?.display ?? <EllipsisLoader />}</p>
								</S.MetricsValueMain>
							</S.MetricsSection>
							<S.MetricsSection>
								<S.MetricsValue>
									<span className={'primary-text'}>{language.nextMintCycle}</span>
									<p>February 6, 2025 10:54 AM</p>
								</S.MetricsValue>
							</S.MetricsSection>
						</S.Metrics>
						<SupplyChart />
					</S.MetricsWrapper>
				</S.GlobalWrapper>
				<URLTabs tabs={TABS} activeUrl={TABS[0].url} />
			</S.Wrapper>
		</>
	);
}
