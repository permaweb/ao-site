import React from 'react';

import { Button } from 'components/atoms/Button';
import { useAllocationProvider } from 'providers/AllocationProvider';

import { AllocationChart } from '../AllocationChart';

import * as S from './styles';

export default function AllocationSetup() {
	const allocationProvider = useAllocationProvider();

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
	}

	return (
		<S.Wrapper>
			<S.ActionsWrapper>
				<S.Action active={activeAction === 'pi'} onClick={() => setActiveAction('pi')} className={'fade-in'}>
					<S.ActionTitle>
						<span>PI</span>
					</S.ActionTitle>
					<S.ActionDescription>
						<p>
							Allocate your AO Yield into a diversified collection of tokens that make up the permaweb including AO,
							Arweave, and eocsystem project tokens.
						</p>
					</S.ActionDescription>
					<S.ActionChart>
						<AllocationChart
							records={[
								{ id: 'ao', label: 'AO', value: 0.33 },
								{ id: 'arweave', label: 'AR', value: 0.33 },
								{ id: 'ecosystem', label: 'ECO Projects', value: 0.33 },
							]}
						/>
					</S.ActionChart>
				</S.Action>
				<S.Action active={activeAction === 'ao'} onClick={() => setActiveAction('ao')} className={'fade-in'}>
					<S.ActionTitle>
						<span>AO</span>
					</S.ActionTitle>
					<S.ActionDescription>
						<p>
							Continue earning AO. All AR holding yield and deposits will continue to accrue AO that will not be
							re-allocated in any way.
						</p>
					</S.ActionDescription>
					<S.ActionChart>
						<AllocationChart records={[{ id: 'ao', label: 'AO', value: 1 }]} />
					</S.ActionChart>
				</S.Action>
			</S.ActionsWrapper>
			<S.SubmitWrapper>
				<Button
					type={'alt1'}
					label={'Save Options'}
					handlePress={handleSubmit}
					disabled={!activeAction}
					height={60}
					width={350}
				/>
			</S.SubmitWrapper>
		</S.Wrapper>
	);
}
