import React from 'react';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { PreBridgeInfo } from 'components/organisms/PreBridgeInfo';
import { RewardsInfo } from 'components/organisms/RewardsInfo';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Arweave() {
	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

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

	const walletBalance = React.useMemo(() => {
		if (!arProvider.walletAddress) return `${formatDisplayAmount(null)} AR`;
		if (arProvider.balance === 'Error') return arProvider.balance;
		return `${formatDisplayAmount(arProvider.balance)} AR`;
	}, [arProvider.balance, arProvider.walletAddress]);

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
					<RewardsInfo chain={'arweave'} />
				</S.Content>
				<PreBridgeInfo chain={'arweave'} />
			</S.Wrapper>
		</>
	);
}
