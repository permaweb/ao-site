import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { EllipsisLoader } from 'components/atoms/EllipsisLoader';
import { ASSETS } from 'helpers/config';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';

import * as S from './styles';
import { IProps } from './types';

// TODO: Redirects
export default function BalanceSection(props: IProps) {
	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();

	const [token, setToken] = React.useState<{
		header: string;
		ticker: string;
		wallet: { label: string; provider: any };
		balance: { header: string; icon: string };
		redirect?: { label: string; target: string };
	} | null>(null);

	const tokens = React.useMemo(() => {
		return {
			ao: {
				header: 'Your AO',
				ticker: 'AO',
				wallet: { label: 'Connect Arweave Wallet', provider: arProvider },
				balance: { header: 'Current Balance', icon: ASSETS.ao },
			},
			arweave: {
				header: 'Arweave',
				ticker: 'AR',
				wallet: { label: 'Connect Arweave Wallet', provider: arProvider },
				balance: { header: 'Current Balance', icon: ASSETS.arweave },
				redirect: { label: 'Buy AR', target: '#' },
			},
			stEth: {
				header: 'Deposited stETH',
				ticker: 'StETH',
				wallet: { label: 'Connect ETH Wallet', provider: ethProvider },
				balance: { header: 'Amount Deposited', icon: ASSETS.stEth },
				redirect: { label: 'Deposit StETH', target: '#' },
			},
			dai: {
				header: 'Deposited DAI',
				ticker: 'DAI',
				wallet: { label: 'Connect ETH Wallet', provider: ethProvider },
				balance: { header: 'Amount Deposited', icon: ASSETS.dai },
				redirect: { label: 'Desposit DAI', target: '#' },
			},
		};
	}, [arProvider, ethProvider]);

	React.useEffect(() => {
		switch (props.type) {
			case 'ao':
				setToken({ ...tokens.ao });
				break;
			case 'arweave':
				setToken({ ...tokens.arweave });
				break;
			case 'stEth':
				setToken({ ...tokens.stEth });
				break;
			case 'dai':
				setToken({ ...tokens.dai });
				break;
			default:
				break;
		}
	}, [props.type, tokens]);

	React.useEffect(() => {
		setToken((prev) => ({
			...prev,
			provider: token?.wallet?.provider ?? null,
		}));
	}, [token?.wallet?.provider]);

	// TODO: Handle disconnect
	function handleWalletPress() {
		if (!token.wallet.provider.walletAddress) {
			token.wallet.provider.setWalletModalVisible(true);
			return;
		}
	}

	function getWalletLabel() {
		if (token.wallet.provider.walletAddress) {
			return formatAddress(token.wallet.provider.walletAddress, false);
		}

		return token.wallet.label;
	}

	function getPrimaryBalance() {
		if (!token.wallet?.provider?.walletAddress) return '-';
		switch (props.type) {
			case 'ao':
				if (token.wallet?.provider?.aoBalance) return formatDisplayAmount(token.wallet.provider.aoBalance);
				return <EllipsisLoader />;
			case 'arweave':
				if (token.wallet?.provider?.balance) return formatDisplayAmount(token.wallet.provider.balance);
				return <EllipsisLoader />;
			case 'stEth':
			case 'dai':
				return token.wallet?.provider?.tokens?.[props.type]?.deposited?.display ?? <EllipsisLoader />;
			default:
				return '-';
		}
	}

	function getTokenProjections() {
		switch (props.type) {
			case 'ao':
				return mergeTokenProjections();
			case 'arweave':
				return token?.wallet?.provider?.projections;
			case 'stEth':
			case 'dai':
				return token?.wallet?.provider?.projections?.[props.type];
			default:
				return null;
		}
	}

	function mergeTokenProjections() {
		if (!arProvider.projections && !ethProvider.projections) return null;

		return {
			monthly: {
				amount:
					(arProvider.projections?.monthly?.amount ?? 0) +
					(ethProvider.projections?.stEth?.monthly?.amount ?? 0) +
					(ethProvider.projections?.dai?.monthly?.amount ?? 0),
				ratio: null,
			},
			yearly: {
				amount:
					(arProvider.projections?.yearly?.amount ?? 0) +
					(ethProvider.projections?.stEth?.yearly?.amount ?? 0) +
					(ethProvider.projections?.dai?.yearly?.amount ?? 0),
				ratio: null,
			},
		};
	}

	return token ? (
		<S.BalanceSection type={props.type} className={'fade-in'}>
			<S.BalanceHeaderWrapper>
				<S.BalanceHeader>
					<span>{token.header}</span>
				</S.BalanceHeader>
				<Button
					type={'primary'}
					label={getWalletLabel()}
					handlePress={handleWalletPress}
					icon={ASSETS.wallet}
					iconLeftAlign
				/>
			</S.BalanceHeaderWrapper>
			<S.BalanceBodyWrapper>
				<S.BalanceQuantitySection>
					<S.BalanceQuantityHeader>
						<span className={'primary-text'}>{token.balance.header}</span>
					</S.BalanceQuantityHeader>
					<S.BalanceQuantityBody>
						<ReactSVG id={props.type === 'ao' ? 'ao-logo' : ''} src={token.balance.icon} />
						<p>{getPrimaryBalance()}</p>
					</S.BalanceQuantityBody>
					{token.redirect && (
						<S.BalanceQuantityFooter>
							<Button
								type={'alt2'}
								label={token.redirect.label}
								handlePress={() => window.open(token.redirect.target, '_blank')}
							/>
						</S.BalanceQuantityFooter>
					)}
				</S.BalanceQuantitySection>
				<S.BalancesQuantityFlexSection>
					<S.BalanceQuantityEndSection>
						<S.BalanceQuantityHeader>
							<span className={'primary-text'}>30 Day Projection</span>
						</S.BalanceQuantityHeader>
						<S.BalanceQuantityBody>
							<p>
								{getTokenProjections() ? (
									<>
										<span className={'indicator'}>+</span>
										{formatDisplayAmount(getTokenProjections().monthly.amount)}
									</>
								) : (
									<>{token.wallet?.provider?.walletAddress ? <EllipsisLoader /> : '-'}</>
								)}
							</p>
						</S.BalanceQuantityBody>
						{props.type !== 'ao' && (
							<S.BalanceQuantityFooter>
								{getTokenProjections() ? (
									<span className={'primary-text'}>{`1 ${token.ticker} = ${formatDisplayAmount(
										getTokenProjections().monthly.ratio
									)} AO`}</span>
								) : (
									<span className={'primary-text'}>-</span>
								)}
							</S.BalanceQuantityFooter>
						)}
					</S.BalanceQuantityEndSection>
					<S.BalanceQuantityEndSection>
						<S.BalanceQuantityHeader>
							<span className={'primary-text'}>1 Year Projection</span>
						</S.BalanceQuantityHeader>
						<S.BalanceQuantityBody>
							<p>
								{getTokenProjections() ? (
									<>
										<span className={'indicator'}>+</span>
										{formatDisplayAmount(getTokenProjections().yearly.amount)}
									</>
								) : (
									<>{token.wallet?.provider?.walletAddress ? <EllipsisLoader /> : '-'}</>
								)}
							</p>
						</S.BalanceQuantityBody>
						{props.type !== 'ao' && (
							<S.BalanceQuantityFooter>
								{getTokenProjections() ? (
									<span className={'primary-text'}>{`1 ${token.ticker} = ${formatDisplayAmount(
										getTokenProjections().yearly.ratio
									)} AO`}</span>
								) : (
									<span className={'primary-text'}>-</span>
								)}
							</S.BalanceQuantityFooter>
						)}
					</S.BalanceQuantityEndSection>
				</S.BalancesQuantityFlexSection>
			</S.BalanceBodyWrapper>
		</S.BalanceSection>
	) : null;
}
