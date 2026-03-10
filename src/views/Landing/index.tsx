import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { ASSETS, NAV_REDIRECTS } from 'helpers/config';
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

	function renderMetricLine(label: string, field: string) {
		const latestMetric = aoProvider.metrics?.[aoProvider.metrics.length - 1];
		const value = latestMetric?.[field];

		return (
			<S.MetricsLine>
				<span className={'primary-text'}>{label}</span>
				<S.MetricsValue>
					<p>{value ? formatCount(value.toString()) : <EllipsisLoader />}</p>
				</S.MetricsValue>
			</S.MetricsLine>
		);
	}

	return (
		<>
			<S.Wrapper>
				<S.ContentWrapper>
					<h4>{language.landingHeader1}</h4>
					<h4>{language.landingHeader2}</h4>
					<h4>{language.landingHeader3}</h4>
					<p>{parse(language.landingSubheader)}</p>
				</S.ContentWrapper>
				<S.MetricsWrapper>
					<S.MetricsSection>
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
					<S.LinksWrapper>
						{NAV_REDIRECTS.map((element: { path: string; label: string; target?: '_blank' }, index: number) => {
							return (
								<Link key={index} to={element.path} target={'_blank'} className={'primary-text'}>
									<span>{element.label}</span>
								</Link>
							);
						})}
					</S.LinksWrapper>
					<S.MetricsSection>
						{renderMetricLine(language.users, 'active_users_over_blocks')}
						{renderMetricLine(language.messages, 'txs_roll')}
						{renderMetricLine(language.processes, 'processes_roll')}
					</S.MetricsSection>
				</S.MetricsWrapper>
			</S.Wrapper>
			<S.GraphicWrapper>
				<video autoPlay muted loop playsInline preload={'auto'}>
					<source src={ASSETS.landingGraphic} type={'video/mp4'} />
					Your browser does not support the video tag.
				</video>
			</S.GraphicWrapper>
		</>
	);
}
