import { formatCount } from 'helpers/utils';
import { useAOProvider } from 'providers/AOProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AllocationSummary } from './AllocationSummary';
import { AllocationToken } from './AllocationToken';
import * as S from './styles';

export default function Mint() {
	const aoProvider = useAOProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<S.Wrapper>
			<S.GlobalWrapper>
				<S.MetricsWrapper className={'fade-in'}>
					<S.GlobalHeader>
						<h6>{language.network}</h6>
					</S.GlobalHeader>
					<S.Metrics>
						<S.Messages>
							<S.MetricsValue>
								<span className={'primary-text'}>{language.messages}</span>
								<p>{formatCount(aoProvider.messages)}</p>
							</S.MetricsValue>
						</S.Messages>
						<S.MetricsSection>
							<S.MetricsValue>
								<span className={'primary-text'}>{language.nodes}</span>
								<p>{formatCount(aoProvider.nodes)}</p>
							</S.MetricsValue>
							<S.MetricsValue>
								<span className={'primary-text'}>{language.phase}</span>
								<p>{aoProvider.phase}</p>
							</S.MetricsValue>
							<S.MetricsValue>
								<span className={'primary-text'}>{language.processes}</span>
								<p>{formatCount(aoProvider.processes)}</p>
							</S.MetricsValue>
						</S.MetricsSection>
					</S.Metrics>
				</S.MetricsWrapper>
				<S.GlobalSection className={'border-wrapper-primary fade-in'}>
					<S.GlobalHeader>
						<h6>{language.fairLaunch}</h6>
					</S.GlobalHeader>
				</S.GlobalSection>
			</S.GlobalWrapper>
			<S.HeaderWrapper>
				<S.HeaderInfo>
					<h6>{language.allocateYield}</h6>
				</S.HeaderInfo>
			</S.HeaderWrapper>
			<S.BodyWrapper>
				<S.TokensSection>
					<AllocationToken type={'pi'} />
					<AllocationToken type={'ao'} />
					<AllocationToken type={'arweave'} />
				</S.TokensSection>
				<S.AllocationWrapper className={'border-wrapper-alt1 fade-in'}>
					<AllocationSummary />
				</S.AllocationWrapper>
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
