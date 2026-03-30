import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/atoms/Button';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { URLS } from 'helpers/config';
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
const CHECK_TYPING_PAUSE_MS = 450;
const CHECK_MIN_DELAY_MS = 1000;
const CHECK_MAX_DELAY_MS = 2000;

type ValidationStatus = 'idle' | 'checking' | 'valid' | 'invalid';

type ValidationResult = {
	status: ValidationStatus;
	message: string | null;
};

function getRandomDelayMs() {
	return CHECK_MIN_DELAY_MS + Math.floor(Math.random() * (CHECK_MAX_DELAY_MS - CHECK_MIN_DELAY_MS + 1));
}

function simulateReferenceAvailability(referenceName: string): boolean {
	const normalized = referenceName.trim().toLowerCase();
	if (!isValidReference(normalized)) return false;
	if (['taken', 'existing', 'reserved'].some((s) => normalized.includes(s))) return false;
	const checksum = normalized.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
	return checksum % 4 !== 0;
}

function simulatePrefixAssociation(prefixValue: string, walletAddress: string, nodeUrl: string): boolean {
	const normalizedPrefix = prefixValue.trim();
	const normalizedWallet = walletAddress.trim().toLowerCase();
	const normalizedNode = nodeUrl.trim().toLowerCase();
	if (!isValidPrefix(normalizedPrefix) || !normalizedWallet || !normalizedNode) return false;
	const joined = `${normalizedPrefix}|${normalizedWallet}|${normalizedNode}`;
	const checksum = joined.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
	return checksum % 3 !== 0;
}

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
	return normalizedPrefix.toLowerCase().startsWith('https://');
}

function isHttpsUrl(value: string): boolean {
	const normalized = value.trim();
	return normalized.toLowerCase().startsWith('https://') && normalized.length > 'https://'.length;
}

