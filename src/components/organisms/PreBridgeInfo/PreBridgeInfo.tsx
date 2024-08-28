import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

const CONFIG = {
	arweave: {
		description: `Owners of AR generate AO continuously, proportionate to their holdings. You do not need to perform any form of activation in order to receive these tokens.
This page will help you keep track of your AO rewards and future projections. Simply connect your Arweave wallet to view your balance.
AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	dai: {
		description: `66.6% of AO tokens are minted to users that bridge their assets to the network. Simply connect your wallet, deposit Dai, and earn AO.
You will begin to accrue AO 24 hours after your deposit has been confirmed.
Bridging rewards for Dai go live at 11 AM EST September 4th, 2024.
Dai has an 18-hour minimum lockup period. This means that you will not be able to remove your Dai from the bridge for 18 hours after depositing it.
AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	stEth: {
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

const REDIRECTS = {
	ncc1: 'https://arweave.net/jZHVGxxxVpjGxD_uwpp-NSsezf9_z0r0evhDnV2hFNs',
	ncc2: 'https://arweave.net/qWdHQIGjeAjc5U5O9gk_o2k4jRYO6khL1vOAGQzkd9Y',
	morpheus:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Distribution%20V1%20Audit%20%7C%20Community.md',
	codehawks:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Distribution%20V1%20Public%20Bug%20Bounty%20%7C%20Code%20Hawks.md',
	renascence:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Distribution%20V2%20Audit%20%7C%20Renascence.pdf',
};

export default function PreBridgeInfo({ asset }: { asset: string }) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<S.Wrapper className={'pre-bridge-content'}>
			<S.SectionWrapper className={'border-wrapper-alt1 fade-in'}>
				<S.Section>
					<S.Description>
						<ReactSVG src={ASSETS.info} />
						<p>{parse(asset === 'DAI' ? CONFIG.dai.description : CONFIG.stEth.description)}</p>
					</S.Description>
					<S.IconsWrapper className={'fade-in'}>
						<S.IconGroup>
							<p>{language.baseContractAudits}</p>
							<S.IconsLine>
								<Link to={REDIRECTS.codehawks} target={'_blank'}>
									<div className={'codehawks-audit'}>
										<ReactSVG src={ASSETS.codehawksAudit} />
									</div>
								</Link>
								<Link to={REDIRECTS.renascence} target={'_blank'}>
									<div className={'renascence-audit'}>
										<ReactSVG src={ASSETS.renascenseAudit} />
									</div>
								</Link>
								<Link to={REDIRECTS.morpheus} target={'_blank'}>
									<div className={'morpheus-audit'}>
										<ReactSVG src={ASSETS.morpheusAudit} />
									</div>
								</Link>
							</S.IconsLine>
						</S.IconGroup>
						<S.IconGroup>
							<p>{language.aoAudit}</p>
							<S.IconsLine>
								<Link to={REDIRECTS.ncc1} target={'_blank'}>
									<div className={'ncc-audit-wrapper'}>
										<div className={'ncc-audit'}>
											<ReactSVG src={ASSETS.nccAudit} />
										</div>
										<span>֯֯1</span>
									</div>
								</Link>
								<Link to={REDIRECTS.ncc2} target={'_blank'}>
									<div className={'ncc-audit-wrapper'}>
										<div className={'ncc-audit'}>
											<ReactSVG src={ASSETS.nccAudit} />
										</div>
										<span>2</span>
									</div>
								</Link>
							</S.IconsLine>
						</S.IconGroup>
					</S.IconsWrapper>
				</S.Section>
			</S.SectionWrapper>
		</S.Wrapper>
	);
}
