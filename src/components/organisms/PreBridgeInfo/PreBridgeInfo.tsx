import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { readHandler } from 'api';

// import { SupplyChart } from 'components/molecules/SupplyChart';
import { AO, ASSETS, TOKEN_DENOMINATION } from 'helpers/config';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

const CONFIG = {
	arweave: {
		description: `Owners of AR generate AO continuously, proportionate to their holdings. You do not need to perform any form of activation in order to receive these tokens.
This page will help you keep track of your AO rewards and future projections. Simply connect your Arweave wallet to view your balance.
AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	ethereum: {
		description: `66.6% of AO tokens are minted to users that bridge their assets to the network. Simply connect your wallet, deposit staked Ethereum, and earn AO.
You can remove your deposited tokens at any time. You will begin to accrue AO 24 hours after your deposit has been confirmed.
Bridging rewards go live at 11 AM EST June 18th, 2024.
AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	cred: {
		description: `Users that took part in AO testnet quests are able to convert their CRED tokens for AO-CLAIMs, at a rate of 1:1000.
AO tokens have a 100% fair launch, with zero pre-allocations of any kind. As a consequence, the AO provided to those that convert their CRED will be purchased or earned via holding AR by ecosystem parties that have volunteered to do so.
AO-claims will become redeemable after 15% of the AO supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/ydfvlhml1NI9DdTps3nEX634AY5JaQD4WmFGtRBryzk" target="_blank">blog post</a>.
`,
	},
};

const REDIRECTIS = {
	ncc: 'https://arweave.net/jZHVGxxxVpjGxD_uwpp-NSsezf9_z0r0evhDnV2hFNs',
	morpheus:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Internal%20Audit.md',
	codehawks:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Code%20Hawks%20Public%20Audit.md',
	renascence:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Renascence%20Morpheus%20Audit%20v2.pdf',
};

export default function PreBridgeInfo(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const arProvider = useArweaveProvider();
	const ethProvider = useEthereumProvider();

	const [provider, setProvider] = React.useState<any>(null);

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	const [currentSupply, setCurrentSupply] = React.useState<number | null>(null);
	const [currentBalance, setCurrentBalance] = React.useState<number | null>(null);

	React.useEffect(() => {
		switch (props.chain) {
			case 'arweave':
				setProvider(arProvider);
				break;
			case 'ethereum':
				setProvider(ethProvider);
				break;
		}
	}, [props.chain, arProvider, ethProvider]);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 200);
	}, [provider]);

	React.useEffect(() => {
		if (!showWallet) {
			setLabel(`${language.fetching}...`);
		} else {
			if (provider.walletAddress) {
				setLabel(formatAddress(provider.walletAddress, false));
			} else {
				setLabel(language.walletNotConnected);
			}
		}
	}, [showWallet, provider]);

	React.useEffect(() => {
		(async function () {
			try {
				const mintedSupply = await readHandler({
					processId: AO.token,
					action: 'Minted-Supply',
				});
				if (mintedSupply !== null) setCurrentSupply(Number(mintedSupply) / TOKEN_DENOMINATION);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	// TODO - Current Balance by ETH Address
	React.useEffect(() => {
		(async function () {
			if (provider && provider.walletAddress) {
				switch (props.chain) {
					case 'arweave':
						try {
							const tokenBalance = await readHandler({
								processId: AO.token,
								action: 'Balance',
								tags: [{ name: 'Recipient', value: provider.walletAddress }],
							});
							if (tokenBalance != null) setCurrentBalance(tokenBalance / TOKEN_DENOMINATION);
						} catch (e: any) {
							console.error(e);
						}
						break;
					case 'ethereum':
						setCurrentBalance(1748736745614 / TOKEN_DENOMINATION);
						break;
				}
			} else {
				setCurrentBalance(null);
			}
		})();
	}, [props.chain, provider]);

	const urlSegments = window.location.hash.split('/');
	const currentTab = urlSegments[urlSegments.length - 2];

	return (
		<S.Wrapper className={'pre-bridge-content'}>
			<S.SectionWrapper className={'border-wrapper-alt1 fade-in'}>
				<S.Section>
					{provider && (
						<S.WalletAction
							connected={provider.walletAddress !== null}
							onClick={() => (provider.walletAddress !== null ? {} : provider.setWalletModalVisible(true))}
						>
							<div className={'indicator'} />
							<span>{label}</span>
						</S.WalletAction>
					)}
					{CONFIG[currentTab] && (
						<S.Description>
							<ReactSVG src={ASSETS.info} />
							<p>{parse(CONFIG[currentTab].description)}</p>
						</S.Description>
					)}
				</S.Section>
				<S.Section>
					<S.TotalSupply>
						<span>{language.circulatingSupply}</span>
						<S.TotalSupplyAmount>
							<p>{`${formatDisplayAmount(currentSupply)}`}</p>
							<ReactSVG src={ASSETS.ao} />
						</S.TotalSupplyAmount>
					</S.TotalSupply>
					{props.chain !== 'ethereum' && (
						<S.CurrentEarningsWrapper>
							<span>{language.currentBalance}</span>
							<S.CurrentEarnings>
								<h2>{formatDisplayAmount(currentBalance)}</h2>
								<ReactSVG src={ASSETS.ao} />
							</S.CurrentEarnings>
						</S.CurrentEarningsWrapper>
					)}
				</S.Section>
				<S.Section>
					<S.IconsWrapper className={'fade-in'}>
						<S.IconGroup>
							<p>{language.baseContractAudits}</p>
							<S.IconsLine>
								<Link to={REDIRECTIS.codehawks} target={'_blank'}>
									<div className={'codehawks-audit'}>
										<ReactSVG src={ASSETS.codehawksAudit} />
									</div>
								</Link>
								<Link to={REDIRECTIS.renascence} target={'_blank'}>
									<div className={'renascence-audit'}>
										<ReactSVG src={ASSETS.renascenseAudit} />
									</div>
								</Link>
								<Link to={REDIRECTIS.morpheus} target={'_blank'}>
									<div className={'morpheus-audit'}>
										<ReactSVG src={ASSETS.morpheusAudit} />
									</div>
								</Link>
							</S.IconsLine>
						</S.IconGroup>
						<S.IconGroup>
							<p>{language.aoAudit}</p>
							<S.IconsLine>
								<Link to={REDIRECTIS.ncc} target={'_blank'}>
									<div className={'ncc-audit'}>
										<ReactSVG src={ASSETS.nccAudit} />
									</div>
								</Link>
							</S.IconsLine>
						</S.IconGroup>
					</S.IconsWrapper>
					{provider && provider.walletAddress !== null && (
						<S.DisconnectWrapper>
							<button onClick={() => provider.handleDisconnect()}>
								<span>Disconnect wallet</span>
							</button>
						</S.DisconnectWrapper>
					)}
				</S.Section>
			</S.SectionWrapper>
			{/* <S.ChartWrapper className={'fade-in'}>
				<SupplyChart />
			</S.ChartWrapper> */}
		</S.Wrapper>
	);
}
