import React from 'react';

import { Button } from 'components/atoms/Button';
import { scrollTo } from 'helpers/window';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { AllocationChart } from '../AllocationChart';

import * as S from './styles';

export default function AllocationSetup() {
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [activeAction, setActiveAction] = React.useState<'pi' | 'ao' | null>(null);

	function handleSubmit() {
		if (!activeAction) return;

		switch (activeAction) {
			case 'pi':
				allocationProvider.addToken({ id: 'pi', label: 'PI' });
				break;
			case 'ao':
				allocationProvider.addToken({ id: 'ao', label: 'AO' });
				break;
		}

		scrollTo(0, 0, 'smooth');
	}

	return (
		<S.Wrapper>
			<S.ActionsWrapper>
				<S.Action active={activeAction === 'pi'} onClick={() => setActiveAction('pi')} className={'fade-in'}>
					<S.ActionTitle>
						<span>{language.pi}</span>
					</S.ActionTitle>
					<S.ActionDescription>
						<p>{language.piDescription}</p>
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
				<S.Action active={activeAction === 'ao'} onClick={() => setActiveAction('ao')} className={'fade-in'}>
					<S.ActionTitle>
						<span>{language.ao}</span>
					</S.ActionTitle>
					<S.ActionDescription>
						<p>{language.aoDescription}</p>
					</S.ActionDescription>
					<S.ActionChart>
						<AllocationChart records={[{ id: 'ao', label: 'AO', value: 1 }]} />
					</S.ActionChart>
				</S.Action>
			</S.ActionsWrapper>
			<S.SubmitWrapper>
				<Button
					type={'alt1'}
					label={language.saveOptions}
					handlePress={handleSubmit}
					disabled={!activeAction}
					height={60}
					width={350}
				/>
			</S.SubmitWrapper>
		</S.Wrapper>
	);
}
