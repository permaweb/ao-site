import React from 'react';

// import { ReactSVG } from 'react-svg';
import { Button } from 'components/atoms/Button';
// import { FormField } from 'components/atoms/FormField';
// import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
// import { Modal } from 'components/molecules/Modal';
import { PreBridgeInfo } from 'components/organisms/PreBridgeInfo';
import { RewardsInfo } from 'components/organisms/RewardsInfo';
// import { ASSETS, STYLING } from 'helpers/config';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
// import { checkWindowCutoff, checkWindowResize } from 'helpers/window';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Arweave() {
	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	const [fetchingReward, setFetchingReward] = React.useState<boolean>(false);

	// ARMS
	const [dailyReward, setDailyReward] = React.useState<number | null>(null);

	// const [arInput, setArInput] = React.useState<number | null>(0);

	// // Daily ARMS
	// const [calcOutput, setCalcOutput] = React.useState<number | null>(null);
	// const [showCalcInfo, setShowCalcInfo] = React.useState<boolean>(false);

	// const [mobile, setMobile] = React.useState(!checkWindowCutoff(parseInt(STYLING.cutoffs.secondary)));

	// function handleWindowResize() {
	// 	if (!checkWindowCutoff(parseInt(STYLING.cutoffs.secondary))) {
	// 		setMobile(true);
	// 	} else {
	// 		setMobile(false);
	// 	}
	// }

	// checkWindowResize(handleWindowResize);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 200);
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		if (!showWallet) {
			setLabel(`${language.fetching}...`);
		} else {
			if (arProvider.walletAddress) {
				setLabel(formatAddress(arProvider.walletAddress, false));
			} else {
				setLabel(language.connectWallet);
			}
		}
	}, [showWallet, arProvider.walletAddress]);

	// TODO: daily arms
	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress) {
				try {
					setFetchingReward(true);
					await new Promise((resolve) => setTimeout(resolve, 1000));
					setDailyReward(3627364529);
					setFetchingReward(false);
				}
				catch (e: any) {
					console.error(e);
				}
			} else {
				setDailyReward(null);
			}
		})();
	}, [arProvider.walletAddress]);

	// React.useEffect(() => {
	// 	if (arInput && arInput > 0) {
	// 		setCalcOutput(arInput / 100);
	// 	} else {
	// 		setCalcOutput(null);
	// 	}
	// }, [arInput]);

	const walletBalance = React.useMemo(() => {
		if (!arProvider.walletAddress) return `${formatDisplayAmount(null)} AR`;
		if (arProvider.balance === 'Error') return arProvider.balance;
		return `${formatDisplayAmount(arProvider.balance)} AR`;
	}, [arProvider.balance, arProvider.walletAddress]);

	// const dailyAOOuput = React.useMemo(() => {
	// 	return `${formatDisplayAmount(calcOutput)} AO`;
	// }, [calcOutput]);

	// const monthlyAOOuput = React.useMemo(() => {
	// 	if (calcOutput && calcOutput > 0) {
	// 		const calcAmount = calcOutput * 30;
	// 		return `${formatDisplayAmount(calcAmount)} AO`;
	// 	}
	// 	return `${formatDisplayAmount(calcOutput)} AO`;
	// }, [calcOutput]);

	// const responsiveCalculator = React.useMemo(() => {
	// 	if (!mobile) {
	// 		return (
	// 			<>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcLineHeader>
	// 							<span>Arweave (AR)</span>
	// 						</S.CalcLineHeader>
	// 					</S.CalcCell>
	// 					<S.CalcCell>
	// 						<S.CalcLineHeaderCenter>
	// 							<span>Daily AO</span>
	// 						</S.CalcLineHeaderCenter>
	// 					</S.CalcCell>
	// 					<S.CalcCell>
	// 						<S.CalcLineHeaderCenter>
	// 							<span>Monthly AO</span>
	// 						</S.CalcLineHeaderCenter>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcInput>
	// 							<FormField
	// 								type={'number'}
	// 								value={arInput}
	// 								onChange={(e: any) => setArInput(e.target.value)}
	// 								invalid={{ status: false, message: null }}
	// 								disabled={false}
	// 								hideErrorMessage
	// 							/>
	// 							<S.CalcInputClear>
	// 								<IconButton
	// 									type={'primary'}
	// 									src={ASSETS.close}
	// 									handlePress={() => setArInput(0)}
	// 									dimensions={{ icon: 15, wrapper: 25 }}
	// 									disabled={!arInput || arInput <= 0}
	// 								/>
	// 							</S.CalcInputClear>
	// 						</S.CalcInput>
	// 					</S.CalcCell>
	// 					<S.CalcCell>
	// 						<S.CalcOutput>
	// 							<span>{dailyAOOuput}</span>
	// 						</S.CalcOutput>
	// 					</S.CalcCell>
	// 					<S.CalcCell>
	// 						<S.CalcOutput>
	// 							<span>{monthlyAOOuput}</span>
	// 						</S.CalcOutput>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 			</>
	// 		);
	// 	} else {
	// 		return (
	// 			<>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcLineHeader>
	// 							<span>Arweave (AR)</span>
	// 						</S.CalcLineHeader>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcInput>
	// 							<FormField
	// 								type={'number'}
	// 								value={arInput}
	// 								onChange={(e: any) => setArInput(e.target.value)}
	// 								invalid={{ status: false, message: null }}
	// 								disabled={false}
	// 								hideErrorMessage
	// 							/>
	// 							<S.CalcInputClear>
	// 								<IconButton
	// 									type={'primary'}
	// 									src={ASSETS.close}
	// 									handlePress={() => setArInput(0)}
	// 									dimensions={{ icon: 15, wrapper: 25 }}
	// 									disabled={!arInput || arInput <= 0}
	// 								/>
	// 							</S.CalcInputClear>
	// 						</S.CalcInput>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcLineHeader>
	// 							<span>Daily AO</span>
	// 						</S.CalcLineHeader>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcOutput>
	// 							<span>{dailyAOOuput}</span>
	// 						</S.CalcOutput>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcLineHeader>
	// 							<span>Monthly AO</span>
	// 						</S.CalcLineHeader>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 				<S.CalcLine>
	// 					<S.CalcCell>
	// 						<S.CalcOutput>
	// 							<span>{monthlyAOOuput}</span>
	// 						</S.CalcOutput>
	// 					</S.CalcCell>
	// 				</S.CalcLine>
	// 			</>
	// 		);
	// 	}
	// }, [mobile, dailyAOOuput, monthlyAOOuput]);

	const action = React.useMemo(() => {
		let action = () => arProvider.setWalletModalVisible(true);
		if (arProvider.walletAddress) {
			action = () => arProvider.handleDisconnect();
		}
		return action;
	}, [arProvider.walletAddress]);

	return (
		<>
			<S.Wrapper className={'pre-bridge-wrapper'}>
				<S.Content className={'pre-bridge-content'}>
					<S.S1Content className={'border-wrapper-alt2'}>
						{/* <S.CalcWrapper className={'fade-in'}>
							<S.CalcInfo>
								<IconButton
									type={'primary'}
									src={ASSETS.info}
									handlePress={() => setShowCalcInfo(true)}
									dimensions={{ icon: 15, wrapper: 25 }}
								/>
							</S.CalcInfo>
							<S.CalcBody className={'border-wrapper-alt1'}>
								{' '}
								<S.CalcLine>
									<S.CalcCell>
										<S.CalcHeader>
											<span>{language.calculator}</span>
											<ReactSVG src={ASSETS.calculator} />
										</S.CalcHeader>
									</S.CalcCell>
									<S.CalcCellEmpty />
									<S.CalcCellEmpty />
								</S.CalcLine>
								{responsiveCalculator}
							</S.CalcBody>
						</S.CalcWrapper> */}
						<S.Action>
							<Button
								type={'alt1'}
								label={label}
								handlePress={action}
								disabled={arProvider.walletAddress !== null}
								height={55}
								width={350}
							/>
						</S.Action>
						<S.PrimaryAmount className={'border-wrapper-alt1'}>
							<span>{language.walletBalance}</span>
							<h2 className={'fade-in'}>{walletBalance}</h2>
							{arProvider.walletAddress !== null && arProvider.balance === null && (
								<S.WalletLoadingWrapper>
									<span>{`${language.fetching}...`}</span>
									<S.Loader>
										<Loader xSm relative />
									</S.Loader>
								</S.WalletLoadingWrapper>
							)}
						</S.PrimaryAmount>
					</S.S1Content>
					<RewardsInfo fetchingReward={fetchingReward} dailyReward={dailyReward} />
				</S.Content>
				<PreBridgeInfo chain={'arweave'} />
			</S.Wrapper>
			{/* {showCalcInfo && (
				<Modal header={'Calculator'} handleClose={() => setShowCalcInfo(false)}>
					<S.CalcModalBody className={'modal-wrapper'}>
						<p>
							Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
							tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
							sed risus. Maecenas eget condimentum velit,{' '}
							<a href="#" target="_blank">
								Visit docs for more info
							</a>
							.
						</p>
					</S.CalcModalBody>
				</Modal>
			)} */}
		</>
	);
}
