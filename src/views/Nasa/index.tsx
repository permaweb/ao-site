import React from 'react';

import { Button } from 'components/atoms/Button';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { Footer } from 'navigation/footer';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletConnect } from 'wallet/WalletConnect';

import * as MintS from '../Mint/styles';

import * as S from './styles';

const MOCK_UNIT = 'AO';
const PRESET_AMOUNTS = [25, 50, 100, 250, 500] as const;
const DEFAULT_PEER_NODES = [''] as const;

function formatAmount(n: number) {
	if (!Number.isFinite(n)) return '—';
	return `${n.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${MOCK_UNIT}`;
}

function parsePositiveAmount(raw: string): number | null {
	const v = parseFloat(raw.replace(/,/g, '').trim());
	if (!Number.isFinite(v) || v <= 0) return null;
	return v;
}

export default function Nasa() {
	const arProvider = useArweaveProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [available, setAvailable] = React.useState(10000);
	const [staked, setStaked] = React.useState(1250.5);
	const [networkTotal, setNetworkTotal] = React.useState(1_842_019.42);
	const [amount, setAmount] = React.useState('');
	const [mode, setMode] = React.useState<'stake' | 'withdraw'>('stake');
	const [feedback, setFeedback] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [activePreset, setActivePreset] = React.useState<number | 'max' | null>(null);
	const [peerNodes, setPeerNodes] = React.useState<string[]>([...DEFAULT_PEER_NODES]);

	const amountNum = parsePositiveAmount(amount);
	const filledPeerNodeCount = peerNodes.filter((node) => node.trim().length > 0).length;

	const applyAmount = (value: number, preset: number | 'max') => {
		const rounded = Math.round(value * 1e6) / 1e6;
		setAmount(String(rounded));
		setActivePreset(preset);
		setError(null);
		setFeedback(null);
	};

	const handlePresetAmount = (n: number) => {
		applyAmount(n, n);
	};

	const handlePresetMax = () => {
		applyAmount(available, 'max');
	};

	const handleInputChange = (raw: string) => {
		setAmount(raw);
		setActivePreset(null);
		setError(null);
		setFeedback(null);
	};

	const handlePeerNodeChange = (index: number, value: string) => {
		setPeerNodes((prev) => prev.map((node, i) => (i === index ? value : node)));
		setError(null);
		setFeedback(null);
	};

	const handleAddPeerNode = () => {
		setPeerNodes((prev) => [...prev, '']);
		setError(null);
		setFeedback(null);
	};

	const handleRemovePeerNode = (index: number) => {
		setPeerNodes((prev) => {
			if (prev.length <= 1) return [''];
			return prev.filter((_, i) => i !== index);
		});
		setError(null);
		setFeedback(null);
	};

	const runStake = () => {
		const v = parsePositiveAmount(amount);
		if (v === null) {
			setError(language.operatorStakeInvalidAmount);
			setFeedback(null);
			return;
		}
		if (v > available) {
			setError(language.operatorStakeInsufficient);
			setFeedback(null);
			return;
		}
		setAvailable((a) => Math.round((a - v) * 1e6) / 1e6);
		setStaked((s) => Math.round((s + v) * 1e6) / 1e6);
		setNetworkTotal((t) => Math.round((t + v) * 1e6) / 1e6);
		setAmount('');
		setActivePreset(null);
		setError(null);
		setFeedback(`${language.operatorStakeMockFeedback} ${filledPeerNodeCount} peer nodes.`);
	};

	const runUnstake = () => {
		const v = parsePositiveAmount(amount);
		if (v === null) {
			setError(language.operatorStakeInvalidAmount);
			setFeedback(null);
			return;
		}
		if (v > staked) {
			setError(language.operatorUnstakeInsufficient);
			setFeedback(null);
			return;
		}
		setStaked((s) => Math.round((s - v) * 1e6) / 1e6);
		setAvailable((a) => Math.round((a + v) * 1e6) / 1e6);
		setNetworkTotal((t) => Math.round((t - v) * 1e6) / 1e6);
		setAmount('');
		setActivePreset(null);
		setError(null);
		setFeedback(`${language.operatorStakeMockFeedback} ${filledPeerNodeCount} peer nodes.`);
	};

	const submitLabel = mode === 'stake' ? language.operatorStakeSubmit : language.operatorUnstakeSubmit;
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mode === 'stake') {
			runStake();
			return;
		}
		runUnstake();
	};

	return (
		<MintS.Wrapper className={'fade-in'}>
			<ViewHeader header={language.nasaPageTitle} actions={[<WalletConnect key={'ar'} />]} />
			<MintS.BodyWrapper>
				<S.ModuleWrapper className={'border-wrapper-primary'}>
					<S.StakeForm onSubmit={handleSubmit}>
						<S.TabRow>
							<S.TabButton type={'button'} $active={mode === 'stake'} onClick={() => setMode('stake')}>
								{language.stakeNav}
							</S.TabButton>
							<S.TabButton
								type={'button'}
								$active={mode === 'withdraw'}
								onClick={() => setMode('withdraw')}
							>
								{language.withdraw}
							</S.TabButton>
						</S.TabRow>

						<S.StatsGrid>
							<S.StatCell>
								<span>{language.operatorYourStake}</span>
								<p>{formatAmount(staked)}</p>
							</S.StatCell>
							<S.StatCell>
								<span>{language.operatorNetworkStakeMock}</span>
								<p>{formatAmount(networkTotal)}</p>
							</S.StatCell>
						</S.StatsGrid>

						<S.AmountBlock>
							<S.AmountInput
								type={'text'}
								inputMode={'decimal'}
								autoComplete={'off'}
								placeholder={language.operatorStakePlaceholder}
								value={amount}
								onChange={(e) => handleInputChange(e.target.value)}
							/>
							<S.AmountUnit>{MOCK_UNIT}</S.AmountUnit>
						</S.AmountBlock>

						<S.PresetRow>
							{PRESET_AMOUNTS.map((n) => (
								<S.PresetButton
									key={n}
									type={'button'}
									$active={activePreset === n}
									onClick={() => handlePresetAmount(n)}
								>
									{n.toLocaleString()}
								</S.PresetButton>
							))}
							<S.PresetButton type={'button'} $active={activePreset === 'max'} onClick={handlePresetMax}>
								{language.max}
							</S.PresetButton>
						</S.PresetRow>

						<S.PeersWrap>
							<S.PeersTitle>Add your array of peer nodes</S.PeersTitle>
							<S.PeersTable>
								{peerNodes.map((node, index) => (
									<S.PeerRow key={`peer-node-${index}`}>
										<S.PeerIndex>{index + 1}</S.PeerIndex>
										<S.PeerInput
											type={'text'}
											value={node}
											onChange={(e) => handlePeerNodeChange(index, e.target.value)}
											placeholder={'Example placeholder: src/include/hb_arweave_nodes.hrl'}
										/>
										<S.RemovePeerButton
											type={'button'}
											onClick={() => handleRemovePeerNode(index)}
											aria-label={`Remove peer node ${index + 1}`}
										>
											X
										</S.RemovePeerButton>
									</S.PeerRow>
								))}
							</S.PeersTable>
							<S.AddMoreButton type={'button'} onClick={handleAddPeerNode}>
								Add More +
							</S.AddMoreButton>
						</S.PeersWrap>

						<S.ActionWrap>
							{arProvider.walletAddress ? (
								<S.SubmitButton type={'submit'} disabled={amountNum === null}>
									{submitLabel}
								</S.SubmitButton>
							) : (
								<Button
									type={'primary'}
									label={language.connectWallet}
									handlePress={() => arProvider.setWalletModalVisible(true)}
								/>
							)}
						</S.ActionWrap>
					</S.StakeForm>

					{error && <S.FeedbackLine $variant={'error'}>{error}</S.FeedbackLine>}
					{feedback && !error && <S.FeedbackLine>{feedback}</S.FeedbackLine>}
				</S.ModuleWrapper>
				<S.DescriptionPanel>
					<h2>{language.nasaInfoTitle}</h2>
					<p>{language.nasaInfoBody}</p>
					<p>{language.nasaInfoBody2}</p>
					<p>{language.nasaMockWalletHint}</p>
				</S.DescriptionPanel>
			</MintS.BodyWrapper>
			<Footer />
		</MintS.Wrapper>
	);
}
