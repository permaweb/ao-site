import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Notification } from 'components/atoms/Notification';
import { Select } from 'components/atoms/Select';
import { PreBridgeInfo } from 'components/organisms/PreBridgeInfo';
import WalletConnectionStatus from 'components/organisms/WalletConnectionStatus/WalletConnectionStatus';
import { ASSETS, DaiBridge_ABI, Erc20_ABI, ETH_CONTRACTS, REDIRECTS, StEthBridge_ABI, URLS } from 'helpers/config';
import { SelectOptionType } from 'helpers/types';
import { arweaveToEVMBytes, checkValidAddress, formatDisplayAmount } from 'helpers/utils';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

const { fromWei, toWei, toBigInt } = Web3.utils;

const selectOptions: SelectOptionType[] = [
	{
		id: 'stETH',
		label: 'stETH',
		icon: <ReactSVG src={ASSETS.stEth} />,
	},
	{
		id: 'DAI',
		label: 'DAI',
		icon: <ReactSVG src={ASSETS.dai} />,
	},
];

export default function Ethereum() {
	const TABS = [{ name: 'Deposit' }, { name: 'Withdraw' }];

	const ethProvider = useEthereumProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const location = useLocation();

	const [currentTab, setCurrentTab] = React.useState<(typeof TABS)[number]>(
		location.pathname.includes(URLS.deposit) ? TABS[0] : TABS[1]
	);
	const [selectedAsset, setSelectedAsset] = React.useState<SelectOptionType>(
		location.search.toLowerCase().includes('dai') ? selectOptions[1] : selectOptions[0]
	);

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	const [daiBalance, setDaiBalance] = React.useState<bigint | null>(null);
	const [depositedDaiBalance, setDepositedDaiBalance] = React.useState<bigint | null>(null);

	const [stEthBalance, setStEthBalance] = React.useState<bigint | null>(null);
	const [depositedStEthBalance, setDepositedStEthBalance] = React.useState<bigint | null>(null);

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
				const balance = selectedAsset.id === 'stETH' ? stEthBalance : daiBalance;
				setInvalid(amountInWei > balance);
			} else if (currentTab.name === 'Withdraw') {
				const balance = selectedAsset.id === 'stETH' ? depositedStEthBalance : depositedDaiBalance;
				setInvalid(amountInWei > balance);
			} else {
				setDisabled(false);
			}
		}
	}, [amount, stEthBalance, depositedStEthBalance, currentTab, selectedAsset, daiBalance, depositedDaiBalance]);

	React.useEffect(() => {
		if (invalid || loading || !ethProvider.walletAddress || amountInWei <= 0 || response !== null) setDisabled(true);
		else {
			if (currentTab.name === 'Deposit') {
				const balance = selectedAsset.id === 'stETH' ? stEthBalance : daiBalance;
				setDisabled(amountInWei > balance || !checkValidAddress(recipient));
			} else if (currentTab.name === 'Withdraw') {
				const balance = selectedAsset.id === 'stETH' ? depositedStEthBalance : depositedDaiBalance;
				setDisabled(amountInWei > balance);
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
		stEthBalance,
		depositedStEthBalance,
		currentTab,
		recipient,
		selectedAsset,
		daiBalance,
		depositedDaiBalance,
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
		if (ethProvider.walletAddress) {
			const web3 = new Web3(ethProvider.web3Provider);

			const stEthContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.stEth);
			stEthContract.methods
				.balanceOf(ethProvider.walletAddress)
				.call()
				.then((balance) => {
					setStEthBalance(balance as unknown as bigint);
				})
				.catch((e: any) => {
					console.error(e);
					setStEthBalance('Error' as any);
				});

			const stEthBridgeContract = new web3.eth.Contract(StEthBridge_ABI, ETH_CONTRACTS.stEthBridge);
			stEthBridgeContract.methods
				.usersData(ethProvider.walletAddress, 0)
				.call()
				.then((usersData) => {
					setDepositedStEthBalance((usersData as any).deposited as bigint);
				})
				.catch((e: any) => {
					console.error(e);
					setDepositedStEthBalance('Error' as any);
				});

			const daiContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
			daiContract.methods
				.balanceOf(ethProvider.walletAddress)
				.call()
				.then((balance) => {
					setDaiBalance(balance as unknown as bigint);
				})
				.catch((e: any) => {
					console.error(e);
					setDaiBalance('Error' as any);
				});

			const daiBridgeContract = new web3.eth.Contract(DaiBridge_ABI, ETH_CONTRACTS.daiBridge);
			daiBridgeContract.methods
				.usersData(ethProvider.walletAddress, 0)
				.call()
				.then((usersData) => {
					setDepositedDaiBalance((usersData as any).deposited as bigint);
				})
				.catch((e: any) => {
					console.error(e);
					setDepositedDaiBalance('Error' as any);
				});
		} else {
			setStEthBalance(null);
			setDepositedStEthBalance(null);
			setDaiBalance(null);
			setDepositedDaiBalance(null);
			handleClear();
		}
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
			setLoading(true);
			try {
				const web3 = new Web3(ethProvider.web3Provider);
				await ethProvider.ensureMainnet();

				let bridgeAddress = ETH_CONTRACTS.stEthBridge;
				let bridgeContract = new web3.eth.Contract(StEthBridge_ABI, bridgeAddress);
				let tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.stEth);

				if (selectedAsset.id === 'DAI') {
					bridgeAddress = ETH_CONTRACTS.daiBridge;
					bridgeContract = new web3.eth.Contract(DaiBridge_ABI, bridgeAddress);
					tokenContract = new web3.eth.Contract(Erc20_ABI, ETH_CONTRACTS.dai);
				}

				const poolId = 0;

				let arweaveRecipient = '0x0000000000000000000000000000000000000000000000000000000000000000';
				if (recipient && checkValidAddress(recipient)) {
					arweaveRecipient = arweaveToEVMBytes(recipient);
				}

				switch (currentTab.name) {
					case 'Deposit':
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
						}

						const stake = await bridgeContract.methods.stake(poolId, amountInWei, arweaveRecipient).send({
							from: ethProvider.walletAddress,
						});
						console.log('Stake transaction:', stake);
						break;
					case 'Withdraw':
						const withdraw = await bridgeContract.methods.withdraw(poolId, amountInWei, arweaveRecipient).send({
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

	const formFieldAction = React.useMemo(() => {
		if (!currentTab) return null;

		let balance: bigint;
		let deposited: bigint = BigInt(0);
		let action: () => void;

		switch (currentTab.name) {
			case 'Deposit':
				balance = selectedAsset.id === 'stETH' ? stEthBalance : daiBalance;
				deposited = selectedAsset.id === 'stETH' ? depositedStEthBalance : depositedDaiBalance;
				action = () => setAmount(fromWei(balance, 'ether'));
				break;
			case 'Withdraw':
				balance = selectedAsset.id === 'stETH' ? depositedStEthBalance : depositedDaiBalance;
				action = () => setAmount(fromWei(balance, 'ether'));
				break;
		}

		return (
			<>
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
				{currentTab.name === 'Deposit' && (
					<S.FormFieldInfo>
						<span>{`Deposited: ${
							deposited && (deposited as any) !== 'Error' ? formatDisplayAmount(fromWei(deposited, 'ether')) : '0'
						}`}</span>
					</S.FormFieldInfo>
				)}
			</>
		);
	}, [currentTab, stEthBalance, depositedStEthBalance, selectedAsset, daiBalance, depositedDaiBalance]);

	const navigate = useNavigate();

	return (
		<S.PageWrapper>
			<WalletConnectionStatus />
			<S.Wrapper className={'pre-bridge-wrapper'}>
				<S.Content className={'pre-bridge-content'}>
					<S.TabsWrapper>
						<S.TabsHeader>
							<Button
								type={'primary'}
								label={TABS[0].name}
								handlePress={() => {
									setCurrentTab(TABS[0]);
									navigate(`${URLS.deposit}?asset=${selectedAsset.id}`, { replace: true });
								}}
								active={currentTab.name === TABS[0].name}
								disabled={loading}
								height={40}
							/>
							<Button
								type={'primary'}
								label={TABS[1].name}
								handlePress={() => {
									setCurrentTab(TABS[1]);
									navigate(`${URLS.withdraw}?asset=${selectedAsset.id}`, { replace: true });
								}}
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
										<Select
											setActiveOption={(option) => {
												setSelectedAsset(option);
												navigate(`${currentTab.name === 'Deposit' ? URLS.deposit : URLS.withdraw}?asset=${option.id}`, {
													replace: true,
												});
											}}
											activeOption={selectedAsset}
											options={selectOptions}
										/>
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
										<S.FormFieldWrapper>
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
										</S.FormFieldWrapper>
										{/* <RewardsInfo chain={'ethereum'} toggleUpdate={toggleUpdate} /> */}
									</>
								)}
							</S.ActionWrapper>
						</S.TabContent>
					</S.TabsWrapper>
					<S.Action>
						<Button
							type={'accent'}
							label={label}
							handlePress={() => (ethProvider.walletAddress ? handleSubmit() : ethProvider.setWalletModalVisible(true))}
							disabled={ethProvider.walletAddress ? disabled : false}
							loading={loading}
							height={74}
							width={350}
						/>
					</S.Action>
					<PreBridgeInfo />
				</S.Content>
			</S.Wrapper>
			{response && <Notification message={response.message} type={response.status} callback={handleClear} />}
		</S.PageWrapper>
	);
}
