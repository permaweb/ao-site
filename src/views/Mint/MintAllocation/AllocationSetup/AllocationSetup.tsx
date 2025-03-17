import React from 'react';

import { Button } from 'components/atoms/Button';
import { AO } from 'helpers/config';
import { scrollTo } from 'helpers/window';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AllocationChart } from '../AllocationChart';

import * as S from './styles';

export default function AllocationSetup() {
	const arProvider = useArweaveProvider();
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [activeAction, setActiveAction] = React.useState<'pi' | 'ao' | null>(null);

	async function handleSubmit() {
		if (!arProvider.walletAddress || !activeAction) return;
		await allocationProvider.savePreferences(true);
		scrollTo(0, 0, 'smooth');
	}

	function handleSelect(id: 'pi' | 'ao') {
		if (arProvider.walletAddress) {
			let recipient: string;
			switch (id) {
				case 'pi':
					recipient = AO.piProcess;
					break;
				case 'ao':
					recipient = arProvider.walletAddress;
					break;
			}

			allocationProvider.addFullToken({ id: recipient, label: language[id] });
			setActiveAction(id);
		}
	}

	function getAction() {
		let label: string;
		let action: () => void;
		let disabled = false;

		if (arProvider.walletAddress) {
			label = language.saveOptions;
			action = () => handleSubmit();
			disabled = !activeAction;
		} else {
			label = language.connectArWallet;
			action = () => arProvider.setWalletModalVisible(true);
		}

		if (allocationProvider.loading) disabled = true;

		return (
			<Button
				type={'alt1'}
				label={label}
				handlePress={action}
				disabled={disabled}
				loading={allocationProvider.loading}
				height={60}
				width={350}
			/>
		);
	}

	return (
		<S.Wrapper>
			<S.ActionsWrapper>
				<S.Action
					active={activeAction === 'pi'}
					onClick={() => handleSelect('pi')}
					disabled={activeAction === 'pi'}
					className={'fade-in'}
				>
					<S.ActionTitle>
						<span>{language.pi}</span>
					</S.ActionTitle>
					<S.ActionDescription>
						<p>{language.piSummary}</p>
					</S.ActionDescription>
					<S.ActionChart>
						<AllocationChart
							records={[
								{ id: 'ao', label: language.ao, value: 0.33 },
								{ id: 'arweave', label: language.ar, value: 0.33 },
								{ id: 'ecosystem', label: language.ecoProjects, value: 0.33 },
							]}
						/>
					</S.ActionChart>
				</S.Action>
				<S.Action
					active={activeAction === 'ao'}
					onClick={() => handleSelect('ao')}
					disabled={activeAction === 'ao'}
					className={'fade-in'}
				>
					<S.ActionTitle>
						<span>{language.ao}</span>
					</S.ActionTitle>
					<S.ActionDescription>
						<p>{language.aoSummary}</p>
					</S.ActionDescription>
					<S.ActionChart>
						<AllocationChart records={[{ id: 'ao', label: language.ao, value: 1 }]} />
					</S.ActionChart>
				</S.Action>
			</S.ActionsWrapper>
			<S.SubmitWrapper>{getAction()}</S.SubmitWrapper>
		</S.Wrapper>
	);
}
