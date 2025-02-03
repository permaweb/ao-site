import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { ASSETS } from 'helpers/config';
import { formatCount } from 'helpers/utils';
import { useAOProvider } from 'providers/AOProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Landing() {
	const aoProvider = useAOProvider();
	const ethProvider = useEthereumProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<>
			<S.Wrapper>
				<S.ContentWrapper className={'fade-in'}>
					<h4>{language.landingHeader1}</h4>
					<h4>{language.landingHeader2}</h4>
					<h4>{language.landingHeader3}</h4>
					<p>{language.landingSubheader}</p>
				</S.ContentWrapper>
				<S.MetricsWrapper>
					<S.MetricsSection className={'fade-in'}>
						<S.MetricsLine>
							<span className={'primary-text'}>{language.phase}</span>
							<S.MetricsValue>
								<p>{aoProvider.phase}</p>
							</S.MetricsValue>
						</S.MetricsLine>
						<S.MetricsLine>
							<span className={'primary-text'}>{language.status}</span>
							<S.MetricsValue>
								<S.Indicator />
								<p>{aoProvider.status}</p>
							</S.MetricsValue>
						</S.MetricsLine>
						<S.MetricsLine>
							<span className={'primary-text'}>{language.fairLaunchDeposits}</span>
							<S.MetricsValue>
								<p>{ethProvider.totalDeposited?.usdTotal?.display ?? <EllipsisLoader />}</p>
							</S.MetricsValue>
						</S.MetricsLine>
					</S.MetricsSection>
					<S.MetricsSection className={'fade-in'}>
						<S.MetricsLine>
							<span className={'primary-text'}>{language.nodes}</span>
							<S.MetricsValue>
								<p>{formatCount(aoProvider.nodes)}</p>
							</S.MetricsValue>
						</S.MetricsLine>
						<S.MetricsLine>
							<span className={'primary-text'}>{language.messages}</span>
							<S.MetricsValue>
								<p>{aoProvider.messages ? formatCount(aoProvider.messages.toString()) : <EllipsisLoader />}</p>
							</S.MetricsValue>
						</S.MetricsLine>
						<S.MetricsLine>
							<span className={'primary-text'}>{language.processes}</span>
							<S.MetricsValue>
								<p>{aoProvider.processes ? formatCount(aoProvider.processes.toString()) : <EllipsisLoader />}</p>
							</S.MetricsValue>
						</S.MetricsLine>
					</S.MetricsSection>
				</S.MetricsWrapper>
			</S.Wrapper>
			<S.GraphicWrapper>
				<video autoPlay muted loop>
					<source src={ASSETS.landingGraphic} type={'video/mp4'} />
					Your browser does not support the video tag.
				</video>
			</S.GraphicWrapper>
		</>
	);
}
