import React from 'react';

import { Button } from 'components/atoms/Button';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { Footer } from 'navigation/footer';
import { useAOProvider } from 'providers/AOProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletConnect } from 'wallet/WalletConnect';

import * as MintS from '../Mint/styles';

import * as S from './styles';

const MOCK_UNIT = 'AO';
const DEFAULT_STAKE_AMOUNT = '25';
const MIN_STAKE_AO = 25;
const DEFAULT_PEER_NODES = [''] as const;
const REFERENCE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/;
const PREFIX_PATTERN = /^\/[A-Za-z0-9/_-]*$/;

function formatAmount(n: number) {
	if (!Number.isFinite(n)) return '—';
	return `${n.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${MOCK_UNIT}`;
}

function parsePositiveAmount(raw: string): number | null {
	const v = parseFloat(raw.replace(/,/g, '').trim());
	if (!Number.isFinite(v) || v <= 0) return null;
	return v;
}

function isValidReference(reference: string): boolean {
	return REFERENCE_PATTERN.test(reference.trim());
}

function isValidPrefix(prefix: string): boolean {
	const normalizedPrefix = prefix.trim();
	return PREFIX_PATTERN.test(normalizedPrefix);
}

export default function Nasa() {
	const aoProvider = useAOProvider();
	const arProvider = useArweaveProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [available, setAvailable] = React.useState(10000);
	const [staked, setStaked] = React.useState(1250.5);
	const [networkTotal, setNetworkTotal] = React.useState(1_842_019.42);
	const [lastEpochRewardDistributed] = React.useState(48_291.3705);
	const [amount, setAmount] = React.useState(DEFAULT_STAKE_AMOUNT);
	const [mode, setMode] = React.useState<'stake' | 'withdraw'>('stake');
	const [feedback, setFeedback] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [peerNodes, setPeerNodes] = React.useState<string[]>([...DEFAULT_PEER_NODES]);
	const [reference, setReference] = React.useState('');
	const [prefix, setPrefix] = React.useState('');
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const amountNum = parsePositiveAmount(amount);
	const normalizedPeerNodes = React.useMemo(
		() => peerNodes.map((node) => node.trim()).filter((node) => node.length > 0),
		[peerNodes]
	);
	const filledPeerNodeCount = normalizedPeerNodes.length;
	const hasValidReference = isValidReference(reference);
	const hasValidPrefix = isValidPrefix(prefix);
	const isWalletConnected = Boolean(arProvider.walletAddress);
	const isStakeBaseValid = amountNum !== null && filledPeerNodeCount > 0 && hasValidReference && hasValidPrefix;
	const isWithdrawBaseValid = amountNum !== null;
	const isSubmitDisabled =
		mode === 'stake' ? !isStakeBaseValid || isSubmitting : !isWithdrawBaseValid || isSubmitting;

	const handleInputChange = (raw: string) => {
		setAmount(raw);
		setError(null);
		setFeedback(null);
	};

	const handleReferenceChange = (value: string) => {
		setReference(value);
		setError(null);
		setFeedback(null);
	};

	const handlePrefixChange = (value: string) => {
		setPrefix(value);
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
		if (v < MIN_STAKE_AO) {
			setError(language.operatorStakeBelowMinimum);
			setFeedback(null);
			return;
		}
		if (v > available) {
			setError(language.operatorStakeInsufficient);
			setFeedback(null);
			return;
		}
		if (filledPeerNodeCount < 1) {
			setError(language.operatorStakePeerRequired);
			setFeedback(null);
			return;
		}
		if (!reference.trim()) {
			setError(language.operatorStakeReferenceRequired);
			setFeedback(null);
			return;
		}
		if (!hasValidReference) {
			setError(language.operatorStakeReferenceInvalid);
			setFeedback(null);
			return;
		}
		if (!prefix.trim()) {
			setError(language.operatorStakePrefixRequired);
			setFeedback(null);
			return;
		}
		if (!hasValidPrefix) {
			setError(language.operatorStakePrefixInvalid);
			setFeedback(null);
			return;
		}
		setAvailable((a) => Math.round((a - v) * 1e6) / 1e6);
		setStaked((s) => Math.round((s + v) * 1e6) / 1e6);
		setNetworkTotal((t) => Math.round((t + v) * 1e6) / 1e6);
		setAmount(DEFAULT_STAKE_AMOUNT);
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
		setAmount(DEFAULT_STAKE_AMOUNT);
		setError(null);
		setFeedback(language.operatorStakeMockFeedback);
	};

	const submitLabel = mode === 'stake' ? language.operatorStakeSubmit : language.operatorUnstakeSubmit;
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const contextValidation = await aoProvider.validateOperatorStakeContext({
				reference: reference.trim(),
				prefix: prefix.trim(),
				peers: normalizedPeerNodes,
			});
			if (!contextValidation.isValid) {
				setError(contextValidation.message || language.operatorStakeContextInvalid);
				setFeedback(null);
				return;
			}

			if (mode === 'stake') {
				runStake();
				return;
			}
			runUnstake();
		} catch (e) {
			console.error(e);
			setError(language.operatorStakeContextInvalid);
			setFeedback(null);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<S.PageWrapper className={'fade-in'}>
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

						<S.StatsGrid $columns={mode === 'withdraw' ? 2 : 3}>
							{mode === 'stake' && (
								<S.StatCell>
									<span>{language.operatorYourStake}</span>
									<p>{formatAmount(staked)}</p>
								</S.StatCell>
							)}
							<S.StatCell>
								<span>{language.operatorNetworkStakeMock}</span>
								<p>{formatAmount(networkTotal)}</p>
							</S.StatCell>
							<S.StatCell>
								<span>{language.operatorLastEpochRewardDistributed}</span>
								<p>{formatAmount(lastEpochRewardDistributed)}</p>
							</S.StatCell>
						</S.StatsGrid>

						<S.AmountFieldWrap>
							{mode === 'withdraw' && <S.AmountFieldLabel>{language.withdraw}</S.AmountFieldLabel>}
							<S.AmountBlock>
								<S.AmountTopRow>
									<S.AmountInput
										type={'text'}
										inputMode={'decimal'}
										autoComplete={'off'}
										placeholder={language.operatorStakePlaceholder}
										value={amount}
										onChange={(e) => handleInputChange(e.target.value)}
									/>
									<S.AmountUnit>{MOCK_UNIT}</S.AmountUnit>
								</S.AmountTopRow>
								{mode === 'stake' && <S.AmountHint>{language.operatorStakeMinimumEntry}</S.AmountHint>}
							</S.AmountBlock>
						</S.AmountFieldWrap>

						{mode === 'stake' && (
							<S.PeersWrap>
								<S.MetaFieldsWrap>
									<S.MetaField>
										<S.MetaFieldLabel>{language.operatorStakeReferenceLabel}</S.MetaFieldLabel>
										<S.MetaFieldInput
											type={'text'}
											value={reference}
											onChange={(e) => handleReferenceChange(e.target.value)}
											placeholder={language.operatorStakeReferencePlaceholder}
										/>
									</S.MetaField>
									<S.MetaField>
										<S.MetaFieldLabel>{language.operatorStakePrefixLabel}</S.MetaFieldLabel>
										<S.MetaFieldInput
											type={'text'}
											value={prefix}
											onChange={(e) => handlePrefixChange(e.target.value)}
											placeholder={language.operatorStakePrefixPlaceholder}
										/>
									</S.MetaField>
								</S.MetaFieldsWrap>
								<S.PeerInputsHeader>
									<S.PeerInputsHeaderLabel>
										{language.operatorStakePeerNodesTitle}
									</S.PeerInputsHeaderLabel>
								</S.PeerInputsHeader>
								<S.PeersTable>
									{peerNodes.map((node, index) => (
										<S.PeerRow key={`peer-node-${index}`}>
											<S.PeerIndex>{index + 1}</S.PeerIndex>
											<S.PeerInput
												type={'text'}
												value={node}
												onChange={(e) => handlePeerNodeChange(index, e.target.value)}
												placeholder={language.operatorStakePeerNodePlaceholder}
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
									{language.operatorStakeAddPeer}
								</S.AddMoreButton>
							</S.PeersWrap>
						)}

						<S.ActionWrap>
							{isWalletConnected ? (
								<S.SubmitButton type={'submit'} disabled={isSubmitDisabled}>
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
		</S.PageWrapper>
	);
}
