import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { readHandler } from 'api';

import { AO, ASSETS, TOKEN_DENOMINATION } from 'helpers/config';
import { formatAddress, formatDisplayAmount } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useEthereumProvider } from 'providers/EthereumProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

// TODO: links
const CONFIG = {
	arweave: {
		description: `Wallets holding AR generate AO continuously since genesis. Every Arweave wallet with a positive balance is generating AO proportionate to the AR circulating supply and the volume of external yield generating assets. Learn more in the <a href="#" target="_blank">blog post</a>.`,
	},
	ethereum: {
		description: `Two thirds of newly minted AO are distributed to accounts who deposit eligible external assets into the AO network. AO token allocation is proportional to the TVL of deposited assets and their native yield. Your deposited assets remain secure in <a href="#" target="_blank">our audited Ethereum contract</a> and can be withdrawn anytime, while the yield is allocated to the AO ecosystem to bootstrap the further development and security of the network. As AO opens to more ecosystems, other proof-of-stake assets will also be eligible. Learn more in the <a href="#" target="_blank">blog post</a>.`,
	},
	cred: {
		description: `If you own AOCRED, you can claim AO tokens at a 1000 AOCRED to 1 AO ratio, available only to non-US persons. Deposit your AOCRED here, then starting January 2025, you will be able to claim your AO tokens into your Arweave wallet within 365 days. Unclaimed tokens by January 2026 will be forfeited.`,
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

	// TODO - eth address current balance
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

	return provider ? (
		<S.Wrapper className={'border-wrapper-alt1 fade-in'}>
			<S.Section>
				<S.WalletAction
					connected={provider.walletAddress !== null}
					onClick={() => (provider.walletAddress !== null ? {} : provider.setWalletModalVisible(true))}
				>
					<div className={'indicator'} />
					<span>{label}</span>
				</S.WalletAction>
				{CONFIG[currentTab] && (
					<S.Description>
						<ReactSVG src={ASSETS.info} />
						<p>{parse(CONFIG[props.chain].description)}</p>
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
				<S.CurrentEarningsWrapper>
					<span>{language.currentBalance}</span>
					<S.CurrentEarnings>
						<h2>{formatDisplayAmount(currentBalance)}</h2>
						<ReactSVG src={ASSETS.ao} />
					</S.CurrentEarnings>
				</S.CurrentEarningsWrapper>
			</S.Section>
			<S.Section>
				<S.IconsWrapper className={'fade-in'}>
					<S.IconGroup>
						<p>{language.baseContractAudits}</p>
						<S.IconsLine>
							<Link to={REDIRECTIS.morpheus} target={'_blank'}>
								<div className={'morpheus-audit'}>
									<ReactSVG src={ASSETS.morpheusAudit} />
								</div>
							</Link>
							<Link to={REDIRECTIS.renascence} target={'_blank'}>
								<div className={'renascence-audit'}>
									<ReactSVG src={ASSETS.renascenseAudit} />
								</div>
							</Link>
							<Link to={REDIRECTIS.codehawks} target={'_blank'}>
								<div className={'codehawks-audit'}>
									<ReactSVG src={ASSETS.codehawksAudit} />
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
				{provider.walletAddress !== null && (
					<S.DisconnectWrapper>
						<button onClick={() => provider.handleDisconnect()}>
							<span>Disconnect wallet</span>
						</button>
					</S.DisconnectWrapper>
				)}
			</S.Section>
		</S.Wrapper>
	) : null;
}
