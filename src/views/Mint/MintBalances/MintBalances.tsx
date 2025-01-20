import React from 'react';
import { ReactSVG } from 'react-svg';

import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
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

	const [showInfo, setShowInfo] = React.useState<boolean>(false);

	return (
		<>
			<S.BalancesWrapper>
				<S.HeaderWrapper>
					<S.HeaderInfoWrapper>
						<S.HeaderInfo>
							<h6>{'View AO metrics and manage your deposits'}</h6>
						</S.HeaderInfo>
					</S.HeaderInfoWrapper>
					<S.HeaderTooltip>
						<button onClick={() => setShowInfo(true)}>
							{'('}
							<ReactSVG src={ASSETS.info} />
							How does this work ?{')'}
						</button>
					</S.HeaderTooltip>
				</S.HeaderWrapper>
				<S.BalancesBodyWrapper>
					<S.BalancesGlobalWrapper className={'border-wrapper-primary'}>
						<S.BalanceQuantitySection>
							<S.BalanceQuantityHeader>
								<span className={'primary-text'}>Total AO Supply</span>
							</S.BalanceQuantityHeader>
							<S.BalanceQuantityBody>
								<ReactSVG id={'ao-logo'} src={ASSETS.ao} />
								<p>{aoProvider.mintedSupply ? formatCount(aoProvider.mintedSupply.toString()) : <EllipsisLoader />}</p>
							</S.BalanceQuantityBody>
						</S.BalanceQuantitySection>
						<S.BalancesGlobalFlexWrapper>
							<S.BalanceQuantityEndSection>
								<S.BalanceQuantityHeader>
									<span className={'primary-text'}>Total stETH Bridged</span>
								</S.BalanceQuantityHeader>
								<S.BalanceQuantityBody>
									<ReactSVG src={ASSETS.stEth} />
									<p>{ethProvider.totalDeposited?.stEth?.display ?? <EllipsisLoader />}</p>
								</S.BalanceQuantityBody>
							</S.BalanceQuantityEndSection>
							<S.BalanceQuantityEndSection>
								<S.BalanceQuantityHeader>
									<span className={'primary-text'}>Total DAI Bridged</span>
								</S.BalanceQuantityHeader>
								<S.BalanceQuantityBody>
									<ReactSVG src={ASSETS.dai} />
									<p>{ethProvider.totalDeposited?.dai?.display ?? <EllipsisLoader />}</p>
								</S.BalanceQuantityBody>
							</S.BalanceQuantityEndSection>
						</S.BalancesGlobalFlexWrapper>
					</S.BalancesGlobalWrapper>
					<BalanceSection type={'arweave'} />
					<S.BalancesFlexWrapper>
						<S.BalanceFlexSection>
							<BalanceSection type={'stEth'} />
						</S.BalanceFlexSection>
						<S.BalanceFlexSection>
							<BalanceSection type={'dai'} />
						</S.BalanceFlexSection>
					</S.BalancesFlexWrapper>
				</S.BalancesBodyWrapper>
			</S.BalancesWrapper>
			{showInfo && (
				<Modal header={'Earnings'} handleClose={() => setShowInfo(false)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>Description</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
