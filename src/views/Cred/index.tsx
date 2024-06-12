import React from 'react';

import { messageResults, readHandler } from 'api';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { PreBridgeInfo } from 'components/organisms/PreBridgeInfo';
import { AO } from 'helpers/config';
import { formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

const DENOMINATION = Math.pow(10, 3);

export default function Cred() {
	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	const [credBalance, setCredBalance] = React.useState<number | string | null>(null);
	const [depositedCred, setDepositedCred] = React.useState<number | string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [response, setResponse] = React.useState<{ message: string | null; status: 'success' | 'warning' } | null>(
		null
	);
	const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
	const [updating, setUpdating] = React.useState<boolean>(false);

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
				if (credBalance !== null && credBalance !== 'Error') {
					setLabel(`${language.deposit} ${credBalance} CRED`);
				} else {
					setLabel(`${language.fetching}...`);
				}
			} else {
				setLabel(language.connectWallet);
			}
		}
	}, [showWallet, arProvider.walletAddress, credBalance]);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress) {
				setUpdating(true);
				try {
					const credResponse = await readHandler({
						processId: AO.cred,
						action: 'Balance',
						tags: [{ name: 'Target', value: arProvider.walletAddress }],
					});
					if (credResponse !== null) setCredBalance(credResponse / DENOMINATION);
				} catch (e: any) {
					console.error(e);
					setCredBalance('Error');
				}
				try {
					const depositedCredResponse = await readHandler({
						processId: AO.aoClaim,
						action: 'Balance',
						tags: [{ name: 'Target', value: arProvider.walletAddress }],
					});
					if (depositedCredResponse !== null) setDepositedCred(depositedCredResponse / DENOMINATION);
				} catch (e: any) {
					console.error(e);
					setCredBalance('Error');
				}
				setUpdating(false);
			} else {
				setCredBalance(null);
				setDepositedCred(null);
			}
		})();
	}, [arProvider.walletAddress, toggleUpdate]);

	async function handleSubmit() {
		if (arProvider.walletAddress && credBalance && credBalance !== 'Error' && Number(credBalance) > 0) {
			setLoading(true);
			try {
				const sendAmount = Number(credBalance) * DENOMINATION;

				const transferResponse = await messageResults({
					processId: AO.cred,
					wallet: arProvider.wallet,
					action: 'Transfer',
					tags: [
						{ name: 'Recipient', value: AO.aoClaim },
						{ name: 'Quantity', value: sendAmount.toString() },
					],
					responses: ['Credit-Notice'],
					data: null,
				});

				console.log(transferResponse);

				if (transferResponse) {
					setUpdating(true);
					setToggleUpdate(!toggleUpdate);
					setResponse({
						message: `Successful Deposit`,
						status: 'success',
					});
				}
			} catch (e: any) {
				console.error(e);
				setResponse({
					message: e.message ?? 'Error occurred',
					status: 'warning',
				});
			}
			setLoading(false);
		}
	}

	const credBalanceDisplay = React.useMemo(() => {
		if (credBalance === null) return `${formatDisplayAmount(null)} CRED`;
		if (credBalance === 'Error') return credBalance;
		return `${formatDisplayAmount(credBalance)} CRED`;
	}, [credBalance, arProvider.walletAddress]);

	const depositedCredBalanceDisplay = React.useMemo(() => {
		if (depositedCred === null) return `${formatDisplayAmount(null)} AO`;
		if (depositedCred === 'Error') return depositedCred;

		const calcAmount = Number(depositedCred) / DENOMINATION;
		return `${formatDisplayAmount(calcAmount)} AO`;
	}, [depositedCred, arProvider.walletAddress]);

	const action = React.useMemo(() => {
		let action = () => arProvider.setWalletModalVisible(true);
		if (arProvider.walletAddress && credBalance && credBalance !== 'Error') {
			action = () => handleSubmit();
		}
		return action;
	}, [arProvider.walletAddress, credBalance]);

	return (
		<>
			<S.Wrapper className={'pre-bridge-wrapper'}>
				<S.Content className={'pre-bridge-content'}>
					<S.S1Content className={'border-wrapper-alt2'}>
						<S.Action>
							<Button
								type={'alt1'}
								label={label}
								handlePress={action}
								disabled={
									arProvider.walletAddress
										? !credBalance || credBalance === 'Error' || loading || updating
										: loading || updating
								}
								loading={loading}
								height={55}
								width={350}
							/>
						</S.Action>
						<S.PrimaryAmount className={'border-wrapper-alt1'}>
							<span>{language.credBalance}</span>
							<h2 className={'fade-in'}>{credBalanceDisplay}</h2>
							{arProvider.walletAddress !== null && (credBalance === null || updating) && (
								<S.WalletLoadingWrapper>
									<span>{`${language.fetching}...`}</span>
									<S.Loader>
										<Loader xSm relative />
									</S.Loader>
								</S.WalletLoadingWrapper>
							)}
							{loading && (
								<S.WalletLoadingWrapper>
									<span>{`${language.executing}...`}</span>
									<S.Loader>
										<Loader xSm relative />
									</S.Loader>
								</S.WalletLoadingWrapper>
							)}
						</S.PrimaryAmount>
						<S.PrimaryAmount className={'border-wrapper-alt1'}>
							<span>{language.aoClaim}</span>
							<h2 className={'fade-in'}>{depositedCredBalanceDisplay}</h2>
							{arProvider.walletAddress !== null && (depositedCred === null || updating) && (
								<S.WalletLoadingWrapper>
									<span>{`${language.fetching}...`}</span>
									<S.Loader>
										<Loader xSm relative />
									</S.Loader>
								</S.WalletLoadingWrapper>
							)}
						</S.PrimaryAmount>
					</S.S1Content>
				</S.Content>
				<PreBridgeInfo chain={'arweave'} />
			</S.Wrapper>
			{response && (
				<Notification message={response.message} type={response.status} callback={() => setResponse(null)} />
			)}
		</>
	);
}
