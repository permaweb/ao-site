import React from 'react';
import { ReactSVG } from 'react-svg';

import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { useAOProvider } from 'providers/AOProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AllocationCustom } from './AllocationCustom';
import { AllocationSummary } from './AllocationSummary';
import { AllocationToken } from './AllocationToken';
import * as S from './styles';

export default function MintAllocation() {
	const aoProvider = useAOProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showInfo, setShowInfo] = React.useState<boolean>(false);

	return (
		<>
			<S.AllocationWrapper>
				<S.HeaderWrapper>
					<S.HeaderInfoWrapper>
						<S.HeaderInfo>
							<h6>{language.allocateYield}</h6>
						</S.HeaderInfo>
					</S.HeaderInfoWrapper>
					<S.HeaderTooltip>
						<button onClick={() => setShowInfo(true)}>
							{'('}
							<ReactSVG src={ASSETS.info} /> How does this work ?{')'}
						</button>
					</S.HeaderTooltip>
				</S.HeaderWrapper>
				<S.AllocationBodyWrapper>
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
					<S.AllocationSummaryWrapper className={'border-wrapper-primary fade-in'}>
						<AllocationSummary />
					</S.AllocationSummaryWrapper>
				</S.AllocationBodyWrapper>
			</S.AllocationWrapper>
			{showInfo && (
				<Modal header={'Yield Allocation'} handleClose={() => setShowInfo(false)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>Description</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
