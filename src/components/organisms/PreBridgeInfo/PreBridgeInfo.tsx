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

// TODO: descriptions
const CONFIG = {
	arweave: {
		description: `Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
		tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
		risus. Maecenas eget condimentum velit, <a href="#" target="_blank">Visit docs for more info</a>.`,
	},
	ethereum: {
		description: `Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
		tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
		risus. Maecenas eget condimentum velit, <a href="#" target="_blank">Visit docs for more info</a>.`,
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

	// TODO - get eth address current balance
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
				{CONFIG[props.chain] && (
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
