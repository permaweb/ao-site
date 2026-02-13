import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { AllocationDisplay } from 'components/atoms/AllocationDisplay';
import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { ASSETS, ENDPOINTS } from 'helpers/config';
import { FLPTabType } from 'helpers/types';
import {
	checkValidAddress,
	formatAddress,
	formatDate,
	formatNumber,
	getRelativeDate,
	parseBigIntAsNumber,
} from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

function Project(props: { index: number; project: any; totalDelegated: string }) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [copied, setCopied] = React.useState<boolean>(false);

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const copyTokenId = React.useCallback(async (address: string) => {
		if (address) {
			if (address.length > 0) {
				await navigator.clipboard.writeText(address);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, []);

	return (
		<S.TableBodyRowWrapper>
			<S.TableBodyRow onClick={() => setOpen((prev) => !prev)} open={open}>
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
					<AllocationDisplay
						processId={props.project.id}
						tokenId={props.project.id}
						tokenLabel={props.project.flp_token_ticker}
						showAllocatedLabel={true}
					/>
				</S.TableBodyCell>
			</S.TableBodyRow>
			{open && (
				<S.TableBodyRowDetail>
					<S.PanelWrapper>
						<S.PanelWrapperStart>
							<S.ProjectHeader>
								<S.ProjectHeaderDetails>
									<S.ProjectLogo>
										<img
											src={
												props.project?.flp_token_logo && checkValidAddress(props.project?.flp_token_logo)
													? ENDPOINTS.arTxEndpoint(props.project.flp_token_logo)
													: ASSETS.token
											}
										/>
									</S.ProjectLogo>
									<S.ProjectTitle>
										<span>{props.project?.flp_name}</span>
									</S.ProjectTitle>
								</S.ProjectHeaderDetails>
								<S.ProjectIndex active={false}>
									<span className={'indicator'}>{props.project?.flp_token_ticker}</span>
								</S.ProjectIndex>
							</S.ProjectHeader>
							<S.ProjectLinks>
								{props.project?.website_url && (
									<S.ProjectLink>
										<Link to={props.project.website_url} target={'_blank'} onClick={(e) => e.stopPropagation()}>
											<ReactSVG src={ASSETS.website} />
										</Link>
									</S.ProjectLink>
								)}
								{props.project?.twitter_handle && (
									<S.ProjectLink>
										<Link
											to={`https://x.com/${props.project.twitter_handle}`}
											target={'_blank'}
											onClick={(e) => e.stopPropagation()}
										>
											<ReactSVG src={ASSETS.x} />
										</Link>
									</S.ProjectLink>
								)}
							</S.ProjectLinks>
							<S.ProjectBody>
								<S.ProjectId onClick={() => copyTokenId(props.project?.flp_token_process ?? '-')}>
									<span>{`${language.tokenId}:`}</span>
									<p>
										{props.project?.flp_token_process ? formatAddress(props.project.flp_token_process, false) : '-'}
									</p>
									<ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} />
								</S.ProjectId>
								{props.project?.flp_short_description && (
									<S.ProjectShortDescription>
										<p>{props.project?.flp_short_description ?? 'No description'}</p>
									</S.ProjectShortDescription>
								)}
								{props.project?.flp_long_description && (
									<S.ProjectLongDescription>
										<p>{props.project.flp_long_description}</p>
									</S.ProjectLongDescription>
								)}
								<S.ProjectLinesWrapper>
									<S.ProjectLineWrapper>
										<S.ProjectInfoLine>
											<span className={'primary-text'}>{language.startDate}</span>
											<p>
												{props.project?.starts_at_ts ? formatDate(props.project.starts_at_ts, 'dateString') : 'None'}
											</p>
										</S.ProjectInfoLine>
										<S.ProjectInfoLine>
											<span className={'primary-text'}>{language.endDate}</span>
											<p>{props.project?.ends_at_ts ? formatDate(props.project.ends_at_ts, 'dateString') : 'None'}</p>
										</S.ProjectInfoLine>
									</S.ProjectLineWrapper>
								</S.ProjectLinesWrapper>
							</S.ProjectBody>
						</S.PanelWrapperStart>
						{props.project?.disclaimer && (
							<S.PanelWrapperEnd>
								<S.ProjectDisclaimer>
									<p>{props.project.disclaimer}</p>
								</S.ProjectDisclaimer>
							</S.PanelWrapperEnd>
						)}
					</S.PanelWrapper>
				</S.TableBodyRowDetail>
			)}
		</S.TableBodyRowWrapper>
	);
}

export default function DelegateEcosystem() {
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentTab, setCurrentTab] = React.useState<FLPTabType>('featured');
	const [currentProjects, setCurrentProjects] = React.useState<any[] | null>(null);
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [visibleCount, setVisibleCount] = React.useState<number>(10);

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

	React.useEffect(() => {
		if (allocationProvider?.projects?.length > 0) {
			const query = searchQuery.toLowerCase();

			let filteredProjects = allocationProvider.projects;

			if (query) {
				filteredProjects = allocationProvider.projects.filter(
					(flp) =>
						flp.id?.toLowerCase().includes(query) ||
						flp.flp_name?.toLowerCase().includes(query) ||
						flp.flp_token_name?.toLowerCase().includes(query) ||
						flp.flp_token_ticker?.toLowerCase().includes(query) ||
						flp.flp_token_process?.toLowerCase().includes(query)
				);
			}

			const sortedProjects = [...filteredProjects].sort((a, b) => {
				switch (currentTab) {
					case 'featured':
						const aDelegated = totalProjectYields[a.id] || 0;
						const bDelegated = totalProjectYields[b.id] || 0;
						return bDelegated - aDelegated;
					case 'all':
					default:
						return (b.starts_at_ts || 0) - (a.starts_at_ts || 0);
				}
			});
			setCurrentProjects(sortedProjects);
		}
	}, [allocationProvider?.projects, currentTab, totalProjectYields, searchQuery]);

	React.useEffect(() => {
		setVisibleCount(10);
	}, [currentTab, searchQuery]);

	return (
		<S.Wrapper>
			<S.TableWrapper className={'border-wrapper-primary'}>
				<S.HeaderWrapper>
					<p>{`${language.explore}.`}</p>
					<span>{`${language.pickEcosystemProjects}.`}</span>
				</S.HeaderWrapper>
				<S.BodyWrapper>
					<S.TableNavigation>
						<S.TabsWrapper>
							<S.Tab active={currentTab === 'featured'}>
								<Button
									type={'primary'}
									label={'Popular Delegations'}
									handlePress={() => setCurrentTab('featured')}
									active={currentTab === 'featured'}
									icon={ASSETS.trendUp}
									iconLeftAlign
								/>
							</S.Tab>
							<S.Tab active={currentTab === 'all'}>
								<Button
									type={'primary'}
									label={'Explore Delegations'}
									handlePress={() => setCurrentTab('all')}
									active={currentTab === 'all'}
									icon={ASSETS.searchList}
									iconLeftAlign
								/>
							</S.Tab>
						</S.TabsWrapper>
						<S.SearchWrapper>
							<FormField
								value={searchQuery}
								onChange={(e: any) => setSearchQuery(e.target.value)}
								disabled={false}
								invalid={{ status: false, message: null }}
								placeholder={'Search for Project...'}
								hideErrorMessage
							/>
							<ReactSVG src={ASSETS.search} />
						</S.SearchWrapper>
					</S.TableNavigation>
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
							<span>Allocation</span>
						</S.TableHeaderCell>
					</S.TableHeaderRow>
					<S.Table>
						{currentProjects ? (
							<>
								{currentProjects.length > 0 ? (
									<>
										{currentProjects.slice(0, visibleCount).map((project, index) => {
											return (
												<Project
													key={project.id}
													index={index + 1}
													project={project}
													totalDelegated={totalDelegatedByProject(project.id)}
												/>
											);
										})}
									</>
								) : (
									<S.TableEmpty>
										<span>No Results</span>
									</S.TableEmpty>
								)}
							</>
						) : (
							<S.TableEmpty>
								<span>{`${language.loading}...`}</span>
							</S.TableEmpty>
						)}
					</S.Table>
				</S.BodyWrapper>
			</S.TableWrapper>
			{currentProjects && currentProjects.length > visibleCount && (
				<S.LoadMoreWrapper>
					<Button
						type={'primary'}
						label={'Load More'}
						handlePress={() => setVisibleCount((prev) => prev + 10)}
						height={45}
						width={175}
					/>
				</S.LoadMoreWrapper>
			)}
		</S.Wrapper>
	);
}
