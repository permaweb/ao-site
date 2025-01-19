import { formatCount, formatUSDAmount } from 'helpers/utils';
import { useAOProvider } from 'providers/AOProvider';

import * as S from './styles';

// TODO: Language
export default function Landing() {
	const aoProvider = useAOProvider();

	return (
		<S.Wrapper>
			<S.ContentWrapper className={'fade-in'}>
				<h4>Hyper.</h4>
				<h4>Parallel.</h4>
				<h4>Computer.</h4>
				<p>
					The Permaweb is an innovative layer of the internet that operates on a decentralized network, ensuring that
					data.
				</p>
			</S.ContentWrapper>
			<S.MetricsWrapper>
				<S.MetricsSection className={'fade-in'}>
					<S.MetricsLine>
						<span className={'primary-text'}>Phase</span>
						<S.MetricsValue>
							<p>{aoProvider.phase}</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Status</span>
						<S.MetricsValue>
							<S.Indicator />
							<p>{aoProvider.status}</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Fair Launch Deposits</span>
						<S.MetricsValue>
							<p>{formatUSDAmount(aoProvider.deposits)}</p>
						</S.MetricsValue>
					</S.MetricsLine>
				</S.MetricsSection>
				<S.MetricsSection className={'fade-in'}>
					<S.MetricsLine>
						<span className={'primary-text'}>Nodes</span>
						<S.MetricsValue>
							<p>{formatCount(aoProvider.nodes)}</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Messages</span>
						<S.MetricsValue>
							<p>{formatCount(aoProvider.messages)}</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Processes</span>
						<S.MetricsValue>
							<p>{formatCount(aoProvider.processes)}</p>
						</S.MetricsValue>
					</S.MetricsLine>
				</S.MetricsSection>
			</S.MetricsWrapper>
		</S.Wrapper>
	);
}
