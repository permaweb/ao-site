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

const DENOMINATION = Math.pow(10, 18);

export default function Ethereum() {
	const TABS = [{ name: 'Deposit' }, { name: 'Withdraw' }];

	const ethProvider = useEthereumProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentTab, setCurrentTab] = React.useState<any>(TABS[0]);
	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	const [stethBalance, setStethBalance] = React.useState<number | null>(null);
	const [depositedStethBalance, setDespositedStethBalance] = React.useState<number | null>(null);

	const [amount, setAmount] = React.useState<number>(0);
	const [recipient, setRecipient] = React.useState<string | null>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [response, setResponse] = React.useState<{ message: string | null; status: 'success' | 'warning' } | null>(
		null
	);
	const [invalid, setInvalid] = React.useState<boolean>(false);
	const [disabled, setDisabled] = React.useState<boolean>(false);
	const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);

	function handleClear() {
		setAmount(0);
		setLoading(false);
		setResponse(null);
	}

	React.useEffect(() => {
		handleClear();
	}, [currentTab]);

	React.useEffect(() => {
		if (amount < 0) setInvalid(true);
		else {
			if (currentTab.name === 'Deposit') {
				setInvalid(Number(amount) * DENOMINATION > stethBalance);
			} else if (currentTab.name === 'Withdraw') {
				setInvalid(Number(amount) * DENOMINATION > depositedStethBalance);
			} else {
				setDisabled(false);
			}
		}
	}, [amount, stethBalance, depositedStethBalance, currentTab]);

	React.useEffect(() => {
		if (invalid || loading || !ethProvider.walletAddress || amount <= 0 || response !== null) setDisabled(true);
		else {
			if (currentTab.name === 'Deposit') {
				setDisabled(Number(amount) * DENOMINATION > stethBalance || !checkValidAddress(recipient));
			} else if (currentTab.name === 'Withdraw') {
				setDisabled(Number(amount) * DENOMINATION > depositedStethBalance);
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
				setLabel(language.submit);
			} else {
				setLabel(language.connectWallet);
			}
		}
	}, [showWallet, ethProvider.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (ethProvider.walletAddress) {
				const web3 = new Web3(window.ethereum);
				await window.ethereum.enable();

				try {
					const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);

					const balanceOf = await stethContract.methods.balanceOf(ethProvider.walletAddress).call();
					const formattedBalance = Web3.utils.toWei(balanceOf as any, 'ether') as any;

					setStethBalance(formattedBalance / DENOMINATION);
				} catch (e: any) {
					console.error(e);
					setStethBalance('Error' as any);
				}

				try {
					const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);

					const usersData = await aoContract.methods.usersData(ethProvider.walletAddress, 0).call();
					setDespositedStethBalance((Web3.utils.toWei((usersData as any).deposited, 'ether') as any) / DENOMINATION);
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
		const web3 = new Web3(window.ethereum);
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

	function getSendAmount(amount: string) {
		if (/^\d{1,3}(\.\d{3})*(,\d+)?$/.test(amount)) {
			amount = amount.replace(/\./g, '').replace(',', '.');
		} else if (/^\d{1,3}(,\d{3})*(\.\d+)?$/.test(amount)) {
			amount = amount.replace(/,/g, '');
		} else if (/^\d{1,3}(\.\d{3})*(\.\d+)?$/.test(amount)) {
			amount = amount.replace(/\./g, '');
		} else if (/^\d{1,3}(,\d{3})*(,\d+)?$/.test(amount)) {
			amount = amount.replace(/,/g, '').replace(/\./g, '');
		}
		
		let numberAmount = parseFloat(amount);
		let formattedAmount = numberAmount.toString();
		const sendAmount = Web3.utils.toWei(formattedAmount, 'ether');
	
		return sendAmount;
	}

	async function handleSubmit() {
		if (ethProvider.walletAddress && amount && amount > 0) {
			setLoading(true);
			try {
				const web3 = new Web3(window.ethereum);
				await window.ethereum.enable();

				const aoContract = new web3.eth.Contract(AO_ABI, ETH_CONTRACTS.ao);
				const stethContract = new web3.eth.Contract(STETH_ABI, ETH_CONTRACTS.steth);

				const poolId = 0;
				const sendAmount = getSendAmount(amount.toString());

				let arweaveRecipient = '0x0000000000000000000000000000000000000000000000000000000000000000';
				if (recipient && checkValidAddress(recipient)) {
					arweaveRecipient = arweaveToEVMBytes(recipient);
				}

				switch (currentTab.name) {
					case 'Deposit':
						const approval = await stethContract.methods.approve(ETH_CONTRACTS.ao, sendAmount).send({
							from: ethProvider.walletAddress,
						});

						console.log('Approval transaction:', approval);

						const approvalReceipt = await checkTransactionReceipt(approval.transactionHash);
						if (approvalReceipt && approvalReceipt.status) {
							const stake = await aoContract.methods.stake(poolId, sendAmount, arweaveRecipient).send({
								from: ethProvider.walletAddress,
							});
							console.log('Stake transaction:', stake);
						} else {
							throw new Error('Approval failed');
						}
						break;
					case 'Withdraw':
						const withdraw = await aoContract.methods.withdraw(poolId, sendAmount, arweaveRecipient).send({
							from: ethProvider.walletAddress,
						});
						console.log('Withdraw transaction:', withdraw);
						break;
				}

				setToggleUpdate(!toggleUpdate);
				setAmount(0);
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
		if ((depositedStethBalance as any) === 'Error') return depositedStethBalance;
		if (depositedStethBalance && depositedStethBalance > 0) {
			const calcAmount = depositedStethBalance / DENOMINATION;
			return `${formatDisplayAmount(calcAmount)} ${language.steth}`;
		}
		return `${formatDisplayAmount(depositedStethBalance)} ${language.steth}`;
	}, [depositedStethBalance, language]);

	const formFieldAction = React.useMemo(() => {
		if (!currentTab) return null;

		let balance: number;
		let action: () => void;

		switch (currentTab.name) {
			case 'Deposit':
				balance = stethBalance;
				action = () => setAmount(stethBalance / DENOMINATION);
				break;
			case 'Withdraw':
				balance = depositedStethBalance;
				action = () => setAmount(depositedStethBalance / DENOMINATION);
				break;
		}

		return (
			<S.FormFieldAction>
				<span>{`Balance: ${
					balance && (balance as any) !== 'Error' ? formatDisplayAmount(balance / DENOMINATION) : '-'
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
					<RewardsInfo chain={'ethereum'} />
				</S.Content>
				<PreBridgeInfo chain={'ethereum'} />
			</S.Wrapper>
			{response && <Notification message={response.message} type={response.status} callback={handleClear} />}
		</>
	);
}
