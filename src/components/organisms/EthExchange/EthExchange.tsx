import React from 'react';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { Checkbox } from 'components/atoms/Checkbox';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import {
	ASSETS,
	DaiBridge_ABI,
	DaiToUsdsUpgrade_ABI,
	Erc20_ABI,
	ETH_CONTRACTS,
	StEthBridge_ABI,
	UsdsBridge_ABI,
} from 'helpers/config';
import { EthExchangeType, EthTokenEnum } from 'helpers/types';
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

	const [exchangeType, setExchangeType] = React.useState<EthExchangeType>('deposit');

	const [amount, setAmount] = React.useState<string>('0');
	const [recipient, setRecipient] = React.useState<string | null>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [invalid, setInvalid] = React.useState<boolean>(false);
	const [disabled, setDisabled] = React.useState<boolean>(false);
	const [processed, setProcessed] = React.useState<boolean>(false);
	const [lockupTimeRemaining, setLockupTimeRemaining] = React.useState<string | null>(null);
	const [layoutRefresh, setLayoutRefresh] = React.useState<number>(0);
	const [upgradeToUsds, setUpgradeToUsds] = React.useState<boolean>(false);
	const [userAskedToUpgrade, setUserAskedToUpgrade] = React.useState<boolean>(false);
	const [showUpgradeModal, setShowUpgradeModal] = React.useState<boolean>(false);

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
			case 'deposit':
				setInvalid(amountInWei > ethProvider?.tokens?.[props.token]?.balance?.value);
				break;
			case 'withdraw':
				setInvalid(amountInWei > ethProvider?.tokens?.[props.token]?.deposited?.value);
				break;
		}
	}, [amountInWei, ethProvider.tokens]);

	/* Check DAI and USDS Stake Lockup Period */
	React.useEffect(() => {
		if ((props.token === EthTokenEnum.DAI || props.token === EthTokenEnum.USDS) && exchangeType === 'withdraw') {
			const lastStake = BigInt(ethProvider?.tokens?.[props.token]?.deposited?.lastStake || 0);
			const lockupWindow = BigInt(60); // TODO: Change to 64800
			const currentTime = BigInt(Math.floor(Date.now() / 1000));
			const timeSinceLastStake = currentTime - lastStake;

			if (timeSinceLastStake <= lockupWindow) {
				const timeRemaining = lockupWindow - timeSinceLastStake;
				const hours = Number(timeRemaining / BigInt(3600));
				const minutes = Number((timeRemaining % BigInt(3600)) / BigInt(60));
				const seconds = Number(timeRemaining % BigInt(60));
				setLockupTimeRemaining(
					`${props.token.toUpperCase()} is locked, you can withdraw in (${hours}h:${minutes}m:${seconds}s)`
				);
				setDisabled(true);
				return;
			}
		} else {
			setLockupTimeRemaining(null);
		}
	}, [ethProvider.tokens, exchangeType, props.token, layoutRefresh]);

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
			case 'deposit':
				setDisabled(
					amountInWei > ethProvider?.tokens?.[props.token]?.balance?.value || !recipient || getInvalidRecipient()
				);
				break;
			case 'withdraw':
				setDisabled(amountInWei > ethProvider?.tokens?.[props.token]?.deposited?.value);
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
		props.token,
		lockupTimeRemaining,
	]);

	React.useEffect(() => {
		handleClear();
	}, [exchangeType, props.open]);

	React.useEffect(() => {
		if (props.token === EthTokenEnum.DAI && exchangeType === 'deposit') {
			setUserAskedToUpgrade(false);
		} else {
			setUpgradeToUsds(false);
			setUserAskedToUpgrade(false);
		}
	}, [props.token, exchangeType]);

	function handleAmountBlur() {
		if (
			props.token === EthTokenEnum.DAI &&
			exchangeType === 'deposit' &&
			amountInWei > BigInt(0) &&
			!userAskedToUpgrade
		) {
			setShowUpgradeModal(true);
			setUserAskedToUpgrade(true);
		}
	}

	function handleUpgradeModalConfirm() {
		setUpgradeToUsds(true);
		setShowUpgradeModal(false);
	}

	function handleUpgradeModalCancel() {
		setUpgradeToUsds(false);
		setShowUpgradeModal(false);
	}

	async function handleSubmit() {
		if (ethProvider.walletAddress && amount && amountInWei > 0) {
			setLoading(true);
			try {
				const web3 = new Web3(ethProvider.web3Provider);
				await ethProvider.ensureMainnet();

				let bridgeAddress = ETH_CONTRACTS.stEthBridge;
				let bridgeContract = new web3.eth.Contract(StEthBridge_ABI, bridgeAddress);
				let tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.stEth);
				let currentToken = props.token;

				if (props.token === EthTokenEnum.DAI) {
					bridgeAddress = ETH_CONTRACTS.daiBridge;
					bridgeContract = new web3.eth.Contract(DaiBridge_ABI, bridgeAddress);
					tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
				} else if (props.token === EthTokenEnum.USDS) {
					bridgeAddress = ETH_CONTRACTS.usdsBridge;
					bridgeContract = new web3.eth.Contract(UsdsBridge_ABI, bridgeAddress);
					tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.usds);
				}

				if (exchangeType === 'deposit' && props.token === EthTokenEnum.DAI && upgradeToUsds) {
					console.log('User opted to upgrade DAI to USDS');
					const upgradeContractAddress = ETH_CONTRACTS.daiToUsdsUpgrade;
					const upgradeContract = new web3.eth.Contract(DaiToUsdsUpgrade_ABI, upgradeContractAddress);

					// Check allowance for DAI on the upgrade contract
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

					// Perform the DAI to USDS upgrade
					const upgradeTx = await upgradeContract.methods.daiToUsds(ethProvider.walletAddress, amountInWei).send({
						from: ethProvider.walletAddress,
					});
					console.log('DAI to USDS Upgrade transaction:', upgradeTx);

					await checkTransactionReceipt(upgradeTx.transactionHash);
					console.log('DAI to USDS Upgrade transaction confirmed:', upgradeTx);

					// Update contract and token details to USDS for staking
					bridgeAddress = ETH_CONTRACTS.usdsBridge;
					bridgeContract = new web3.eth.Contract(UsdsBridge_ABI, bridgeAddress);
					tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.usds);
					currentToken = EthTokenEnum.USDS;
				}

				const poolId = 0;

				let arweaveRecipient = '0x0000000000000000000000000000000000000000000000000000000000000000';
				if (recipient && checkValidAddress(recipient)) {
					arweaveRecipient = arweaveToEVMBytes(recipient);
				}

				switch (exchangeType) {
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
							const gasEstimate = await bridgeContract.methods.stake(amountInWei, arweaveRecipient).estimateGas({
								from: ethProvider.walletAddress,
							});
							const gas = ((BigInt(gasEstimate) * BigInt(11)) / BigInt(10)).toString();
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
						if (props.token === EthTokenEnum.USDS) {
							const gasEstimate = await bridgeContract.methods.withdraw(amountInWei, arweaveRecipient).estimateGas({
								from: ethProvider.walletAddress,
							});
							const gas = ((BigInt(gasEstimate) * BigInt(11)) / BigInt(10)).toString();
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
				props.setResponse({
					message: `Successful ${exchangeType}`,
					status: 'success',
				});
				props.handleClose();
			} catch (e) {
				console.error(e);
				props.setResponse({
					message: e.message ?? 'Error occurred',
					status: 'warning',
				});
			}
			setLoading(false);
			setProcessed(true);
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
		setUpgradeToUsds(false);
		setUserAskedToUpgrade(false);
	}

	function getMaxDisabled() {
		if (loading || !ethProvider.walletAddress || lockupTimeRemaining) return true;

		switch (exchangeType) {
			case 'deposit':
				return ethProvider.tokens?.[props.token]?.balance?.value <= BigInt(0);
			case 'withdraw':
				return ethProvider.tokens?.[props.token]?.deposited?.value <= BigInt(0);
		}
	}

	function getInvalidRecipient() {
		return recipient && !checkValidAddress(recipient);
	}

	function getTabAction(type: EthExchangeType) {
		return (
			<Button
				type={'primary'}
				label={language[type]}
				handlePress={() => setExchangeType(type)}
				disabled={loading}
				active={exchangeType === type}
				icon={ASSETS[type]}
				iconLeftAlign
			/>
		);
	}

	function getFormHeader() {
		let amountToUse = null;
		switch (exchangeType) {
			case 'deposit':
				amountToUse = ethProvider?.tokens?.[props.token]?.balance;
				break;
			case 'withdraw':
				amountToUse = ethProvider?.tokens?.[props.token]?.deposited;
				break;
		}

		return (
			<S.FormHeader>
				<span>{`Deposited: ${ethProvider?.tokens?.[props.token]?.deposited?.display ?? '-'}`}</span>
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
				<S.TabsWrapper>
					{getTabAction('deposit')}
					{getTabAction('withdraw')}
				</S.TabsWrapper>
				<S.FormWrapper>
					<div onBlur={handleAmountBlur}>
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
								<ReactSVG src={ASSETS[props.token]} />
								<p>{props.token}</p>
							</S.FormFieldLabel>
						</S.Form>
					</div>
					{props.token === EthTokenEnum.DAI && exchangeType === 'deposit' && (
						<S.UpgradeCheckboxWrapper>
							<Checkbox
								checked={upgradeToUsds}
								handleSelect={() => setUpgradeToUsds(!upgradeToUsds)}
								disabled={loading}
							/>
							Upgrade to USDS (higher yield)
						</S.UpgradeCheckboxWrapper>
					)}
					{exchangeType === 'deposit' && (
						<FormField
							value={recipient}
							label={language.arweaveAddress}
							onChange={(e: any) => setRecipient(e.target.value)}
							invalid={{ status: getInvalidRecipient(), message: null }}
							disabled={loading || !ethProvider.walletAddress}
							required
							hideErrorMessage
						/>
					)}
					{lockupTimeRemaining && (
						<S.FormMessage>
							<p>{lockupTimeRemaining}</p>
						</S.FormMessage>
					)}
				</S.FormWrapper>
				<S.ActionWrapper>
					<Button
						type={'alt1'}
						label={processed ? 'Done' : exchangeType}
						handlePress={() => (processed ? handleClear() : handleSubmit())}
						icon={ASSETS[exchangeType]}
						iconLeftAlign
						disabled={processed ? false : disabled}
						loading={loading}
						height={55}
						fullWidth
					/>
				</S.ActionWrapper>
				<S.EndWrapper>
					<ExchangeInfo token={props.token} />
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

			{showUpgradeModal && (
				<Modal header="Upgrade to USDS?" handleClose={handleUpgradeModalCancel}>
					<S.ModalContentWrapper>
						<p>
							USDS offers a higher yield, resulting in greater rewards. Would you like to upgrade your DAI to USDS for
							this deposit?
						</p>
						<S.ModalActions>
							<Button type="primary" label="Yes, Upgrade" handlePress={handleUpgradeModalConfirm} />
							<Button type="alt1" label="No, Thanks" handlePress={handleUpgradeModalCancel} />
						</S.ModalActions>
					</S.ModalContentWrapper>
				</Modal>
			)}
		</>
	);
}