export default function Nasa() {
	const navigate = useNavigate();
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
	const [referenceValidation, setReferenceValidation] = React.useState<ValidationResult>({
		status: 'idle',
		message: null,
	});
	const [prefixValidation, setPrefixValidation] = React.useState<ValidationResult>({
		status: 'idle',
		message: null,
	});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const referenceCheckRequestRef = React.useRef(0);
	const prefixCheckRequestRef = React.useRef(0);
	const amountInputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const input = amountInputRef.current;
		if (!input) return;
		input.focus();
		const cursorPosition = input.value.length;
		input.setSelectionRange(cursorPosition, cursorPosition);
	}, []);

	const amountNum = parsePositiveAmount(amount);
	const normalizedPeerNodes = React.useMemo(
		() => peerNodes.map((node) => node.trim()).filter((node) => node.length > 0),
		[peerNodes]
	);
	const filledPeerNodeCount = normalizedPeerNodes.length;
	const hasValidPeerNodes = normalizedPeerNodes.every((node) => isHttpsUrl(node));
	const hasValidReference = isValidReference(reference);
	const hasValidPrefix = isValidPrefix(prefix);
	const isWalletConnected = Boolean(arProvider.walletAddress);
	const hasReferenceCheckPassed = referenceValidation.status === 'valid';
	const hasPrefixCheckPassed = prefixValidation.status === 'valid';
	const isStakeBaseValid =
		amountNum !== null &&
		filledPeerNodeCount > 0 &&
		hasValidPeerNodes &&
		hasValidReference &&
		hasValidPrefix &&
		hasReferenceCheckPassed &&
		hasPrefixCheckPassed;
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
		setReferenceValidation({ status: 'idle', message: null });
		setError(null);
		setFeedback(null);
	};

	const handlePrefixChange = (value: string) => {
		setPrefix(value);
		setPrefixValidation({ status: 'idle', message: null });
		setError(null);
		setFeedback(null);
	};

	const handlePeerNodeChange = (index: number, value: string) => {
		setPeerNodes((prev) => prev.map((node, i) => (i === index ? value : node)));
		setPrefixValidation({ status: 'idle', message: null });
		setError(null);
		setFeedback(null);
	};

	const handleAddPeerNode = () => {
		setPeerNodes((prev) => [...prev, '']);
		setPrefixValidation({ status: 'idle', message: null });
		setError(null);
		setFeedback(null);
	};

	const handleRemovePeerNode = (index: number) => {
		setPeerNodes((prev) => {
			if (prev.length <= 1) return [''];
			return prev.filter((_, i) => i !== index);
		});
		setPrefixValidation({ status: 'idle', message: null });
		setError(null);
		setFeedback(null);
	};

	React.useEffect(() => {
		if (mode !== 'stake') {
			setReferenceValidation({ status: 'idle', message: null });
			return;
		}

		const normalizedReference = reference.trim();
		if (!normalizedReference) {
			setReferenceValidation({ status: 'idle', message: null });
			return;
		}

		const requestId = referenceCheckRequestRef.current + 1;
		referenceCheckRequestRef.current = requestId;
		let processingTimer: number | null = null;
		const typingPauseTimer = window.setTimeout(() => {
			if (referenceCheckRequestRef.current !== requestId) return;
			setReferenceValidation({ status: 'checking', message: 'Checking reference name availability...' });

			processingTimer = window.setTimeout(() => {
				if (referenceCheckRequestRef.current !== requestId) return;
				const isAvailable = simulateReferenceAvailability(normalizedReference);
				setReferenceValidation(
					isAvailable
						? { status: 'valid', message: 'Reference name is available.' }
						: { status: 'invalid', message: 'Reference name is unavailable. Try a different name.' }
				);
			}, getRandomDelayMs());
		}, CHECK_TYPING_PAUSE_MS);

		return () => {
			window.clearTimeout(typingPauseTimer);
			if (processingTimer !== null) window.clearTimeout(processingTimer);
		};
	}, [reference, mode]);

	React.useEffect(() => {
		if (mode !== 'stake') {
			setPrefixValidation({ status: 'idle', message: null });
			return;
		}

		const normalizedPrefix = prefix.trim();
		if (!normalizedPrefix) {
			setPrefixValidation({ status: 'idle', message: null });
			return;
		}

		const requestId = prefixCheckRequestRef.current + 1;
		prefixCheckRequestRef.current = requestId;
		let processingTimer: number | null = null;
		const typingPauseTimer = window.setTimeout(() => {
			if (prefixCheckRequestRef.current !== requestId) return;

			const normalizedPrimaryPeer = normalizedPeerNodes[0]?.trim() || '';
			if (!isWalletConnected || !normalizedPrimaryPeer || !isHttpsUrl(normalizedPrimaryPeer)) {
				setPrefixValidation({
					status: 'invalid',
					message: 'Unable to verify yet. Connect wallet and provide an https:// node URL first.',
				});
				return;
			}

			setPrefixValidation({ status: 'checking', message: 'Checking wallet association with node URL...' });
			processingTimer = window.setTimeout(() => {
				if (prefixCheckRequestRef.current !== requestId) return;
				const isAssociated = simulatePrefixAssociation(
					normalizedPrefix,
					arProvider.walletAddress || '',
					normalizedPrimaryPeer
				);
				setPrefixValidation(
					isAssociated
						? { status: 'valid', message: 'Wallet is associated with this node URL.' }
						: {
								status: 'invalid',
								message: 'Wallet is not associated with this node URL. Try a different one.',
						  }
				);
			}, getRandomDelayMs());
		}, CHECK_TYPING_PAUSE_MS);

		return () => {
			window.clearTimeout(typingPauseTimer);
			if (processingTimer !== null) window.clearTimeout(processingTimer);
		};
	}, [prefix, normalizedPeerNodes, mode, isWalletConnected, arProvider.walletAddress]);

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
		if (!hasValidPeerNodes) {
			setError(language.operatorStakePeerInvalid);
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

	const referenceValidationVariant =
		referenceValidation.status === 'valid'
			? 'success'
			: referenceValidation.status === 'invalid'
			? 'error'
			: 'neutral';
	const prefixValidationVariant =
		prefixValidation.status === 'valid' ? 'success' : prefixValidation.status === 'invalid' ? 'error' : 'neutral';

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
			<ViewHeader
				header={language.nasaPageTitle}
				actions={[
					<Button
						key={'nasa-routes'}
						type={'primary'}
						label={'View all NASA routes'}
						handlePress={() => navigate(URLS.nasaDashboard)}
					/>,
					<WalletConnect key={'ar'} />,
				]}
			/>
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
										ref={amountInputRef}
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
										<S.MetaFieldLabelWrap>
											<S.MetaFieldLabel>{language.operatorStakeReferenceLabel}</S.MetaFieldLabel>
											<S.MetaFieldInfoWrap>
												<S.MetaFieldInfo
													type={'button'}
													aria-label={language.operatorStakeReferenceInfo}
												>
													i
												</S.MetaFieldInfo>
												<S.MetaFieldInfoTooltip>
													{language.operatorStakeReferenceInfo}
												</S.MetaFieldInfoTooltip>
											</S.MetaFieldInfoWrap>
										</S.MetaFieldLabelWrap>
										<S.MetaFieldInput
											type={'text'}
											value={reference}
											onChange={(e) => handleReferenceChange(e.target.value)}
											placeholder={language.operatorStakeReferencePlaceholder}
										/>
										{referenceValidation.message && (
											<S.MetaFieldValidation $variant={referenceValidationVariant}>
												{referenceValidation.status === 'checking' && (
													<S.MetaFieldValidationSpinner />
												)}
												{referenceValidation.message}
											</S.MetaFieldValidation>
										)}
									</S.MetaField>
									<S.MetaField>
										<S.MetaFieldLabelWrap>
											<S.MetaFieldLabel>{language.operatorStakePrefixLabel}</S.MetaFieldLabel>
											<S.MetaFieldInfoWrap>
												<S.MetaFieldInfo
													type={'button'}
													aria-label={language.operatorStakePrefixInfo}
												>
													i
												</S.MetaFieldInfo>
												<S.MetaFieldInfoTooltip>
													{language.operatorStakePrefixInfo}
												</S.MetaFieldInfoTooltip>
											</S.MetaFieldInfoWrap>
										</S.MetaFieldLabelWrap>
										<S.MetaFieldInput
											type={'text'}
											value={prefix}
											onChange={(e) => handlePrefixChange(e.target.value)}
											placeholder={language.operatorStakePrefixPlaceholder}
										/>
										{prefixValidation.message && (
											<S.MetaFieldValidation $variant={prefixValidationVariant}>
												{prefixValidation.status === 'checking' && (
													<S.MetaFieldValidationSpinner />
												)}
												{prefixValidation.message}
											</S.MetaFieldValidation>
										)}
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
											{peerNodes.length > 1 && (
												<S.RemovePeerButton
													type={'button'}
													onClick={() => handleRemovePeerNode(index)}
													aria-label={`Remove peer node ${index + 1}`}
												>
													remove
												</S.RemovePeerButton>
											)}
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
