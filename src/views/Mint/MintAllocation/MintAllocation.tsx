import React from 'react';
import { ReactSVG } from 'react-svg';

import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AllocationCustom } from './AllocationCustom';
import { AllocationSetup } from './AllocationSetup';
import { AllocationSummary } from './AllocationSummary';
import { AllocationToken } from './AllocationToken';
import * as S from './styles';

// TODO: Wallet not connected - allocation disabled
export default function MintAllocation() {
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showSetup, setShowSetup] = React.useState<boolean>(false);
	const [info, setInfo] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (allocationProvider.records?.length <= 0) setShowSetup(true);
		else setShowSetup(false);
	}, [allocationProvider.records]);

	return (
		<>
			<S.AllocationWrapper>
				<S.HeaderWrapper>
					<S.HeaderInfoWrapper>
						<S.HeaderInfo>
							<h6>{language.chooseYield}</h6>
						</S.HeaderInfo>
					</S.HeaderInfoWrapper>
					<S.HeaderTooltip>
						<button onClick={() => setInfo(showSetup ? language.yieldSetupInfo : language.yieldCustomizeInfo)}>
							<ReactSVG src={ASSETS.info} />
							{language.infoTooltip}
						</button>
					</S.HeaderTooltip>
				</S.HeaderWrapper>
				<S.AllocationBodyWrapper>
					{showSetup ? (
						<AllocationSetup />
					) : (
						<>
							<S.TokensSection>
								<AllocationToken type={'pi'} />
								<S.TokenFlexWrapper>
									<S.TokenFlexSection>
										<AllocationToken type={'ao'} />
									</S.TokenFlexSection>
									<S.TokenFlexSection>
										<AllocationToken type={'arweave'} />
									</S.TokenFlexSection>
								</S.TokenFlexWrapper>
								<AllocationCustom />
							</S.TokensSection>
							<S.AllocationSummaryWrapper className={'border-wrapper-alt1 fade-in'}>
								<AllocationSummary />
							</S.AllocationSummaryWrapper>
						</>
					)}
				</S.AllocationBodyWrapper>
				<S.FooterWrapper className={'border-wrapper-alt1 fade-in'}>
					<span>
						· AO lets you choose how you receive yield. You can select to receive just AO tokens, the Permaweb Index (a
						mix of everything on the permaweb: 1/3 AO, 1/3 AR, 1/3 ecosystem project tokens), or a custom combination.
					</span>
					{showSetup && (
						<span>· Please set your basic preference now. You can customize this further on the next screen.</span>
					)}
					<span>· These preferences will take effect on March 14th. Until then, you'll receive AO tokens.</span>
				</S.FooterWrapper>
			</S.AllocationWrapper>
			{info && (
				<Modal header={'Yield Allocation'} handleClose={() => setInfo(null)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>{info}</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
