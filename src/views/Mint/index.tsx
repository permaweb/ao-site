import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { formatCount } from 'helpers/utils';
import { useAOProvider } from 'providers/AOProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AllocationSummary } from './AllocationSummary';
import { AllocationToken } from './AllocationToken';
import { CustomAllocation } from './CustomAllocation';
import * as S from './styles';

// TODO: Language
export default function Mint() {
	const aoProvider = useAOProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showInfo, setShowInfo] = React.useState<boolean>(false);

	return (
		<>
			<S.Wrapper>
				<S.GlobalWrapper>
					<S.InfoWrapper className={'fade-in'}>
						<S.InfoHeader>
							<h6>{language.fairLaunch}</h6>
						</S.InfoHeader>
						<S.InfoBody>
							<p>
								<span id={'info-body-subheader'}>Just like Bitcoin, every $AO is minted by the community</span>
								<br />
								<br />
								<b>21 Million Tokens:</b> A fixed supply with a continuous halving emission curve.
								<br />
								<br />
								<b>Bridge Assets to Mint $AO:</b> Participate by bridging qualified assets like stETH and DAI, or by
								holding AR.
								<br />
								<br />
								<b>No Pre-mine, No Insider Allocation:</b> Ensuring a truly decentralized and equitable distribution.
							</p>
							<a href={'#'} target={'_blank'} className={'primary-text'}>
								Learn More.
							</a>
						</S.InfoBody>
					</S.InfoWrapper>
					<S.MetricsWrapper className={'border-wrapper-alt1 fade-in'}>
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
				</S.GlobalWrapper>
				<S.BalancesWrapper>
					<S.HeaderWrapper>
						<S.HeaderInfoWrapper>
							<S.HeaderInfo>
								<h6>{'Earnings'}</h6>
							</S.HeaderInfo>
						</S.HeaderInfoWrapper>
						<S.HeaderTooltip>
							<button onClick={() => setShowInfo(true)}>
								{'('}
								<ReactSVG src={ASSETS.info} />
								How does this work ?{')'}
							</button>
						</S.HeaderTooltip>
					</S.HeaderWrapper>
					<S.BalancesBodyWrapper>
						<S.BalanceSection className={'border-wrapper-alt1 fade-in'}>
							<S.BalanceHeaderWrapper>
								<S.BalanceHeader>
									<span>Your Arweave</span>
								</S.BalanceHeader>
								<Button type={'primary'} label={'Connect Arweave Wallet'} handlePress={() => {}} />
							</S.BalanceHeaderWrapper>
							<S.BalanceBodyWrapper>
								<S.BalanceQuantitySection>
									<S.BalanceQuantityHeader>
										<span className={'primary-text'}>Current Balance</span>
									</S.BalanceQuantityHeader>
									<S.BalanceQuantityBody>
										<ReactSVG src={ASSETS.arweave} />
										<p>9.34</p>
									</S.BalanceQuantityBody>
									<S.BalanceQuantityFooter>
										<Button type={'alt2'} label={'Buy AR'} handlePress={() => {}} />
									</S.BalanceQuantityFooter>
								</S.BalanceQuantitySection>
								<S.BalanceQuantitySection end>
									<S.BalanceQuantityHeader>
										<span className={'primary-text'}>30 Day Projection</span>
									</S.BalanceQuantityHeader>
									<S.BalanceQuantityBody>
										<p>
											<span className={'indicator'}>+</span>0.0023
										</p>
									</S.BalanceQuantityBody>
									<S.BalanceQuantityFooter>
										<span className={'primary-text'}>1 AR = 0.001283 AO</span>
									</S.BalanceQuantityFooter>
								</S.BalanceQuantitySection>
								<S.BalanceQuantitySection end>
									<S.BalanceQuantityHeader>
										<span className={'primary-text'}>1 Year Projection</span>
									</S.BalanceQuantityHeader>
									<S.BalanceQuantityBody>
										<p>
											<span className={'indicator'}>+</span>0.4870
										</p>
									</S.BalanceQuantityBody>
									<S.BalanceQuantityFooter>
										<span className={'primary-text'}>1 AR = 0.0144 AO</span>
									</S.BalanceQuantityFooter>
								</S.BalanceQuantitySection>
							</S.BalanceBodyWrapper>
						</S.BalanceSection>
						<S.BalancesFlexWrapper>
							<S.BalanceFlexSection>
								<S.BalanceSection className={'border-wrapper-primary fade-in'}>
									<S.BalanceHeaderWrapper>
										<S.BalanceHeader>
											<span>Your stETH Bridged</span>
										</S.BalanceHeader>
										<Button type={'primary'} label={'Connect ETH Wallet'} handlePress={() => {}} />
									</S.BalanceHeaderWrapper>
									<S.BalanceBodyWrapper>
										<S.BalanceQuantitySection>
											<S.BalanceQuantityHeader>
												<span className={'primary-text'}>Amount Bridged</span>
											</S.BalanceQuantityHeader>
											<S.BalanceQuantityBody>
												<ReactSVG src={ASSETS.stEth} />
												<p>0.67</p>
											</S.BalanceQuantityBody>
											<S.BalanceQuantityFooter>
												<Button type={'alt2'} label={'Deposit stETH'} handlePress={() => {}} />
											</S.BalanceQuantityFooter>
										</S.BalanceQuantitySection>
										<S.BalanceQuantitySection end>
											<S.BalanceQuantityHeader>
												<span className={'primary-text'}>30 Day Projection</span>
											</S.BalanceQuantityHeader>
											<S.BalanceQuantityBody>
												<p>
													<span className={'indicator'}>+</span>0.0023
												</p>
											</S.BalanceQuantityBody>
											<S.BalanceQuantityFooter>
												<span className={'primary-text'}>1 AR = 0.001283 AO</span>
											</S.BalanceQuantityFooter>
										</S.BalanceQuantitySection>
										<S.BalanceQuantitySection end>
											<S.BalanceQuantityHeader>
												<span className={'primary-text'}>1 Year Projection</span>
											</S.BalanceQuantityHeader>
											<S.BalanceQuantityBody>
												<p>
													<span className={'indicator'}>+</span>0.4870
												</p>
											</S.BalanceQuantityBody>
											<S.BalanceQuantityFooter>
												<span className={'primary-text'}>1 AR = 0.0144 AO</span>
											</S.BalanceQuantityFooter>
										</S.BalanceQuantitySection>
									</S.BalanceBodyWrapper>
								</S.BalanceSection>
							</S.BalanceFlexSection>
							<S.BalanceFlexSection>
								<S.BalanceSection className={'border-wrapper-primary fade-in'}>
									<S.BalanceHeaderWrapper>
										<S.BalanceHeader>
											<span>Your DAI Bridged</span>
										</S.BalanceHeader>
										<Button type={'primary'} label={'Connect ETH Wallet'} handlePress={() => {}} />
									</S.BalanceHeaderWrapper>
									<S.BalanceBodyWrapper>
										<S.BalanceQuantitySection>
											<S.BalanceQuantityHeader>
												<span className={'primary-text'}>Amount Bridged</span>
											</S.BalanceQuantityHeader>
											<S.BalanceQuantityBody>
												<ReactSVG src={ASSETS.dai} />
												<p>121.5</p>
											</S.BalanceQuantityBody>
											<S.BalanceQuantityFooter>
												<Button type={'alt2'} label={'Deposit DAI'} handlePress={() => {}} />
											</S.BalanceQuantityFooter>
										</S.BalanceQuantitySection>
										<S.BalanceQuantitySection end>
											<S.BalanceQuantityHeader>
												<span className={'primary-text'}>30 Day Projection</span>
											</S.BalanceQuantityHeader>
											<S.BalanceQuantityBody>
												<p>
													<span className={'indicator'}>+</span>0.0023
												</p>
											</S.BalanceQuantityBody>
											<S.BalanceQuantityFooter>
												<span className={'primary-text'}>1 AR = 0.001283 AO</span>
											</S.BalanceQuantityFooter>
										</S.BalanceQuantitySection>
										<S.BalanceQuantitySection end>
											<S.BalanceQuantityHeader>
												<span className={'primary-text'}>1 Year Projection</span>
											</S.BalanceQuantityHeader>
											<S.BalanceQuantityBody>
												<p>
													<span className={'indicator'}>+</span>0.4870
												</p>
											</S.BalanceQuantityBody>
											<S.BalanceQuantityFooter>
												<span className={'primary-text'}>1 AR = 0.0144 AO</span>
											</S.BalanceQuantityFooter>
										</S.BalanceQuantitySection>
									</S.BalanceBodyWrapper>
								</S.BalanceSection>
							</S.BalanceFlexSection>
						</S.BalancesFlexWrapper>

						<S.BalancesGlobalWrapper className={'border-wrapper-primary'}>
							<S.BalanceQuantitySection>
								<S.BalanceQuantityHeader>
									<span className={'primary-text'}>Total AO Supply</span>
								</S.BalanceQuantityHeader>
								<S.BalanceQuantityBody>
									<ReactSVG id={'ao-logo'} src={ASSETS.ao} />
									<p>{formatCount('3023248.64')}</p>
								</S.BalanceQuantityBody>
							</S.BalanceQuantitySection>
							<S.BalancesGlobalFlexWrapper>
								<S.BalanceQuantitySection end>
									<S.BalanceQuantityHeader>
										<span className={'primary-text'}>Total stETH Bridged</span>
									</S.BalanceQuantityHeader>
									<S.BalanceQuantityBody>
										<ReactSVG src={ASSETS.stEth} />
										<p>{formatCount('128345.34')}</p>
									</S.BalanceQuantityBody>
								</S.BalanceQuantitySection>
								<S.BalanceQuantitySection end>
									<S.BalanceQuantityHeader>
										<span className={'primary-text'}>Total DAI Bridged</span>
									</S.BalanceQuantityHeader>
									<S.BalanceQuantityBody>
										<ReactSVG src={ASSETS.dai} />
										<p>{formatCount('247255932.78')}</p>
									</S.BalanceQuantityBody>
								</S.BalanceQuantitySection>
							</S.BalancesGlobalFlexWrapper>
						</S.BalancesGlobalWrapper>
					</S.BalancesBodyWrapper>
				</S.BalancesWrapper>
				<S.YieldAllocationWrapper>
					<S.HeaderWrapper>
						<S.HeaderInfoWrapper>
							<S.HeaderInfo>
								<h6>{language.allocateYield}</h6>
							</S.HeaderInfo>
						</S.HeaderInfoWrapper>
						<S.HeaderTooltip>
							<button onClick={() => setShowInfo(true)}>
								{'('}
								<ReactSVG src={ASSETS.info} />
								How does this work ?{')'}
							</button>
						</S.HeaderTooltip>
					</S.HeaderWrapper>
					<S.AllocationBodyWrapper>
						<S.TokensSection>
							<AllocationToken type={'pi'} defaultClosed />
							<S.TokenFlexWrapper>
								<S.TokenFlexSection>
									<AllocationToken type={'ao'} />
								</S.TokenFlexSection>
								<S.TokenFlexSection>
									<AllocationToken type={'arweave'} />
								</S.TokenFlexSection>
							</S.TokenFlexWrapper>
							<CustomAllocation />
						</S.TokensSection>
						<S.AllocationSummaryWrapper className={'border-wrapper-primary fade-in'}>
							<AllocationSummary />
						</S.AllocationSummaryWrapper>
					</S.AllocationBodyWrapper>
				</S.YieldAllocationWrapper>
			</S.Wrapper>
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
