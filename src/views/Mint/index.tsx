import { AllocationSummary } from './AllocationSummary';
import { AllocationToken } from './AllocationToken';
import * as S from './styles';

export default function Mint() {
	return (
		<S.Wrapper>
			<S.GlobalWrapper>
				<S.GlobalSection className={'border-wrapper-primary'}>
					<S.GlobalHeader>
						<h6>Mainnet Early</h6>
					</S.GlobalHeader>
				</S.GlobalSection>
				<S.GlobalSection className={'border-wrapper-primary'}>
					<S.GlobalHeader>
						<h6>100% Fair Launch</h6>
					</S.GlobalHeader>
				</S.GlobalSection>
			</S.GlobalWrapper>
			<S.HeaderWrapper>
				<S.HeaderInfo>
					<h6>Allocate Your Yield</h6>
				</S.HeaderInfo>
			</S.HeaderWrapper>
			<S.BodyWrapper>
				<S.TokensSection>
					<AllocationToken type={'pi'} />
					<AllocationToken type={'ao'} />
					<AllocationToken type={'arweave'} />
				</S.TokensSection>
				<S.AllocationWrapper className={'border-wrapper-alt1'}>
					<AllocationSummary />
				</S.AllocationWrapper>
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
