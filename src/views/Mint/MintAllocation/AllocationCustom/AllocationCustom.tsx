import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { dryrun } from '@permaweb/aoconnect';

import { Button } from 'components/atoms/Button';
import { Panel } from 'components/atoms/Panel';
import { AO, ASSETS, ENDPOINTS } from 'helpers/config';
import { AllocationRecordType } from 'helpers/types';
import { checkValidAddress, formatAddress, formatDate } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function AllocationCustom() {
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [projects, setProjects] = React.useState<any[] | null>(null);
	const [selectedProjects, setSelectedProjects] = React.useState<any[]>([]);
	const [activeProject, setActiveProject] = React.useState<any | null>(null);
	const [copied, setCopied] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			try {
				const response = await dryrun({
					process: AO.flpFactory,
					tags: [{ name: 'Action', value: 'Get-FLPs' }],
				});

				if (response?.Messages?.[0]?.Data) {
					setProjects(JSON.parse(response.Messages[0].Data));
				}
			} catch (e: any) {
				setProjects([]);
			}
		})();
	}, []);

	React.useEffect(() => {
		if (!projects || !allocationProvider.records) return;
		setSelectedProjects(
			projects.filter((project) => allocationProvider.records.some((record) => record.id === project.id))
		);
	}, [projects, allocationProvider.records]);

	const currentAllocationRecord = allocationProvider.records?.find(
		(record: AllocationRecordType) => record.id === activeProject?.id
	);

	const toggleSelection = (project: any) => {
		const existingProjects = [...selectedProjects];
		const exists = existingProjects.some((existingProject) => existingProject.id === project.id);

		if (exists) {
			setSelectedProjects((prev) => prev.filter((item) => item !== project.id));
			allocationProvider.removeToken({ id: project.id, label: project.flp_token_ticker });
		} else {
			setSelectedProjects((prev) => [...prev, project.id]);
			allocationProvider.addToken({ id: project.id, label: project.flp_token_ticker });
		}
	};

	function getTokenAction() {
		return (
			<Button
				type={currentAllocationRecord ? 'primary' : 'alt1'}
				label={currentAllocationRecord ? language.remove : language.add}
				handlePress={() => {
					toggleSelection(activeProject);
					setActiveProject(null);
				}}
				disabled={
					allocationProvider.loading ||
					allocationProvider.isTokenDisabled({ id: activeProject?.id, label: activeProject?.flp_token_ticker })
				}
				loading={allocationProvider.loading}
				icon={currentAllocationRecord ? ASSETS.remove : ASSETS.add}
				iconLeftAlign
			/>
		);
	}

	function getProjectLinks(project: any) {
		return (
			<>
				{project?.twitter_handle?.length > 0 && (
					<S.ProjectLink>
						<Link to={`https://x.com/${project.twitter_handle}`} target={'_blank'} onClick={(e) => e.stopPropagation()}>
							<ReactSVG src={ASSETS.x} />
						</Link>
					</S.ProjectLink>
				)}
			</>
		);

		// return (
		// 	<>
		// 		{Object.keys(project.links).map((key: string, index: number) => {
		// 			return (
		// 				<S.ProjectLink key={index}>
		// 					<Link to={project.links[key]} target={'_blank'} onClick={(e) => e.stopPropagation()}>
		// 						<ReactSVG src={ASSETS[key] ?? ASSETS.link} />
		// 					</Link>
		// 				</S.ProjectLink>
		// 			);
		// 		})}
		// 	</>
		// );
	}

	const copyTokenId = React.useCallback(async (address: string) => {
		if (address) {
			if (address.length > 0) {
				await navigator.clipboard.writeText(address);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, []);

	function getProjects() {
		if (!projects) {
			return (
				<S.LoadingWrapper>
					<span>{`${language.gettingProjects}...`}</span>
				</S.LoadingWrapper>
			);
		} else if (projects.length <= 0) {
			return (
				<S.EmptyWrapper>
					<span>{language.noProjectsFound}</span>
				</S.EmptyWrapper>
			);
		} else {
			return (
				<S.GridWrapper>
					{projects.map((project, index) => {
						const isActive = selectedProjects.some((selectedProject) => selectedProject.id === project.id);

						return (
							<S.GridElement key={index} className={'fade-in'}>
								<S.Project active={isActive} onClick={() => toggleSelection(project)}>
									<S.ProjectHeader>
										<S.ProjectHeaderDetails>
											<S.ProjectLogo>
												<img
													src={
														project.flp_token_logo && checkValidAddress(project.flp_token_logo)
															? ENDPOINTS.arTxEndpoint(project.flp_token_logo)
															: ASSETS.token
													}
												/>
											</S.ProjectLogo>
											<S.ProjectTitle>
												<span>{project.flp_name ?? '-'}</span>
											</S.ProjectTitle>
										</S.ProjectHeaderDetails>
										<S.ProjectIndex active={isActive}>
											<span className={'indicator'}>{`${project.flp_token_ticker ?? '-'} # ${index + 1}`}</span>
										</S.ProjectIndex>
									</S.ProjectHeader>
									<S.ProjectLinks>
										{project.website_url && (
											<S.ProjectLink>
												<Link to={project.website_url} target={'_blank'} onClick={(e) => e.stopPropagation()}>
													<ReactSVG src={ASSETS.website} />
												</Link>
											</S.ProjectLink>
										)}
										{getProjectLinks(project)}
									</S.ProjectLinks>
									<S.ProjectBody>
										<S.ProjectShortDescription>
											<p className={'primary-text'}>{project.short_description ?? 'No description'}</p>
										</S.ProjectShortDescription>
									</S.ProjectBody>
									<S.ProjectFooter>
										<Button
											type={'alt3'}
											label={'Details'}
											handlePress={(e: any) => {
												e.stopPropagation();
												setActiveProject(project);
											}}
											icon={ASSETS.plus}
											iconLeftAlign
										/>
										{isActive && (
											<S.IndicatorWrapper>
												<span className={'primary-text'}>Added</span>
												<ReactSVG src={ASSETS.checkmark} />
											</S.IndicatorWrapper>
										)}
									</S.ProjectFooter>
								</S.Project>
							</S.GridElement>
						);
					})}
				</S.GridWrapper>
			);
		}
	}

	return (
		<>
			<S.Wrapper>
				<S.Header>
					<S.HeaderTitle>
						<p>{language.tokenCustomization}</p>
					</S.HeaderTitle>
				</S.Header>
				<S.Body>{getProjects()}</S.Body>
			</S.Wrapper>
			<Panel
				open={activeProject}
				width={550}
				header={language.ecosystemProjects}
				handleClose={() => setActiveProject(null)}
				closeHandlerDisabled
			>
				<S.PanelWrapper>
					<S.PanelWrapperStart>
						<S.ProjectHeader>
							<S.ProjectHeaderDetails>
								<S.ProjectLogo>
									<img
										src={
											activeProject?.flp_token_logo && checkValidAddress(activeProject?.flp_token_logo)
												? ENDPOINTS.arTxEndpoint(activeProject.flp_token_logo)
												: ASSETS.token
										}
									/>
								</S.ProjectLogo>
								<S.ProjectTitle>
									<span>{activeProject?.flp_name}</span>
								</S.ProjectTitle>
							</S.ProjectHeaderDetails>
							<S.ProjectIndex active={false}>
								<span className={'indicator'}>{activeProject?.flp_token_ticker}</span>
							</S.ProjectIndex>
						</S.ProjectHeader>
						<S.ProjectLinks>
							{activeProject?.website_url && (
								<S.ProjectLink>
									<Link to={activeProject.website_url} target={'_blank'} onClick={(e) => e.stopPropagation()}>
										<ReactSVG src={ASSETS.website} />
									</Link>
								</S.ProjectLink>
							)}
							{getProjectLinks(activeProject)}
						</S.ProjectLinks>
						<S.ProjectBody>
							<S.ProjectId onClick={() => copyTokenId(activeProject?.flp_token_process ?? '-')}>
								<span>{`${language.tokenId}:`}</span>
								<p>{activeProject?.flp_token_process ? formatAddress(activeProject.flp_token_process, false) : '-'}</p>
								<ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} />
							</S.ProjectId>
							{activeProject?.long_description && (
								<S.ProjectShortDescription>
									<p className={'primary-text'}>{activeProject?.short_description ?? 'No description'}</p>
								</S.ProjectShortDescription>
							)}
							{activeProject?.long_description && (
								<S.ProjectLongDescription>
									<p>{activeProject.long_description}</p>
								</S.ProjectLongDescription>
							)}
							<S.ProjectLinesWrapper>
								<S.ProjectLineWrapper>
									<S.ProjectInfoLine>
										<span className={'primary-text'}>{language.startDate}</span>
										<p>{activeProject?.starts_at_ts ? formatDate(activeProject.starts_at_ts, 'timestamp') : '-'}</p>
									</S.ProjectInfoLine>
									<S.ProjectInfoLine>
										<span className={'primary-text'}>{language.endDate}</span>
										<p>{activeProject?.ends_at_ts ? formatDate(activeProject.ends_at_ts, 'timestamp') : '-'}</p>
									</S.ProjectInfoLine>
								</S.ProjectLineWrapper>
							</S.ProjectLinesWrapper>
						</S.ProjectBody>
					</S.PanelWrapperStart>
					<S.PanelWrapperEnd>
						<S.PanelActionsWrapper>
							<Button
								type={'primary'}
								label={language.close}
								handlePress={() => setActiveProject(null)}
								disabled={false}
								loading={false}
							/>
							{getTokenAction()}
						</S.PanelActionsWrapper>
						{activeProject?.disclaimer && (
							<S.ProjectDisclaimer>
								<p>{activeProject.disclaimer}</p>
							</S.ProjectDisclaimer>
						)}
					</S.PanelWrapperEnd>
				</S.PanelWrapper>
			</Panel>
		</>
	);
}
