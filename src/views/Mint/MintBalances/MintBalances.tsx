import React from 'react';
import { ReactSVG } from 'react-svg';

import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { EthTokenEnum } from 'helpers/types';
import { formatCount } from 'helpers/utils';
import { useAOProvider } from 'providers/AOProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BalanceSection } from './BalanceSection';
import * as S from './styles';

export default function MintBalances() {
	const aoProvider = useAOProvider();
	const ethProvider = useEthereumProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [info, setInfo] = React.useState<string | null>(null);

	return (
		<>
			<S.BalancesWrapper>
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
				<S.BalancesBodyWrapper>
					<S.BalancesPrimaryWrapper>
						<S.BalancesGlobalWrapper>
							<S.BalanceQuantitySection>
								<S.BalanceQuantityHeader>
									<span className={'primary-text'}>{language.totalAOSupply}</span>
								</S.BalanceQuantityHeader>
								<S.BalanceQuantityBody>
									<ReactSVG id={'ao-logo'} src={ASSETS.ao} />
									<p>
										{aoProvider.mintedSupply ? formatCount(aoProvider.mintedSupply.toString()) : <EllipsisLoader />}
									</p>
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
					<S.BalancesBreakdownWrapper>
						<S.HeaderWrapper>
							<S.HeaderInfoWrapper>
								<S.HeaderInfo>
									<h6>{language.sources}</h6>
								</S.HeaderInfo>
							</S.HeaderInfoWrapper>
							<S.HeaderTooltip>
								<button onClick={() => setInfo(language.sourcesInfo)}>
									<ReactSVG src={ASSETS.info} />
									{language.infoTooltip}
								</button>
							</S.HeaderTooltip>
						</S.HeaderWrapper>
						<BalanceSection type={'arweave'} />
						<S.BalancesFlexWrapper>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.StEth} />
							</S.BalanceFlexSection>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.DAI} />
							</S.BalanceFlexSection>
						</S.BalancesFlexWrapper>
					</S.BalancesBreakdownWrapper>
				</S.BalancesBodyWrapper>
			</S.BalancesWrapper>
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
