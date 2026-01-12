import { Button } from 'components/atoms/Button';
import { AO, ASSETS } from 'helpers/config';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function DelegateCore() {
	const arProvider = useArweaveProvider();
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const CORE_PROJECTS = [
		{
			id: 'pi',
			name: 'Permaweb Index',
			ticker: 'PI',
			logo: ASSETS.pi,
			disabled: false,
			process: AO.piProcess,
			description:
				'Diversify your AO rewards with PI, a token representing the permaweb. PI is composed of 1/3 AO, 1/3 Arweave (AR), and 1/3 ecosystem project tokens.',
		},
		{
			id: 'arweave',
			name: 'Arweave',
			ticker: 'AR',
			logo: ASSETS.arweave,
			disabled: true,
			process: '',
			description:
				'Turn your AO yield into Arweave. Your AO yield will return you back AR tokens for permanent data storage use.',
		},
		{
			id: 'ao',
			name: 'AO',
			ticker: 'AO',
			logo: ASSETS.aoCircled,
			disabled: false,
			process: arProvider.walletAddress,
			description:
				'Keep earning AO. Your AR holding yield and deposits will continue to accrue AO without any reallocation.',
		},
	];

	function getSectionAllocation(project) {
		if (!arProvider.walletAddress) return <span>-</span>;

		const existingRecord = allocationProvider.records?.find((allocation) => allocation.id === project.process);

		if (existingRecord) {
			return (
				<>
					<p>{formatPercentage(existingRecord.value)}</p>
					<span>{`Allocated`}</span>
				</>
			);
		}

		if (project.disabled) {
			return <span>{`Coming Soon`}</span>;
		}

		return (
			<Button
				type={'alt2'}
				label={language.add}
				handlePress={() =>
					allocationProvider.addToken({
						id: project.id,
						label: project.ticker,
					})
				}
				disabled={project.disabled}
				icon={ASSETS.plus}
			/>
		);
	}

	return (
		<S.Wrapper className={'border-wrapper-primary'}>
			<S.HeaderWrapper>
				<p>{`${language.getStarted}.`}</p>
				<span>{`${language.addCoreProjects}.`}</span>
			</S.HeaderWrapper>
			<S.BodyWrapper>
				{CORE_PROJECTS.map((project) => {
					return (
						<S.BodySection key={project.id}>
							<S.BodySectionHeader>
								<p>{project.name}</p>
								<span>{`$${project.ticker}`}</span>
							</S.BodySectionHeader>
							<S.BodySectionDescription>
								<p>{project.description}</p>
							</S.BodySectionDescription>
							<S.BodySectionAction>{getSectionAllocation(project)}</S.BodySectionAction>
						</S.BodySection>
					);
				})}
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
