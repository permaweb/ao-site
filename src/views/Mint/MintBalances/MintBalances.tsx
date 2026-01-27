import React from 'react';
import { ReactSVG } from 'react-svg';

import { Modal } from 'components/atoms/Modal';
import { ASSETS } from 'helpers/config';
import { EthTokenEnum } from 'helpers/types';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { BalanceSection } from './BalanceSection';
import * as S from './styles';

export default function MintBalances() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [info, setInfo] = React.useState<string | null>(null);

	return (
		<>
			<S.BalancesWrapper>
				<S.BalancesBodyWrapper>
					<S.BalancesBreakdownWrapper>
						{/* <div>
							<S.HeaderWrapper>
								<S.HeaderInfoWrapper>
									<S.HeaderInfo>
										<h6>{language.deposits}</h6>
									</S.HeaderInfo>
								</S.HeaderInfoWrapper>
								<S.HeaderLink>
									<Subtitle>You are currently Receiving yield</Subtitle>
									<DashboardLink to="/delegate/dashboard">
										Manage Delegations
										<svg
											width="25"
											height="25"
											viewBox="0 0 25 25"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{
												verticalAlign: 'middle',
											}}
										>
											<g clipPath="url(#clip0_585_50)">
												<path
													d="M6.25 18.75L18.75 6.25"
													stroke="#23BE30"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M8.59375 6.25H18.75V16.4062"
													stroke="#23BE30"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</g>
											<defs>
												<clipPath id="clip0_585_50">
													<rect width="25" height="25" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</DashboardLink>
								</S.HeaderLink>
							</S.HeaderWrapper>
							<Subtitle>
								Track overall network token emissions, total deposited assets, and your current and projected AO
								holdings.
							</Subtitle>
						</div>
						<BalanceSection type={'arweave'} /> */}
						<S.BalancesFlexWrapper>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.StEth} />
							</S.BalanceFlexSection>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.USDS} />
							</S.BalanceFlexSection>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.DAI} />
							</S.BalanceFlexSection>
						</S.BalancesFlexWrapper>
					</S.BalancesBreakdownWrapper>
				</S.BalancesBodyWrapper>
			</S.BalancesWrapper>
			{info && (
				<Modal header={'Earnings'} handleClose={() => setInfo(null)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>{info}</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
