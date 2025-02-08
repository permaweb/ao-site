import React from 'react';
import { ReactSVG } from 'react-svg';

import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { EthTokenEnum } from 'helpers/types';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BalanceSection } from './BalanceSection';
import * as S from './styles';

export default function MintBalances() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [info, setInfo] = React.useState<string | null>(null);

	return (
		<>
			<S.BalancesWrapper>
				<S.BalancesBodyWrapper>
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
