import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { PreBridgeInfo } from 'components/organisms/PreBridgeInfo';
import { RewardsInfo } from 'components/organisms/RewardsInfo';
import { AO_ABI, ASSETS, ETH_CONTRACTS, REDIRECTS, STETH_ABI } from 'helpers/config';
import { arweaveToEVMBytes, checkValidAddress, formatDisplayAmount } from 'helpers/utils';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

const { fromWei, toWei, toBigInt } = Web3.utils;

export default function Ethereum() {
	const TABS = [{ name: 'Deposit' }, { name: 'Withdraw' }];

	const ethProvider = useEthereumProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentTab, setCurrentTab] = React.useState<any>(TABS[0]);
	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	const [stethBalance, setStethBalance] = React.useState<bigint | null>(null);
	const [depositedStethBalance, setDespositedStethBalance] = React.useState<bigint | null>(null);

	const [amount, setAmount] = React.useState<string>('0');
	const amountInWei = React.useMemo(() => {
		try {
			return toBigInt(toWei(amount, 'ether'));
		} catch {
			return BigInt(0);
		}
	}, [amount]);
	const [recipient, setRecipient] = React.useState<string | null>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [response, setResponse] = React.useState<{ message: string | null; status: 'success' | 'warning' } | null>(
		null
	);
	const [invalid, setInvalid] = React.useState<boolean>(false);
	const [disabled, setDisabled] = React.useState<boolean>(false);
	const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);

	function handleClear() {
		setAmount('0');
		setLoading(false);
		setResponse(null);
	}

	React.useEffect(() => {
		handleClear();
	}, [currentTab]);

	React.useEffect(() => {
		if (amountInWei < 0) setInvalid(true);
		else {
			if (currentTab.name === 'Deposit') {
				setInvalid(amountInWei > stethBalance);
			} else if (currentTab.name === 'Withdraw') {
				setInvalid(amountInWei > depositedStethBalance);
			} else {
				setDisabled(false);
			}
		}
	}, [amount, stethBalance, depositedStethBalance, currentTab]);

	React.useEffect(() => {
		if (invalid || loading || !ethProvider.walletAddress || amountInWei <= 0 || response !== null) setDisabled(true);
		else {
			if (currentTab.name === 'Deposit') {
				setDisabled(amountInWei > stethBalance || !checkValidAddress(recipient));
			} else if (currentTab.name === 'Withdraw') {
				setDisabled(amountInWei > depositedStethBalance);
			} else {
				setDisabled(false);
			}
		}
	}, [
		loading,
		ethProvider.walletAddress,
		invalid,
		amount,
		response,
		stethBalance,
		depositedStethBalance,
		currentTab,
		recipient,
	]);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 200);
	}, [ethProvider.walletAddress]);

	React.useEffect(() => {
		if (!showWallet) {
			setLabel(`${language.fetching}...`);
		} else {
			if (ethProvider.walletAddress) {
				setLabel(currentTab.name === 'Deposit' ? language.deposit : language.withdraw);
			} else {
				setLabel(language.connectWallet);
			}
		}
	}, [currentTab, showWallet, ethProvider.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (ethProvider.walletAddress) {
				const web3 = new Web3(ethProvider.web3Provider);

				try {
					const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);

					const balanceOf = await stethContract.methods.balanceOf(ethProvider.walletAddress).call();
					setStethBalance(balanceOf as unknown as bigint);
				} catch (e: any) {
					console.error(e);
					setStethBalance('Error' as any);
				}

				try {
					const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);

					const usersData = await aoContract.methods.usersData(ethProvider.walletAddress, 0).call();
					setDespositedStethBalance((usersData as any).deposited as bigint);
				} catch (e: any) {
					console.error(e);
					setDespositedStethBalance('Error' as any);
				}
			} else {
				setStethBalance(null);
				setDespositedStethBalance(null);
				handleClear();
			}
		})();
	}, [ethProvider.walletAddress, toggleUpdate]);

	const handleRecipientPaste = async () => {
		if (!navigator.clipboard || !navigator.clipboard.readText) {
			console.error('Clipboard API not supported');
			return;
		}
		try {
			const clipboardText = await navigator.clipboard.readText();
			setRecipient(clipboardText);
		} catch (error) {
			console.error(error);
		}
	};

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

	async function handleSubmit() {
		if (ethProvider.walletAddress && amount && amountInWei > 0) {
			// console.log("📜 LOG > handleSubmit > amount:", typeof amount, amount);
			// console.log("📜 LOG > handleSubmit > amountInWei:", typeof amountInWei, amountInWei);

			setLoading(true);
			try {
				const web3 = new Web3(ethProvider.web3Provider);
				await ethProvider.ensureMainnet();

				const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);
				const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);

				const poolId = 0;

				let arweaveRecipient = '0x0000000000000000000000000000000000000000000000000000000000000000';
				if (recipient && checkValidAddress(recipient)) {
					arweaveRecipient = arweaveToEVMBytes(recipient);
				}

				switch (currentTab.name) {
					case 'Deposit':
						const allowance = await stethContract.methods.allowance(ethProvider.walletAddress, ETH_CONTRACTS.ao).call();
						if (Number(allowance) < Number(amountInWei)) {
							const approval = await stethContract.methods.approve(ETH_CONTRACTS.ao, amountInWei).send({
								from: ethProvider.walletAddress,
							});
							console.log('Approval transaction:', approval);
							const approvalReceipt = await checkTransactionReceipt(approval.transactionHash);
							if (!approvalReceipt || !approvalReceipt.status) {
								throw new Error('Approval failed');
							}
						}

						const stake = await aoContract.methods.stake(poolId, amountInWei, arweaveRecipient).send({
							from: ethProvider.walletAddress,
						});
						console.log('Stake transaction:', stake);
						break;
					case 'Withdraw':
						const withdraw = await aoContract.methods.withdraw(poolId, amountInWei, arweaveRecipient).send({
							from: ethProvider.walletAddress,
						});
						console.log('Withdraw transaction:', withdraw);
						break;
				}

				setToggleUpdate(!toggleUpdate);
				setAmount('0');
				setResponse({
					message: `Successful ${currentTab.name}`,
					status: 'success',
				});
			} catch (e) {
				console.error(e);
				setResponse({
					message: e.message ?? 'Error occurred',
					status: 'warning',
				});
			}
			setLoading(false);
		}
	}

	const depositedBalance = React.useMemo(() => {
		if ((depositedStethBalance as any) === 'Error') return String(depositedStethBalance);
		if (depositedStethBalance && depositedStethBalance > 0) {
			const calcAmount = fromWei(depositedStethBalance, 'ether');
			return `${formatDisplayAmount(calcAmount)} ${language.steth}`;
		}
		return `0 ${language.steth}`;
	}, [depositedStethBalance, language]);

	const formFieldAction = React.useMemo(() => {
		if (!currentTab) return null;

		let balance: bigint;
		let action: () => void;

		switch (currentTab.name) {
			case 'Deposit':
				balance = stethBalance;
				action = () => setAmount(fromWei(stethBalance, 'ether'));
				break;
			case 'Withdraw':
				balance = depositedStethBalance;
				action = () => setAmount(fromWei(stethBalance, 'ether'));
				break;
		}

		return (
			<S.FormFieldAction>
				<span>{`Balance: ${
					balance && (balance as any) !== 'Error' ? formatDisplayAmount(fromWei(balance, 'ether')) : '-'
				}`}</span>
				<button
					disabled={loading || !ethProvider.walletAddress || !balance || (balance as any) === 'Error'}
					onClick={action}
				>
					<span>{language.max}</span>
				</button>
			</S.FormFieldAction>
		);
	}, [currentTab, stethBalance, depositedStethBalance]);

	return (
		<>
			<S.Wrapper className={'pre-bridge-wrapper'}>
				<S.Content className={'pre-bridge-content'}>
					<S.S1Content className={'border-wrapper-alt2'}>
						<S.TabsWrapper>
							<S.TabsHeader>
								<Button
									type={'primary'}
									label={TABS[0].name}
									handlePress={() => setCurrentTab(TABS[0])}
									active={currentTab.name === TABS[0].name}
									disabled={loading}
									height={40}
								/>
								<Button
									type={'primary'}
									label={TABS[1].name}
									handlePress={() => setCurrentTab(TABS[1])}
									active={currentTab.name === TABS[1].name}
									disabled={loading}
									height={40}
								/>
							</S.TabsHeader>
							<S.TabContent>
								<S.ActionWrapper>
									<S.Form invalid={invalid}>
										<FormField
											type={'number'}
											value={amount}
											onChange={(e: any) => setAmount(e.target.value)}
											invalid={{ status: invalid, message: null }}
											disabled={loading || !ethProvider.walletAddress}
											hideErrorMessage
										/>
										{formFieldAction}
										<S.FormFieldLabel disabled={loading || !ethProvider.walletAddress}>
											<ReactSVG src={ASSETS.eth} />
											<p>{language.steth}</p>
											<S.DropdownArrow disabled={loading || !ethProvider.walletAddress}>
												<ReactSVG src={ASSETS.arrow} />
											</S.DropdownArrow>
										</S.FormFieldLabel>
									</S.Form>
									{currentTab.name === 'Deposit' && (
										<>
											<S.FormEndWrapper>
												<S.ConversionLink>
													<Link to={REDIRECTS.stethConversion} target={'_blank'}>
														{language.stethConversion}
													</Link>
													•
													<Link to={REDIRECTS.stethMinting} target={'_blank'}>
														{language.stethMinting}
													</Link>
												</S.ConversionLink>
											</S.FormEndWrapper>
											<FormField
												value={recipient}
												label={language.arweaveAddress}
												onChange={(e: any) => setRecipient(e.target.value)}
												invalid={{ status: recipient && !checkValidAddress(recipient), message: null }}
												disabled={loading || !ethProvider.walletAddress}
												required={true}
												hideErrorMessage
											/>
											<S.RecipientActions>
												<Button
													type={'alt1'}
													label={language.pasteFromClipboard}
													handlePress={handleRecipientPaste}
													disabled={loading || !ethProvider.walletAddress}
													height={35}
												/>
											</S.RecipientActions>
										</>
									)}
								</S.ActionWrapper>
							</S.TabContent>
						</S.TabsWrapper>
						<S.Action>
							<Button
								type={'alt1'}
								label={label}
								handlePress={() =>
									ethProvider.walletAddress ? handleSubmit() : ethProvider.setWalletModalVisible(true)
								}
								disabled={ethProvider.walletAddress ? disabled : false}
								loading={loading}
								height={52.5}
								width={350}
							/>
						</S.Action>
						{loading && (
							<S.LoadingWrapper>
								<span>{`${language.executing} ${currentTab.name}...`}</span>
								<S.Loader>
									<Loader xSm relative />
								</S.Loader>
							</S.LoadingWrapper>
						)}
						<S.PrimaryAmount className={'border-wrapper-alt1'}>
							<span>{language.depositedSteth}</span>
							<h2 className={'fade-in'}>{depositedBalance}</h2>
							{ethProvider.walletAddress !== null && depositedStethBalance === null && (
								<S.WalletLoadingWrapper>
									<span>{`${language.fetching}...`}</span>
									<S.Loader>
										<Loader xSm relative />
									</S.Loader>
								</S.WalletLoadingWrapper>
							)}
						</S.PrimaryAmount>
					</S.S1Content>
					<RewardsInfo chain={'ethereum'} toggleUpdate={toggleUpdate} />
				</S.Content>
				<PreBridgeInfo chain={'ethereum'} />
			</S.Wrapper>
			{response && <Notification message={response.message} type={response.status} callback={handleClear} />}
		</>
	);
}
