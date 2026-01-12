import React from 'react';

import { Button } from 'components/atoms/Button';
import { ASSETS, ENDPOINTS } from 'helpers/config';
import { formatNumber, formatPercentage, getRelativeDate, parseBigIntAsNumber } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

function Project(props: { index: number; project: any; totalDelegated: string }) {
	const arProvider = useArweaveProvider();
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	function getAllocation() {
		if (!arProvider.walletAddress) return <span>-</span>;

		const existingRecord = allocationProvider.records?.find((allocation) => allocation.id === props.project.id);

		if (existingRecord) {
			return (
				<>
					<span>{formatPercentage(existingRecord.value)}</span>
				</>
			);
		}

		return (
			<Button
				type={'alt2'}
				label={language.add}
				handlePress={() =>
					allocationProvider.addToken({
						id: props.project.id,
						label: props.project.flp_token_ticker,
					})
				}
				icon={ASSETS.plus}
			/>
		);
	}

	return (
		<S.TableBodyRow>
			<S.TableBodyCell flex={0.075} width={50} align={'center'}>
				<span>{props.index}</span>
			</S.TableBodyCell>
			<S.TableBodyCell flex={1.5} align={'left'}>
				<S.TableBodyImage hasImage={props.project.flp_token_logo}>
					{props.project.flp_token_logo && (
						<img src={ENDPOINTS.tx(props.project.flp_token_logo)} alt={'Project Logo'} />
					)}
				</S.TableBodyImage>
				<span>{props.project.flp_name ?? '-'}</span>
			</S.TableBodyCell>
			<S.TableBodyCell flex={1} align={'right'}>
				<span>{formatNumber(props.totalDelegated)}</span>
				<S.TableBodyImage hasImage={true} size={17.5}>
					<img src={ASSETS.aoCircled} />
				</S.TableBodyImage>
			</S.TableBodyCell>
			<S.TableBodyCell flex={1} align={'right'}>
				<span>{getRelativeDate(props.project.starts_at_ts)}</span>
			</S.TableBodyCell>
			<S.TableBodyCell flex={1} align={'right'}>
				{getAllocation()}
			</S.TableBodyCell>
		</S.TableBodyRow>
	);
}

// TODO
export default function DelegateEcosystem() {
	const arProvider = useArweaveProvider();
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentProjects, setCurrentProjects] = React.useState<any[] | null>(null);

	React.useEffect(() => {
		if (allocationProvider?.projects?.length > 0) {
			setCurrentProjects(allocationProvider.projects);
		}
	}, [allocationProvider?.projects]);

	const totalProjectYields = React.useMemo(() => {
		if (!allocationProvider.totalDelegated || !allocationProvider.totalDelegated.combined) return {};

		return Object.entries(allocationProvider.totalDelegated.combined).reduce((acc, [key, value]: any) => {
			acc[key] = Number(parseBigIntAsNumber(value || '0', 12));
			return acc;
		}, {});
	}, [allocationProvider.totalDelegated]);

	const totalDelegatedByProject = (flpId) => {
		return totalProjectYields[flpId] || 0;
	};

	return (
		<S.Wrapper className={'border-wrapper-primary'}>
			<S.HeaderWrapper>
				<p>{`${language.explore}.`}</p>
				<span>{`${language.pickEcosystemProjects}.`}</span>
			</S.HeaderWrapper>
			<S.BodyWrapper>
				<S.TableNavigation></S.TableNavigation>
				<S.TableHeaderRow>
					<S.TableHeaderCell flex={0.075} width={50} align={'center'}>
						<span>#</span>
					</S.TableHeaderCell>
					<S.TableHeaderCell flex={1.5} align={'left'}>
						<span>Project</span>
					</S.TableHeaderCell>
					<S.TableHeaderCell flex={1} align={'right'}>
						<span>Total AO Delegated</span>
					</S.TableHeaderCell>
					<S.TableHeaderCell flex={1} align={'right'}>
						<span>Launched</span>
					</S.TableHeaderCell>
					<S.TableHeaderCell flex={1} align={'right'}>
						<span>Manage</span>
					</S.TableHeaderCell>
				</S.TableHeaderRow>
				<S.Table>
					{currentProjects ? (
						<>
							{currentProjects.map((project, index) => {
								return (
									<Project
										key={project.id}
										index={index}
										project={project}
										totalDelegated={totalDelegatedByProject(project.id)}
									/>
								);
							})}
						</>
					) : (
						<S.TableLoading>
							<span>{`${language.loading}...`}</span>
						</S.TableLoading>
					)}
				</S.Table>
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
