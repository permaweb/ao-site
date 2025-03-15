import React from 'react';
import { ReactSVG } from 'react-svg';

import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import { AllocationCustom } from './AllocationCustom';
import { AllocationSetup } from './AllocationSetup';
import { AllocationSummary } from './AllocationSummary';
import { AllocationToken } from './AllocationToken';
import * as S from './styles';

export default function MintAllocation() {
	const arProvder = useArweaveProvider();
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [info, setInfo] = React.useState<string | null>(null);

	React.useEffect(() => {
		const handleBeforeUnload = (e: any) => {
			if (process.env.NODE_ENV === 'development') return;
			if (allocationProvider.unsavedChanges) {
				e.preventDefault();
				e.returnValue = '';
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [allocationProvider.unsavedChanges]);

	function getView() {
		if (!arProvder.walletAddress) return <WalletBlock />;
		if (allocationProvider.records.length <= 0 && allocationProvider.fetchingSetup)
			return <Loader message={`${language.gettingPreferences}...`} />;
		if (allocationProvider.showSetup) return <AllocationSetup />;
		return (
			<>
				<S.TokensSection>
					<S.PrimaryTokens>
						<AllocationToken type={'pi'} />
						<S.TokenFlexWrapper>
							<S.TokenFlexSection>
								<AllocationToken type={'ao'} />
							</S.TokenFlexSection>
							<S.TokenFlexSection>
								<AllocationToken type={'arweave'} />
							</S.TokenFlexSection>
						</S.TokenFlexWrapper>
						<S.PrimaryTokensInfo className={'border-wrapper-alt1'}>
							<span>{`· ${language.primaryTokensInfo}`}</span>
							<span>{`· AR rewards are coming soon. Until they go live, any previous AR selection will be delegated to AO.`}</span>
						</S.PrimaryTokensInfo>
					</S.PrimaryTokens>
					<AllocationCustom />
				</S.TokensSection>
				<S.AllocationSummaryWrapper className={'fade-in'}>
					<AllocationSummary />
				</S.AllocationSummaryWrapper>
			</>
		);
	}

	return (
		<>
			<S.AllocationWrapper>
				<S.HeaderWrapper>
					<S.HeaderInfoWrapper>
						<S.HeaderInfo>
							<h6>{`${language.chooseYield}${
								allocationProvider.fetchingSetup ? ` (${language.updating}...)` : ''
							}`}</h6>
						</S.HeaderInfo>
					</S.HeaderInfoWrapper>
					<S.HeaderTooltip>
						<button
							onClick={() =>
								setInfo(allocationProvider.showSetup ? language.yieldSetupInfo : language.yieldCustomizeInfo)
							}
						>
							<ReactSVG src={ASSETS.info} />
							{language.infoTooltip}
						</button>
					</S.HeaderTooltip>
				</S.HeaderWrapper>
				<S.AllocationBodyWrapper>{getView()}</S.AllocationBodyWrapper>
				<S.FooterWrapper className={'border-wrapper-alt1 fade-in'}>
					<span>{`· ${language.mintInfo1}`}</span>
					{allocationProvider.showSetup && <span>{`· ${language.mintInfo2}`}</span>}
					<span>{`· ${language.mintInfo3}`}</span>
				</S.FooterWrapper>
			</S.AllocationWrapper>
			{info && (
				<Modal header={language.yieldAllocation} handleClose={() => setInfo(null)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>{info}</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
