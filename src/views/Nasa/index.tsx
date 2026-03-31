import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/atoms/Button';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { AO, ENDPOINTS, URLS } from 'helpers/config';
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
const DEFAULT_PEER_NODES = ['https://'] as const;
const REFERENCE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/;
const CHECK_TYPING_PAUSE_MS = 450;

type ValidationStatus = 'idle' | 'checking' | 'valid' | 'invalid';

type ValidationResult = {
	status: ValidationStatus;
	message: string | null;
};

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

function isValidUrl(value: string): boolean {
	const normalized = value.trim().toLowerCase();
	return (
		(normalized.startsWith('https://') && normalized.length > 'https://'.length) ||
		(normalized.startsWith('http://') && normalized.length > 'http://'.length)
	);
}

function isValidPrefix(prefix: string): boolean {
	return isValidUrl(prefix);
}

function isHttpsUrl(value: string): boolean {
	return isValidUrl(value);
}

export default function Nasa() {
	const navigate = useNavigate();
	const aoProvider = useAOProvider();
	const arProvider = useArweaveProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [available] = React.useState(10000);
	const [staked, setStaked] = React.useState(0);
	const [networkTotal] = React.useState(1_842_019.42);
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

	React.useEffect(() => {
		if (mode !== 'withdraw' || !arProvider.walletAddress) return;
		(async () => {
			try {
				const res = await fetch(ENDPOINTS.nasaStakedBalance(arProvider.walletAddress));
				const data = await res.json();
				const stakedAmount = Number(data.body) / 1e12;
				setStaked(Number.isFinite(stakedAmount) && stakedAmount > 0 ? stakedAmount : 0);
			} catch {
				setStaked(0);
			}
		})();
	}, [mode, arProvider.walletAddress]);

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
	const isWithdrawDisabled = staked === 0 || !isWalletConnected || isSubmitting;
	const isSubmitDisabled = mode === 'stake' ? !isStakeBaseValid || isSubmitting : isWithdrawDisabled;

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
		setError(null);
		setFeedback(null);
	};

	const handleAddPeerNode = () => {
		setPeerNodes((prev) => [...prev, 'https://']);
		setError(null);
		setFeedback(null);
	};

	const handleRemovePeerNode = (index: number) => {
		setPeerNodes((prev) => {
			if (prev.length <= 1) return ['https://'];
			return prev.filter((_, i) => i !== index);
		});
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
		const typingPauseTimer = window.setTimeout(async () => {
			if (referenceCheckRequestRef.current !== requestId) return;
			setReferenceValidation({ status: 'checking', message: 'Checking reference name availability...' });

			try {
				const res = await fetch(ENDPOINTS.nasaReferences(normalizedReference));
				if (referenceCheckRequestRef.current !== requestId) return;
				const data = await res.json();
				if (referenceCheckRequestRef.current !== requestId) return;
				if (data.body === 'not_found') {
					setReferenceValidation({ status: 'valid', message: 'Reference name is available.' });
				} else {
					setReferenceValidation({
						status: 'invalid',
						message: 'Reference name is unavailable. Try a different name.',
					});
				}
			} catch {
				if (referenceCheckRequestRef.current !== requestId) return;
				setReferenceValidation({
					status: 'invalid',
					message: 'Could not verify reference. Try again.',
				});
			}
		}, CHECK_TYPING_PAUSE_MS);

		return () => {
			window.clearTimeout(typingPauseTimer);
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
		const typingPauseTimer = window.setTimeout(async () => {
			if (prefixCheckRequestRef.current !== requestId) return;

			if (!isWalletConnected) {
				setPrefixValidation({
					status: 'invalid',
					message: 'Connect your wallet first.',
				});
				return;
			}

			setPrefixValidation({ status: 'checking', message: 'Checking wallet association with node URL...' });

			try {
				const res = await fetch(ENDPOINTS.nasaNodeAddress(normalizedPrefix));
				if (prefixCheckRequestRef.current !== requestId) return;
				const data = await res.json();
				if (prefixCheckRequestRef.current !== requestId) return;
				if (data.body === arProvider.walletAddress) {
					setPrefixValidation({ status: 'valid', message: 'Wallet is associated with this node.' });
				} else {
					setPrefixValidation({
						status: 'invalid',
						message: 'Wallet is not associated with this node.',
					});
				}
			} catch {
				if (prefixCheckRequestRef.current !== requestId) return;
				setPrefixValidation({
					status: 'invalid',
					message: 'Could not verify node association. Try again.',
				});
			}
		}, CHECK_TYPING_PAUSE_MS);

		return () => {
			window.clearTimeout(typingPauseTimer);
		};
	}, [prefix, mode, isWalletConnected, arProvider.walletAddress]);

	const runStake = async () => {
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
		setIsSubmitting(true);
		try {
			await aoProvider.aoMainnet.message({
				process: AO.nasaToken,
				tags: [
					{ name: 'Action', value: 'Transf' },
					{ name: 'Recipient', value: AO.nasaStake },
					{ name: 'Quantity', value: String(Math.floor(v * 1e12)) },
					{ name: 'X-Action', value: 'Stake' },
					{ name: 'X-Reference', value: reference.trim() },
					{ name: 'X-Prefix', value: prefix.trim() },
					{ name: 'X-Peers', value: normalizedPeerNodes.join(',') },
				],
			});
			setAmount(DEFAULT_STAKE_AMOUNT);
			setError(null);
			setFeedback('Stake submitted successfully.');
		} catch (e) {
			console.error(e);
			setError('Stake failed. Please try again.');
			setFeedback(null);
		} finally {
			setIsSubmitting(false);
		}
	};

	const runUnstake = async () => {
		setIsSubmitting(true);
		try {
			await aoProvider.aoMainnet.message({
				process: AO.nasaStake,
				tags: [{ name: 'Action', value: 'Unstake' }],
			});
			setStaked(0);
			setError(null);
			setFeedback('Unstake submitted successfully.');
		} catch (e) {
			console.error(e);
			setError('Unstake failed. Please try again.');
			setFeedback(null);
		} finally {
			setIsSubmitting(false);
		}
	};

	const getPeerNodeValidation = (
		node: string
	): { variant: 'success' | 'error' | 'neutral'; message: string | null } => {
		const trimmed = node.trim();
		if (!trimmed || trimmed === 'https://' || trimmed === 'http://') return { variant: 'neutral', message: null };
		if (isValidUrl(trimmed)) return { variant: 'success', message: 'Valid URL.' };
		return { variant: 'error', message: 'Enter a valid http:// or https:// URL.' };
	};

	const submitLabel = mode === 'stake' ? language.operatorStakeSubmit : 'Unstake all';

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
				await runStake();
				return;
			}
			await runUnstake();
		} catch (e) {
			console.error(e);
			setError(language.operatorStakeContextInvalid);
			setFeedback(null);
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

						{mode === 'stake' && (
							<S.AmountFieldWrap>
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
									<S.AmountHint>{language.operatorStakeMinimumEntry}</S.AmountHint>
								</S.AmountBlock>
							</S.AmountFieldWrap>
						)}

						{mode === 'withdraw' && (
							<S.AmountFieldWrap>
								<S.AmountFieldLabel>{language.withdraw}</S.AmountFieldLabel>
								<S.AmountBlock>
									<S.AmountTopRow>
										<S.AmountInput as={'span'}>{formatAmount(staked)}</S.AmountInput>
									</S.AmountTopRow>
								</S.AmountBlock>
							</S.AmountFieldWrap>
						)}

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
									{peerNodes.map((node, index) => {
										const peerVal = getPeerNodeValidation(node);
										return (
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
												{peerVal.message && (
													<S.MetaFieldValidation $variant={peerVal.variant}>
														{peerVal.message}
													</S.MetaFieldValidation>
												)}
											</S.PeerRow>
										);
									})}
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
