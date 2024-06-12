import React from 'react';

import { readHandler } from 'api';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { PreBridgeInfo } from 'components/organisms/PreBridgeInfo';
import { RewardsInfo } from 'components/organisms/RewardsInfo';
import { AO } from 'helpers/config';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
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

	const [fetchingReward, setFetchingReward] = React.useState<boolean>(false);

	// ARMS
	const [dailyReward, setDailyReward] = React.useState<number | null>(null);
	
	const [credBalance, setCredBalance] = React.useState<number | string | null>(null);
	const [depositedCred, setDepositedCred] = React.useState<number | string | null>(null);

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
				} catch (e: any) {
					console.error(e);
				}
				try {
					const credResponse = await readHandler({
						processId: AO.cred,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: arProvider.walletAddress }],
					});
					if (credResponse !== null) setCredBalance(credResponse / DENOMINATION);
					
				} catch (e: any) {
					console.error(e);
					setCredBalance('Error');
				}
				try {
					const depositedCredResponse = await readHandler({
						processId: AO.credLocker,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: arProvider.walletAddress }],
					});
					if (depositedCredResponse !== null) setDepositedCred(depositedCredResponse / DENOMINATION);
				} catch (e: any) {
					console.error(e);
					setCredBalance('Error');
				}
			} else {
				setDailyReward(null);
			}
		})();
	}, [arProvider.walletAddress]);

	const credBalanceDisplay = React.useMemo(() => {
		if (!credBalance) return `${formatDisplayAmount(null)} CRED`;
		if (credBalance === 'Error') return credBalance;
		return `${formatDisplayAmount(credBalance)} CRED`;
	}, [credBalance, arProvider.walletAddress]);

	const depositedCredBalanceDisplay = React.useMemo(() => {
		if (!depositedCred) return `${formatDisplayAmount(null)} CRED`;
		if (depositedCred === 'Error') return depositedCred;
		return `${formatDisplayAmount(depositedCred)} CRED`;
	}, [depositedCred, arProvider.walletAddress]);

	const action = React.useMemo(() => {
		let action = () => arProvider.setWalletModalVisible(true);
		if (arProvider.walletAddress) {
			action = () => arProvider.handleDisconnect();
		}
		return action;
	}, [arProvider.walletAddress]);

	return (
		<S.Wrapper className={'pre-bridge-wrapper'}>
			<S.Content className={'pre-bridge-content'}>
				<S.S1Content className={'border-wrapper-alt2'}>
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
						<span>{language.credBalance}</span>
						<h2 className={'fade-in'}>{credBalanceDisplay}</h2>
						{arProvider.walletAddress !== null && credBalance === null && (
							<S.WalletLoadingWrapper>
								<span>{`${language.fetching}...`}</span>
								<S.Loader>
									<Loader xSm relative />
								</S.Loader>
							</S.WalletLoadingWrapper>
						)}
					</S.PrimaryAmount>
					<S.PrimaryAmount className={'border-wrapper-alt1'}>
						<span>{language.depositedCred}</span>
						<h2 className={'fade-in'}>{depositedCredBalanceDisplay}</h2>
						{arProvider.walletAddress !== null && depositedCred === null && (
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
	);
}
