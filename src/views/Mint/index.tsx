import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';

import * as S from './styles';

export default function Mint() {
	return (
		<S.Wrapper>
			<S.TokenSectionsWrapper>
				<S.TokenSectionWrapper className={'border-wrapper-primary'}>
					<S.TokenSectionHeaderWrapper>
						<S.TokenSectionTitle>
							<p>Your Arweave Yield</p>
						</S.TokenSectionTitle>
						{/* <S.TokenSectionDescription>
							<ReactSVG src={ASSETS.info} />
							<p>
								Your Arweave tokens produce yield that you can split into 3 categories.{' '}
								<b>Adjust sliders as necessary.</b>
							</p>
						</S.TokenSectionDescription> */}
						<S.TokenSectionBalance>
							<S.TokenSectionBalanceHeader>
								<p className={'primary-text'}>Balance</p>
							</S.TokenSectionBalanceHeader>
							<S.TokenSectionBalanceQuantity>
								<span>1300</span>
							</S.TokenSectionBalanceQuantity>
						</S.TokenSectionBalance>
					</S.TokenSectionHeaderWrapper>
				</S.TokenSectionWrapper>
			</S.TokenSectionsWrapper>
		</S.Wrapper>
	);
}
