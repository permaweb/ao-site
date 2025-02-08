import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Modal } from 'components/molecules/Modal';
import { SupplyChart } from 'components/molecules/SupplyChart';
import { URLTabs } from 'components/molecules/URLTabs';
import { ASSETS, REDIRECTS, URLS } from 'helpers/config';
import { formatCount } from 'helpers/utils';
import { Footer } from 'navigation/footer';
import { useAOProvider } from 'providers/AOProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BalanceSection } from './MintBalances/BalanceSection';
import { MintAllocation } from './MintAllocation';
import { MintBalances } from './MintBalances';
import * as S from './styles';

export default function Mint() {
	const { active } = useParams();
	const navigate = useNavigate();

	const aoProvider = useAOProvider();
	const ethProvider = useEthereumProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [info, setInfo] = React.useState<string | null>(null);

	const [aoSupply, setAOSupply] = React.useState<{ monthsFromNow: number; amount: number } | null>(null);
	const [aoSupplyReset, setAOSupplyReset] = React.useState<{ monthsFromNow: number; amount: number } | null>(null);
	const [currentMonth, setCurrentMonth] = React.useState<number | null>(null);

	React.useEffect(() => {
		if (!active) navigate(URLS.mintDeposits);
	}, [navigate]);

	React.useEffect(() => {
		setAOSupply({ monthsFromNow: 0, amount: aoProvider.mintedSupply });
		setAOSupplyReset({ monthsFromNow: 0, amount: aoProvider.mintedSupply });
	}, [aoProvider.mintedSupply]);

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

	function getSupplyDate() {
		const tokenReleaseDate = new Date();
		tokenReleaseDate.setMonth(tokenReleaseDate.getMonth() - currentMonth);
		const supplyDate = new Date(tokenReleaseDate);
		supplyDate.setMonth(supplyDate.getMonth() + currentMonth + (aoSupply?.monthsFromNow ?? 0));

		return supplyDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
	}

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
							<p>{parse(language.mintSubheader)}</p>
							<a href={REDIRECTS.tokenomics} target={'_blank'}>
								{language.learnMore}
							</a>
						</S.InfoBody>
					</S.InfoWrapper>
					<S.MetricsWrapper className={'fade-in'}>
						<S.Metrics>
							<S.MetricsSection>
								<S.MetricsValue>
									<span className={'primary-text'}>{language.totalAOSupply}</span>
								</S.MetricsValue>
								<S.MetricsValueMain>
									<ReactSVG id={'ao-logo'} src={ASSETS.ao} />
									<p>
										{aoSupply?.amount !== null ? (
											aoSupply?.amount > 0 ? (
												formatCount(aoSupply.amount.toFixed(4).toString())
											) : (
												'-'
											)
										) : (
											<EllipsisLoader />
										)}
									</p>
								</S.MetricsValueMain>
								<S.MetricsValue>
									<p>{getSupplyDate()}</p>
								</S.MetricsValue>
							</S.MetricsSection>
						</S.Metrics>
						<SupplyChart
							currentValue={{ months: aoSupply?.monthsFromNow, supply: aoSupply?.amount }}
							setCurrentValue={(updatedValue: { months: number; supply: number }) =>
								setAOSupply({
									monthsFromNow: updatedValue.months,
									amount: updatedValue.supply,
								})
							}
							setCurrentMonth={(value: number) => setCurrentMonth(value)}
							handleReset={() => setAOSupply(aoSupplyReset)}
						/>
					</S.MetricsWrapper>
				</S.GlobalWrapper>
				<S.BalancesPrimaryWrapper>
					<S.HeaderWrapper>
						<S.HeaderInfoWrapper>
							<S.HeaderInfo>
								<h6>{language.network}</h6>
							</S.HeaderInfo>
						</S.HeaderInfoWrapper>
						<S.HeaderTooltip>
							<button onClick={() => setInfo(language.networkInfo)}>
								<ReactSVG src={ASSETS.info} />
								{language.infoTooltip}
							</button>
						</S.HeaderTooltip>
					</S.HeaderWrapper>
					<S.BalancesGlobalWrapper className={'border-wrapper-primary'}>
						<S.BalanceQuantitySection>
							<S.BalanceQuantityHeader>
								<span className={'primary-text'}>{language.fairLaunchDeposits}</span>
							</S.BalanceQuantityHeader>
							<S.BalanceQuantityBody>
								<p>{ethProvider.totalDeposited?.usdTotal?.display ?? <EllipsisLoader />}</p>
							</S.BalanceQuantityBody>
						</S.BalanceQuantitySection>
						<S.BalancesPrimaryFlexWrapper>
							<S.BalanceQuantityEndSection>
								<S.BalanceQuantityHeader>
									<span className={'primary-text'}>{language.totalStEthBridged}</span>
								</S.BalanceQuantityHeader>
								<S.BalanceQuantityBody>
									<ReactSVG src={ASSETS.stEth} />
									<p>{ethProvider.totalDeposited?.stEth?.display ?? <EllipsisLoader />}</p>
								</S.BalanceQuantityBody>
							</S.BalanceQuantityEndSection>
							<S.BalanceQuantityEndSection>
								<S.BalanceQuantityHeader>
									<span className={'primary-text'}>{language.totalDaiBridged}</span>
								</S.BalanceQuantityHeader>
								<S.BalanceQuantityBody>
									<ReactSVG src={ASSETS.dai} />
									<p>{ethProvider.totalDeposited?.dai?.display ?? <EllipsisLoader />}</p>
								</S.BalanceQuantityBody>
							</S.BalanceQuantityEndSection>
						</S.BalancesPrimaryFlexWrapper>
					</S.BalancesGlobalWrapper>
					<BalanceSection type={'ao'} />
				</S.BalancesPrimaryWrapper>
				<URLTabs tabs={TABS} activeUrl={TABS[0].url} />
				<Footer />
			</S.Wrapper>
			{info && (
				<Modal header={'Earnings'} handleClose={() => setInfo(null)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>{info}</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
