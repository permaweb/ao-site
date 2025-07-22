import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import {
	ASSETS,
	DaiBridge_ABI,
	DaiToUsdsUpgrade_ABI,
	Erc20_ABI,
	ETH_CONTRACTS,
	fetchTokenYield,
	StEthBridge_ABI,
	UsdsBridge_ABI,
} from 'helpers/config';
import { EthExchangeType, EthTokenEnum, EthTokensYieldProjectionsType } from 'helpers/types';
import { arweaveToEVMBytes, checkValidAddress, formatAddress } from 'helpers/utils';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { ExchangeInfo } from '../ExchangeInfo';

import * as S from './styles';
import { IProps } from './types';

const { fromWei, toWei, toBigInt } = Web3.utils;

export default function EthExchange(props: IProps) {
	const ethProvider = useEthereumProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [exchangeType, setExchangeType] = React.useState<EthExchangeType>(props.conversionFlow ? 'convert' : 'deposit');

	useEffect(() => {
		setExchangeType(props.conversionFlow ? 'convert' : 'deposit');
	}, [props.conversionFlow]);

	const [amount, setAmount] = React.useState<string>('0');
	const [recipient, setRecipient] = React.useState<string | null>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [invalid, setInvalid] = React.useState<boolean>(false);
	const [disabled, setDisabled] = React.useState<boolean>(false);
	const [processed, setProcessed] = React.useState<boolean>(false);
	const [lockupTimeRemaining, setLockupTimeRemaining] = React.useState<string | null>(null);
	const [layoutRefresh, setLayoutRefresh] = React.useState<number>(0);
	const [daiYield, setDaiYield] = React.useState<number | null>(null);
	const [usdsYield, setUsdsYield] = React.useState<number | null>(null);
	const [daiNativeYield, setDaiNativeYield] = React.useState<number | null>(null);
	const [usdsNativeYield, setUsdsNativeYield] = React.useState<number | null>(null);
	const [isConversionProgressing, setIsConversionProgressing] = React.useState<boolean>(false);

	const errorButtonLabel = React.useMemo(() => {
		if (!amount || amount === '0') return language.depositAmountPrompt;
		if (exchangeType === 'deposit' && !recipient) return language.depositAddressPrompt;
		return null;
	}, [amount, language.depositAmountPrompt, exchangeType, recipient]);

	const effectiveToken = React.useMemo(() => {
		if (props.conversionFlow && exchangeType === 'convert') {
			return EthTokenEnum.DAI;
		}
		return props.token;
	}, [props.conversionFlow, exchangeType, props.token]);

	const amountInWei = React.useMemo(() => {
		try {
			return toBigInt(toWei(amount, 'ether'));
		} catch {
			return BigInt(0);
		}
	}, [amount]);

	React.useEffect(() => {
		if (amountInWei < 0) {
			setInvalid(true);
			return;
		}

		switch (exchangeType) {
			case 'convert':
				setInvalid(amountInWei > ethProvider?.tokens?.[effectiveToken]?.balance?.value);
				break;
			case 'deposit':
				setInvalid(amountInWei > ethProvider?.tokens?.[effectiveToken]?.balance?.value);
				break;
			case 'withdraw':
				setInvalid(amountInWei > ethProvider?.tokens?.[effectiveToken]?.deposited?.value);
				break;
		}
	}, [amountInWei, ethProvider.tokens]);

	/* Check DAI and USDS Stake Lockup Period */
	React.useEffect(() => {
		if ((effectiveToken === EthTokenEnum.DAI || effectiveToken === EthTokenEnum.USDS) && exchangeType === 'withdraw') {
			const lastStake = BigInt(ethProvider?.tokens?.[effectiveToken]?.deposited?.lastStake || 0);
			const lockupWindow = BigInt(64800);
			const currentTime = BigInt(Math.floor(Date.now() / 1000));
			const timeSinceLastStake = currentTime - lastStake;

			if (timeSinceLastStake <= lockupWindow) {
				const timeRemaining = lockupWindow - timeSinceLastStake;
				const hours = Number(timeRemaining / BigInt(3600));
				const minutes = Number((timeRemaining % BigInt(3600)) / BigInt(60));
				const seconds = Number(timeRemaining % BigInt(60));
				setLockupTimeRemaining(
					`${effectiveToken.toUpperCase()} is locked, you can withdraw in (${hours}h:${minutes}m:${seconds}s)`
				);
				setDisabled(true);
				return;
			}
		} else {
			setLockupTimeRemaining(null);
		}
	}, [ethProvider.tokens, exchangeType, effectiveToken, layoutRefresh]);

	React.useEffect(() => {
		if (!lockupTimeRemaining) return;

		const intervalId = setInterval(() => {
			setLayoutRefresh(Math.random());
		}, 1000);

		return () => clearInterval(intervalId);
	}, [lockupTimeRemaining, setLayoutRefresh]);

	React.useEffect(() => {
		if (invalid || loading || !ethProvider.walletAddress || amountInWei <= 0 || lockupTimeRemaining) {
			setDisabled(true);
			return;
		}

		switch (exchangeType) {
			case 'convert':
				setDisabled(amountInWei > ethProvider?.tokens?.[effectiveToken]?.balance?.value);
				break;
			case 'deposit':
				setDisabled(
					amountInWei > ethProvider?.tokens?.[effectiveToken]?.balance?.value || !recipient || getInvalidRecipient()
				);
				break;
			case 'withdraw':
				setDisabled(amountInWei > ethProvider?.tokens?.[effectiveToken]?.deposited?.value);
				break;
		}
	}, [
		loading,
		ethProvider.walletAddress,
		ethProvider.tokens,
		invalid,
		amount,
		exchangeType,
		recipient,
		effectiveToken,
		lockupTimeRemaining,
	]);

	React.useEffect(() => {
		if (!isConversionProgressing) {
			handleClear();
		}
	}, [exchangeType, props.open, isConversionProgressing]);

	React.useEffect(() => {
		const allProjections = ethProvider?.projections as EthTokensYieldProjectionsType;
		const aoPrice = ethProvider?.aoPrice;

		if (effectiveToken === EthTokenEnum.DAI && aoPrice && allProjections) {
			const fetchYields = async () => {
				try {
					const [daiNativeYield, usdsNativeYield] = await Promise.all([
						fetchTokenYield('dai'),
						fetchTokenYield('usds'),
					]);

					setDaiNativeYield(daiNativeYield);
					setUsdsNativeYield(usdsNativeYield);

					const daiPrice = allProjections[EthTokenEnum.DAI].price;
					const usdsPrice = allProjections[EthTokenEnum.USDS].price;

					const daiApy = ethProvider?.projections?.dai?.yearly?.ratio
						? ((ethProvider.projections.dai.yearly.ratio * aoPrice) / daiPrice) * 100
						: null;
					const usdsApy = ethProvider?.projections?.usds?.yearly?.ratio
						? ((ethProvider.projections.usds.yearly.ratio * aoPrice) / usdsPrice) * 100
						: null;

					setDaiYield(daiApy);
					setUsdsYield(usdsApy);
				} catch (error) {
					console.error('Error fetching yields:', error);
				}
			};

			fetchYields();
		}
	}, [effectiveToken, ethProvider?.projections, ethProvider?.aoPrice]);

	React.useEffect(() => {
		if (ethProvider.lastArweaveAddress) {
			setRecipient(ethProvider.lastArweaveAddress);
		} else {
			setRecipient('');
		}
	}, [ethProvider]);

	async function handleSubmit() {
		if (ethProvider.walletAddress && amount && amountInWei > 0) {
			setLoading(true);
			try {
				const web3 = new Web3(ethProvider.web3Provider);
				await ethProvider.ensureMainnet();

				let bridgeAddress = ETH_CONTRACTS.stEthBridge;
				let bridgeContract = new web3.eth.Contract(StEthBridge_ABI, bridgeAddress);
				let tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.stEth);
				let currentToken = effectiveToken;

				if (effectiveToken === EthTokenEnum.DAI) {
					bridgeAddress = ETH_CONTRACTS.daiBridge;
					bridgeContract = new web3.eth.Contract(DaiBridge_ABI, bridgeAddress);
					tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
				} else if (effectiveToken === EthTokenEnum.USDS) {
					bridgeAddress = ETH_CONTRACTS.usdsBridge;
					bridgeContract = new web3.eth.Contract(UsdsBridge_ABI, bridgeAddress);
					tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.usds);
				}

				const poolId = 0;

				let arweaveRecipient = '0x0000000000000000000000000000000000000000000000000000000000000000';
				if (recipient && checkValidAddress(recipient)) {
					arweaveRecipient = arweaveToEVMBytes(recipient);
				}

				switch (exchangeType) {
					case 'convert':
						const upgradeContractAddress = ETH_CONTRACTS.daiToUsdsUpgrade;
						const upgradeContract = new web3.eth.Contract(DaiToUsdsUpgrade_ABI, upgradeContractAddress);

						const daiTokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
						const upgradeAllowance = await daiTokenContract.methods
							.allowance(ethProvider.walletAddress, upgradeContractAddress)
							.call();
						if (Number(upgradeAllowance) < Number(amountInWei)) {
							const upgradeApproval = await daiTokenContract.methods.approve(upgradeContractAddress, amountInWei).send({
								from: ethProvider.walletAddress,
							});
							console.log('DAI Upgrade Approval transaction:', upgradeApproval);
							const upgradeApprovalReceipt = await checkTransactionReceipt(upgradeApproval.transactionHash);
							if (!upgradeApprovalReceipt || !upgradeApprovalReceipt.status) {
								throw new Error('DAI to USDS upgrade approval failed');
							}
							console.log('DAI Upgrade Approval transaction confirmed:', upgradeApprovalReceipt);
						}

						const upgradeTx = await upgradeContract.methods.daiToUsds(ethProvider.walletAddress, amountInWei).send({
							from: ethProvider.walletAddress,
						});
						console.log('DAI to USDS Upgrade transaction:', upgradeTx);
						await checkTransactionReceipt(upgradeTx.transactionHash);
						console.log('DAI to USDS Upgrade transaction confirmed:', upgradeTx);
						break;
					case 'deposit':
						const allowance = await tokenContract.methods.allowance(ethProvider.walletAddress, bridgeAddress).call();
						if (Number(allowance) < Number(amountInWei)) {
							const approval = await tokenContract.methods.approve(bridgeAddress, amountInWei).send({
								from: ethProvider.walletAddress,
							});
							console.log('Approval transaction:', approval);
							const approvalReceipt = await checkTransactionReceipt(approval.transactionHash);
							if (!approvalReceipt || !approvalReceipt.status) {
								throw new Error('Approval failed');
							}
							console.log('Approval transaction confirmed:', approval);
						}

						if (currentToken === EthTokenEnum.USDS) {
							let gas = undefined;
							try {
								const gasEstimate = await bridgeContract.methods.stake(amountInWei, arweaveRecipient).estimateGas({
									from: ethProvider.walletAddress,
								});
								gas = ((BigInt(gasEstimate) * BigInt(11)) / BigInt(10)).toString();
							} catch (error) {
								console.error('Error estimating gas:', error);
							}
							const stake = await bridgeContract.methods.stake(amountInWei, arweaveRecipient).send({
								from: ethProvider.walletAddress,
								gas,
							});
							console.log('Stake transaction:', stake);
							await checkTransactionReceipt(stake.transactionHash);
							console.log('Stake transaction confirmed:', stake);
						} else {
							const stake = await bridgeContract.methods.stake(poolId, amountInWei, arweaveRecipient).send({
								from: ethProvider.walletAddress,
							});
							console.log('Stake transaction:', stake);
							await checkTransactionReceipt(stake.transactionHash);
							console.log('Stake transaction confirmed:', stake);
						}
						break;
					case 'withdraw':
						if (effectiveToken === EthTokenEnum.USDS) {
							let gas = undefined;
							try {
								const gasEstimate = await bridgeContract.methods.withdraw(amountInWei, arweaveRecipient).estimateGas({
									from: ethProvider.walletAddress,
								});
								gas = ((BigInt(gasEstimate) * BigInt(11)) / BigInt(10)).toString();
							} catch (error) {
								console.error('Error estimating gas:', error);
							}
							const withdraw = await bridgeContract.methods.withdraw(amountInWei, arweaveRecipient).send({
								from: ethProvider.walletAddress,
								gas,
							});
							console.log('Withdraw transaction:', withdraw);
							await checkTransactionReceipt(withdraw.transactionHash);
							console.log('Withdraw transaction confirmed:', withdraw);
						} else {
							const withdraw = await bridgeContract.methods.withdraw(poolId, amountInWei, arweaveRecipient).send({
								from: ethProvider.walletAddress,
							});
							console.log('Withdraw transaction:', withdraw);
							await checkTransactionReceipt(withdraw.transactionHash);
							console.log('Withdraw transaction confirmed:', withdraw);
						}
						break;
				}

				ethProvider.refreshTokens();

				if (props.conversionFlow && exchangeType === 'convert') {
					setIsConversionProgressing(true);
					setExchangeType('deposit');
					setProcessed(false);
					setLoading(false);
					props.setResponse({
						message: 'DAI successfully converted to USDS. Now deposit USDS.',
						status: 'success',
					});
				} else {
					if (!(props.conversionFlow && exchangeType === 'deposit')) {
						setIsConversionProgressing(false);
					}
					props.setResponse({
						message: `Successful ${exchangeType}`,
						status: 'success',
					});
				}
			} catch (e) {
				console.error(e);
				props.setResponse({
					message: e.message ?? 'Error occurred',
					status: 'warning',
				});
			}
			setLoading(false);
			if (!(props.conversionFlow && exchangeType === 'convert')) {
				setProcessed(true);
			}
		}
	}

	async function checkTransactionReceipt(txHash: string) {
		const web3 = new Web3(ethProvider.web3Provider);
		let receipt = null;
		const maxTries = 100;
		let tries = 0;

		while (!receipt && tries < maxTries) {
			receipt = await web3.eth.getTransactionReceipt(txHash);
			if (!receipt) {
				console.log('Transaction is still pending...');
				await new Promise((resolve) => setTimeout(resolve, 1000));
				tries++;
			}
		}

		if (receipt && receipt.status) {
			console.log('Transaction was successful!', receipt);
		} else {
			console.warn('Transaction failed or not confirmed after maximum attempts');
		}

		return receipt;
	}

	function handleClear() {
		setAmount('0');
		setLoading(false);
		setProcessed(false);
		setIsConversionProgressing(false);
		if (props.conversionFlow) {
			setExchangeType('convert');
		}
	}

	function getMaxDisabled() {
		if (loading || !ethProvider.walletAddress || lockupTimeRemaining) return true;

		switch (exchangeType) {
			case 'convert':
				return ethProvider.tokens?.[effectiveToken]?.balance?.value <= BigInt(0);
			case 'deposit':
				return ethProvider.tokens?.[effectiveToken]?.balance?.value <= BigInt(0);
			case 'withdraw':
				return ethProvider.tokens?.[effectiveToken]?.deposited?.value <= BigInt(0);
		}
	}

	function getInvalidRecipient() {
		return recipient && !checkValidAddress(recipient);
	}

	function getTabAction(type: EthExchangeType) {
		return (
			<S.TabButton active={exchangeType === type} disabled={loading} onClick={() => setExchangeType(type)}>
				{language[type]}
			</S.TabButton>
		);
	}

	function getStepperComponent() {
		const steps = [
			{ key: 'convert', label: 'Convert DAI to USDS' },
			{ key: 'deposit', label: 'Deposit USDS' },
			{ key: 'complete', label: 'Complete' },
		];

		const currentStepIndex = steps.findIndex((step) => step.key === exchangeType);
		const completedStepIndex = processed ? 2 : currentStepIndex;

		return (
			<S.StepperWrapper>
				{steps.map((step, index) => {
					const isActive = index === currentStepIndex && !processed;
					const isCompleted = index < completedStepIndex || (processed && index <= completedStepIndex);

					return (
						<S.StepperItem key={step.key}>
							<S.StepperStep active={isActive} completed={isCompleted}>
								{isCompleted ? '✓' : index + 1}
							</S.StepperStep>
							<S.StepperLabel active={isActive} completed={isCompleted}>
								{step.label}
							</S.StepperLabel>
							{index < steps.length - 1 && <S.StepperConnector completed={isCompleted} />}
						</S.StepperItem>
					);
				})}
			</S.StepperWrapper>
		);
	}

	function getFormHeader() {
		let amountToUse = null;
		switch (exchangeType) {
			case 'convert':
				amountToUse = ethProvider?.tokens?.[effectiveToken]?.balance;
				break;
			case 'deposit':
				amountToUse = ethProvider?.tokens?.[effectiveToken]?.balance;
				break;
			case 'withdraw':
				amountToUse = ethProvider?.tokens?.[effectiveToken]?.deposited;
				break;
		}

		return (
			<S.FormHeader>
				{exchangeType === 'convert' ? (
					<span></span>
				) : (
					<span>{`Deposited: ${ethProvider?.tokens?.[effectiveToken]?.deposited?.display ?? '-'}`}</span>
				)}
				<S.FormFieldAction>
					<span>{`Available: ${amountToUse?.display ?? '-'}`}</span>
					<Button
						type={'alt3'}
						label={language.max}
						handlePress={() => setAmount(fromWei(amountToUse?.value, 'ether'))}
						disabled={getMaxDisabled()}
					/>
				</S.FormFieldAction>
			</S.FormHeader>
		);
	}

	return (
		<>
			<S.Wrapper className={'fade-in'}>
				<S.HeaderWrapper>
					<ReactSVG src={ASSETS.ethereum} />
					<p>{formatAddress(ethProvider.walletAddress ?? '-', true)}</p>
				</S.HeaderWrapper>
				{props.conversionFlow ? (
					getStepperComponent()
				) : (
					<S.TabsWrapper>
						{getTabAction('deposit')}
						{getTabAction('withdraw')}
					</S.TabsWrapper>
				)}
				<S.FormWrapper>
					{props.conversionFlow && processed ? (
						<S.CompleteScreen>
							<S.CompleteIcon>✓</S.CompleteIcon>
							<S.CompleteTitle>Transaction Complete!</S.CompleteTitle>
							<S.CompleteMessage>Your USDS has been successfully deposited.</S.CompleteMessage>
						</S.CompleteScreen>
					) : (
						<>
							<div>
								{exchangeType === 'convert' && (
									<S.YieldHeader>
										<span>Yield:</span>
										<S.YieldComparison>
											<S.YieldToken>
												<ReactSVG src={ASSETS.dai} />
												<span>DAI</span>
												<S.YieldDisplay>
													<span className="yield">{daiYield !== null ? `≈${daiYield.toFixed(1)}% APY` : '-'}</span>
													<span className="native">
														Native: {daiNativeYield !== null ? `${daiNativeYield.toFixed(1)}%` : '-'}
													</span>
												</S.YieldDisplay>
											</S.YieldToken>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M5 12h14m-7-7l7 7-7 7"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<S.YieldToken>
												<ReactSVG src={ASSETS.usds} />
												<span>USDS</span>
												<S.YieldDisplay>
													<span className="yield">{usdsYield !== null ? `≈${usdsYield.toFixed(1)}% APY` : '-'}</span>
													<span className="native">
														Native: {usdsNativeYield !== null ? `${usdsNativeYield.toFixed(1)}%` : '-'}
													</span>
												</S.YieldDisplay>
											</S.YieldToken>
										</S.YieldComparison>
									</S.YieldHeader>
								)}
								{getFormHeader()}
								<S.Form invalid={invalid}>
									<FormField
										type={'number'}
										value={amount}
										onChange={(e: any) => setAmount(e.target.value)}
										invalid={{ status: invalid, message: null }}
										disabled={loading || !ethProvider.walletAddress || lockupTimeRemaining !== null}
										hideErrorMessage
									/>
									<S.FormFieldLabel disabled={loading || !ethProvider.walletAddress}>
										<ReactSVG src={ASSETS[effectiveToken]} />
										<p>{effectiveToken}</p>
									</S.FormFieldLabel>
								</S.Form>
							</div>
							{exchangeType === 'deposit' && (
								<FormField
									value={recipient}
									label={language.arweaveAddress}
									onChange={(e: any) => setRecipient(e.target.value)}
									invalid={{ status: getInvalidRecipient(), message: null }}
									disabled={false} //!!ethProvider.lastArweaveAddress
									required
									hideErrorMessage
								/>
							)}
							{lockupTimeRemaining && (
								<S.FormMessage>
									<p>{lockupTimeRemaining}</p>
								</S.FormMessage>
							)}
						</>
					)}
				</S.FormWrapper>
				<S.ActionWrapper>
					<Button
						type={'alt1'}
						label={processed ? 'Done' : errorButtonLabel || language[exchangeType]}
						handlePress={() => (processed ? handleClear() : handleSubmit())}
						icon={errorButtonLabel ? undefined : exchangeType === 'convert' ? ASSETS.exchange : ASSETS[exchangeType]}
						iconLeftAlign
						disabled={processed ? false : disabled}
						loading={loading}
						loadingText={language[`${exchangeType}-loading`]}
						height={55}
						fullWidth
					/>
				</S.ActionWrapper>
				<S.EndWrapper>
					<ExchangeInfo token={effectiveToken} />
				</S.EndWrapper>
				<S.EndActionsWrapper>
					<Button
						type={'primary'}
						label={language.close}
						handlePress={() => props.handleClose()}
						disabled={loading}
						loading={false}
					/>
				</S.EndActionsWrapper>
			</S.Wrapper>
		</>
	);
}
