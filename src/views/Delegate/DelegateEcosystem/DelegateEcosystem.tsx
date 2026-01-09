import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { AO, ASSETS, ENDPOINTS } from 'helpers/config';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

function Project(props: { index: number; project: any }) {
	return (
		<S.TableBodyRow key={props.project.id}>
			<S.TableBodyCell flex={0.075} align={'center'}>
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
				<span>{props.project.accumulated_qty}</span>
				<S.TableBodyImage hasImage={true} size={17.5}>
					<img src={ASSETS.aoCircled} />
				</S.TableBodyImage>
			</S.TableBodyCell>
			<S.TableBodyCell flex={1} align={'right'}>
				<span>{props.project.created_at_ts}</span>
			</S.TableBodyCell>
			<S.TableBodyCell flex={1} align={'right'}>
				<span>25%</span>
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

	return (
		<S.Wrapper className={'border-wrapper-primary'}>
			<S.HeaderWrapper>
				<p>{`${language.explore}.`}</p>
				<span>{`${language.pickEcosystemProjects}.`}</span>
			</S.HeaderWrapper>
			<S.BodyWrapper>
				<S.TableNavigation></S.TableNavigation>
				<S.TableHeaderRow>
					<S.TableHeaderCell flex={0.075} align={'center'}>
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
								return <Project index={index} project={project} />;
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
