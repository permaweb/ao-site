import * as S from './styles';

export default function Landing() {
	return (
		<S.Wrapper>
			<S.ContentWrapper>
				<h4>Hyper.</h4>
				<h4>Parallel.</h4>
				<h4>Computer.</h4>
				<p>
					The Permaweb is an innovative layer of the internet that operates on a decentralized network, ensuring that
					data.
				</p>
			</S.ContentWrapper>
			<S.MetricsWrapper>
				<S.MetricsSection>
					<S.MetricsLine>
						<span className={'primary-text'}>Phase</span>
						<S.MetricsValue>
							<p>Mainnet Early</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Status</span>
						<S.MetricsValue>
							<S.Indicator />
							<p> Live</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Fair Launch Deposits</span>
						<S.MetricsValue>
							<p>$5,409,389</p>
						</S.MetricsValue>
					</S.MetricsLine>
				</S.MetricsSection>
				<S.MetricsSection>
					<S.MetricsLine>
						<span className={'primary-text'}>Nodes</span>
						<S.MetricsValue>
							<p>159</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Messages</span>
						<S.MetricsValue>
							<p>436,000,000</p>
						</S.MetricsValue>
					</S.MetricsLine>
					<S.MetricsLine>
						<span className={'primary-text'}>Processes</span>
						<S.MetricsValue>
							<p>340,002</p>
						</S.MetricsValue>
					</S.MetricsLine>
				</S.MetricsSection>
			</S.MetricsWrapper>
		</S.Wrapper>
	);
}
