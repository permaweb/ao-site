import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Web3 from 'web3';

import artwork from 'assets/dashboard-artwork.png';
import AnimatedNumber from 'components/atoms/AnimatedNumber/AnimatedNumber';
import { BlockedMessage } from 'components/atoms/BlockedMessage';
import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import WalletConnectionStatus from 'components/organisms/WalletConnectionStatus/WalletConnectionStatus';
import { AO_ABI, ASSETS, ENDPOINTS, ETH_CONTRACTS, STETH_ABI } from 'helpers/config';
import { formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { EthereumProvider, useEthereumProvider } from 'providers/EthereumProvider';
import Ethereum from 'views/Ethereum';

import * as S from './styles';

export default function Mint() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isBlocked, setIsBlocked] = React.useState<boolean>(false);

	React.useEffect(() => {
		const checkLocation = async () => {
			setLoading(true);
			try {
				const response = await fetch(ENDPOINTS.ipCheck);
				const data = await response.json();
				if (data.country === 'US') {
					setIsBlocked(true);
				}
			} catch (error) {
				console.error('Error fetching location data', error);
			}
			setLoading(false);
		};

		checkLocation();
	}, []);

	const navigate = useNavigate();

	const arProvider = useArweaveProvider();
	const arWalletBalance = React.useMemo(() => {
		if (!arProvider.walletAddress) return `${formatDisplayAmount(null)}`;
		if (arProvider.balance === 'Error') return arProvider.balance;
		return `${formatDisplayAmount(arProvider.balance)}`;
	}, [arProvider.balance, arProvider.walletAddress]);

	const ethProvider = useEthereumProvider();
	const [stethBalance, setStethBalance] = React.useState<bigint | null>(null);
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

					// const usersData = await aoContract.methods.usersData(ethProvider.walletAddress, 0).call();
					// setDespositedStethBalance((usersData as any).deposited as bigint);
				} catch (e: any) {
					console.error(e);
					// setDespositedStethBalance('Error' as any);
				}
			} else {
				setStethBalance(null);
				// setDespositedStethBalance(null);
				// handleClear();
			}
		})();
	}, [ethProvider.walletAddress]);

	function getView() {
		if (loading) return <Loader />;
		if (isBlocked) {
			return (
				<S.BlockMessage>
					<BlockedMessage />
				</S.BlockMessage>
			);
		}

		return (
			<S.Wrapper>
				<S.Heading>
					<S.Subheading>[+] Your Dashboard</S.Subheading>
					<WalletConnectionStatus />
				</S.Heading>
				<S.Hero columns={2}>
					<S.Column>
						<S.Section columns={1}>
							<S.Column>
								<S.Label>Your AO (G-Armstrongs)</S.Label>
								<S.AssetAmount>
									<ReactSVG src={ASSETS.aoPict} />
									<AnimatedNumber />
								</S.AssetAmount>
							</S.Column>
						</S.Section>
						<S.Divider />
						<S.Section columns={2}>
							<S.Column>
								<S.Label>30 day projection</S.Label>
								<S.AssetAmount variant="alt1">
									<ReactSVG src={ASSETS.aoPict} />
									+100.004k
								</S.AssetAmount>
							</S.Column>
							<S.Column>
								<S.Label>1 year projection</S.Label>
								<S.AssetAmount variant="alt1">
									<ReactSVG src={ASSETS.aoPict} />
									+10.023m
								</S.AssetAmount>
							</S.Column>
						</S.Section>
					</S.Column>
					<S.Artwork src={artwork} alt="artwork" />
				</S.Hero>
				<S.Section className="border-wrapper-alt1" columns={4}>
					<S.Column>
						<S.Label>Your Arweave</S.Label>
						{!!arProvider.walletAddress ? (
							<>
								<S.AssetAmount>
									<ReactSVG src={ASSETS.arweave} />
									{arWalletBalance}
								</S.AssetAmount>
								<S.Label
									size="small"
									className="button"
									onClick={() => {
										arProvider.handleDisconnect();
									}}
								>
									Disconnect Wallet
								</S.Label>
							</>
						) : (
							<Button
								style={{ width: 'fit-content' }}
								type={'alt1'}
								label={'Connect Wallet'}
								handlePress={() => {
									arProvider.setWalletModalVisible(true);
								}}
								loading={loading}
								height={40}
							/>
						)}
					</S.Column>
					<S.Column>
						<S.Label>AO Earnings</S.Label>
						{!!arProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.aoPict} />
								<AnimatedNumber />
							</S.AssetAmount>
						) : (
							'-'
						)}
					</S.Column>
					<S.Column>
						<S.Label>30 day projection</S.Label>
						{!!arProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.plus} className="small" />
								100.04k
							</S.AssetAmount>
						) : (
							'-'
						)}
						<S.Label size="small">1 AR = 300</S.Label>
					</S.Column>
					<S.Column>
						<S.Label>1 year projection</S.Label>
						{!!arProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.plus} className="small" />
								10.023m
							</S.AssetAmount>
						) : (
							'-'
						)}
						<S.Label size="small">1 AR = 300k</S.Label>
					</S.Column>
				</S.Section>
				<S.Section>
					<S.Column>
						<S.Label>Your STETH Bridged</S.Label>
						{!!ethProvider.walletAddress ? (
							<>
								<S.AssetAmount>
									<ReactSVG src={ASSETS.eth} />
									<span>{stethBalance ? Web3.utils.fromWei(stethBalance, 'ether') : ''}</span>
								</S.AssetAmount>
								<S.Label
									size="small"
									className="button"
									onClick={() => {
										ethProvider.handleDisconnect();
									}}
								>
									Disconnect Wallet
								</S.Label>
							</>
						) : (
							<Button
								style={{ width: 'fit-content' }}
								type={'alt1'}
								label={'Connect Wallet'}
								handlePress={() => {
									ethProvider.setWalletModalVisible(true);
								}}
								loading={loading}
								height={40}
							/>
						)}
					</S.Column>
					<S.Column>
						<S.Label>AO Earnings</S.Label>
						{!!ethProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.aoPict} />
								<AnimatedNumber />
							</S.AssetAmount>
						) : (
							'-'
						)}
					</S.Column>
					<S.Column>
						<S.Label>30 day projection</S.Label>
						{!!ethProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.plus} className="small" />
								100.04k
							</S.AssetAmount>
						) : (
							'-'
						)}
						<S.Label size="small">1 STETH = 300</S.Label>
					</S.Column>
					<S.Column>
						<S.Label>1 year projection</S.Label>
						{!!ethProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.plus} className="small" />
								10.023m
							</S.AssetAmount>
						) : (
							'-'
						)}
						<S.Label size="small">1 STETH = 300k</S.Label>
					</S.Column>
					<S.Column>
						<S.Label>0.5 Available</S.Label>
						<S.Row>
							<Button
								style={{ width: 'fit-content' }}
								type={'accent'}
								label={'Deposit'}
								handlePress={() => navigate('/mint/deposit')}
								loading={loading}
								height={40}
							/>
							<Button
								style={{ width: 'fit-content' }}
								type={'alt1'}
								label={'Withdraw'}
								handlePress={() => navigate('/mint/withdraw')}
								loading={loading}
								height={40}
							/>
						</S.Row>
					</S.Column>
				</S.Section>
				<S.Section>
					<S.Column>
						<S.Label>Your DAI Bridged</S.Label>
						{!!ethProvider.walletAddress ? (
							<>
								<S.AssetAmount>
									<ReactSVG src={ASSETS.dai} />
									<span>1300</span>
								</S.AssetAmount>
								<S.Label
									size="small"
									className="button"
									onClick={() => {
										ethProvider.handleDisconnect();
									}}
								>
									Disconnect Wallet
								</S.Label>
							</>
						) : (
							<Button
								style={{ width: 'fit-content' }}
								type={'alt1'}
								label={'Connect Wallet'}
								handlePress={() => {
									ethProvider.setWalletModalVisible(true);
								}}
								loading={loading}
								height={40}
							/>
						)}
					</S.Column>
					<S.Column>
						<S.Label>AO Earnings</S.Label>
						{!!ethProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.aoPict} />
								<AnimatedNumber />
							</S.AssetAmount>
						) : (
							'-'
						)}
					</S.Column>
					<S.Column>
						<S.Label>30 day projection</S.Label>
						{!!ethProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.plus} className="small" />
								100.04k
							</S.AssetAmount>
						) : (
							'-'
						)}
						<S.Label size="small">1000 DAI = 300</S.Label>
					</S.Column>
					<S.Column>
						<S.Label>1 year projection</S.Label>
						{!!ethProvider.walletAddress ? (
							<S.AssetAmount>
								<ReactSVG src={ASSETS.plus} className="small" />
								10.023m
							</S.AssetAmount>
						) : (
							'-'
						)}
						<S.Label size="small">1000 DAI = 300k</S.Label>
					</S.Column>
					<S.Column>
						<S.Label>0.5 Available</S.Label>
						<S.Row>
							<Button
								style={{ width: 'fit-content' }}
								type={'accent'}
								label={'Deposit'}
								handlePress={() => navigate('/mint/deposit')}
								loading={loading}
								height={40}
							/>
							<Button
								style={{ width: 'fit-content' }}
								type={'alt1'}
								label={'Withdraw'}
								handlePress={() => navigate('/mint/withdraw')}
								loading={loading}
								height={40}
							/>
						</S.Row>
					</S.Column>
				</S.Section>
			</S.Wrapper>
		);
	}

	return getView();
}
