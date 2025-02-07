import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Panel } from 'components/atoms/Panel';
// import { dryrun } from '@permaweb/aoconnect';
import { AO, ASSETS, ENDPOINTS } from 'helpers/config';
import { AllocationRecordType } from 'helpers/types';
import { checkValidAddress, formatAddress, formatDate, getTagValue } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function AllocationCustom() {
	const allocationProvider = useAllocationProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const PROJECT_1 = {
		decay_factor: 0.5,
		flp_token: 'k3K6_wPHkyYLrZEfeIBvbzW3ne6X7jCgzikBkQcXOO8',
		status: 'AwaitingInitialDeposit',
		flp_id: '5sGEKUtMTmzd7Et5BAaBjRibTHwfc3_lqiXa8XXhxuk',
		flp_ticker: 'PIXL',
		token_supply_to_use: '10000000000000000000',
		withdrawn_qty: '0',
		flp_name: 'Bazar',
		id: '5sGEKUtMTmzd7Et5BAaBjRibTHwfc3_lqiXa8XXhxuk',
		ends_at_ts: 1739636493818,
		stats_updated_at: 1738772983923,
		initializer: 'P6i7xXWuZtuKJVJYNwEqduj0s8R_G4wZJ38TB5Knpy4',
		accumulated_qty: '0',
		starts_at_ts: 1738858893818,
		treasury: 'P6i7xXWuZtuKJVJYNwEqduj0s8R_G4wZJ38TB5Knpy4',
		created_at_ts: 1738772983923,
		last_updated_at_ts: 1738772983923,
		distributed_qty: '0',
		total_token_supply: '"1000000000000000000000000000"',
		deployer: 'P6i7xXWuZtuKJVJYNwEqduj0s8R_G4wZJ38TB5Knpy4',
		// ADDED_FIELDS
		token_denomination: 12,
		short_description: 'Atomic Asset Marketplace',
		long_description: `Explore a dynamic atomic asset marketplace where you can discover unique digital assets. Engage with a community of creators and collectors, and trade with confidence knowing each transaction is secure and transparent. Whether you're a seasoned trader or new to the world of digital assets, our platform offers the tools and resources you need to succeed.`,
		disclaimer: `PI/AO not available in Restricted Jurisdictions. It is your obligation to ensure your acquisition of PI/AO does not violate applicable laws in your jurisdiction.`,
		logo: 'k3Wh9FznFjK_Yb2qiIMoxvLFUQruo4oM24mM4ZY3diY',
		website: 'https://bazar.arweave.net',
		links: {
			x: 'https://x.com/OurBazAR',
			discord: 'https://discord.com/invite/weavers',
			github: 'https://github.com/permaweb/bazar',
		},
	};

	const [projects, setProjects] = React.useState<any[] | null>([PROJECT_1]);
	const [selectedProjects, setSelectedProjects] = React.useState<any[]>([]);
	const [activeProject, setActiveProject] = React.useState<any | null>(null);
	const [copied, setCopied] = React.useState<boolean>(false);

	// TODO
	// React.useEffect(() => {
	// 	(async function () {
	// 		try {
	// 			const response = await dryrun({
	// 				process: AO.flpFactory,
	// 				tags: [{ name: 'Action', value: 'Get-FLPs' }]
	// 			});

	// 			if (response?.Messages?.[0]?.Data) {
	// 				setProjects(JSON.parse(response.Messages[0].Data));
	// 			}

	// 			console.log(response);
	// 		}
	// 		catch (e: any) {
	// 			setProjects([])
	// 		}
	// 	})();
	// }, []);

	React.useEffect(() => {
		if (!projects || !allocationProvider.records) return;
		setSelectedProjects(
			projects.filter((project) => allocationProvider.records.some((record) => record.id === project.id))
		);
	}, [projects, allocationProvider.records]);

	const currentAllocationRecord = allocationProvider.records?.find(
		(record: AllocationRecordType) => record.id === activeProject?.id
	);

	// async function handleSave() {
	// 	if (activeProject) {
	// 		if (currentAllocationRecord) {
	// 			allocationProvider.removeToken({
	// 				id: activeProject.id,
	// 				label: activeProject.flp_ticker,
	// 			});
	// 		} else {
	// 			allocationProvider.addToken({
	// 				id: activeProject.id,
	// 				label: activeProject.flp_ticker,
	// 			});
	// 		}

	// 		await allocationProvider.savePreferences();
	// 	}
	// }

	const toggleSelection = (project: any) => {
		const existingProjects = [...selectedProjects];
		const exists = existingProjects.some((project) => project.id === project.id);

		if (exists) {
			setSelectedProjects((prev) => prev.filter((item) => item !== project.id));
			allocationProvider.removeToken({ id: project.id, label: project.flp_ticker });
		} else {
			setSelectedProjects((prev) => [...prev, project.id]);
			allocationProvider.addToken({ id: project.id, label: project.flp_ticker });
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
					allocationProvider.isTokenDisabled({ id: activeProject?.id, label: activeProject?.flp_ticker })
				}
				loading={allocationProvider.loading}
				icon={currentAllocationRecord ? ASSETS.remove : ASSETS.add}
				iconLeftAlign
			/>
		);
	}

	function getProjectLinks(project: any) {
		if (!project?.links) return null;

		return (
			<>
				{Object.keys(project.links).map((key: string, index: number) => {
					return (
						<S.ProjectLink key={index}>
							<Link to={project.links[key]} target={'_blank'} onClick={(e) => e.stopPropagation()}>
								<ReactSVG src={ASSETS[key] ?? ASSETS.link} />
							</Link>
						</S.ProjectLink>
					);
				})}
			</>
		);
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
						const isActive = selectedProjects.some((project) => project.id === project.id);

						return (
							<S.GridElement key={index} className={'fade-in'}>
								<S.Project active={isActive} onClick={() => toggleSelection(project)}>
									<S.ProjectHeader>
										<S.ProjectHeaderDetails>
											<S.ProjectLogo>
												<img
													src={
														project.logo && checkValidAddress(project.logo)
															? ENDPOINTS.arTxEndpoint(project.logo)
															: ASSETS.token
													}
												/>
											</S.ProjectLogo>
											<S.ProjectTitle>
												<span>{project.flp_name}</span>
											</S.ProjectTitle>
										</S.ProjectHeaderDetails>
										<S.ProjectIndex active={isActive}>
											<span className={'indicator'}>{`${project.flp_ticker} # ${index + 1}`}</span>
										</S.ProjectIndex>
									</S.ProjectHeader>
									<S.ProjectLinks>
										{project.website && (
											<S.ProjectLink>
												<Link to={project.website} target={'_blank'} onClick={(e) => e.stopPropagation()}>
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
											activeProject?.logo && checkValidAddress(activeProject?.logo)
												? ENDPOINTS.arTxEndpoint(activeProject.logo)
												: ASSETS.token
										}
									/>
								</S.ProjectLogo>
								<S.ProjectTitle>
									<span>{activeProject?.flp_name}</span>
								</S.ProjectTitle>
							</S.ProjectHeaderDetails>
							<S.ProjectIndex active={false}>
								<span className={'indicator'}>{activeProject?.flp_ticker}</span>
							</S.ProjectIndex>
						</S.ProjectHeader>
						<S.ProjectLinks>
							{activeProject?.website && (
								<S.ProjectLink>
									<Link to={activeProject.website} target={'_blank'} onClick={(e) => e.stopPropagation()}>
										<ReactSVG src={ASSETS.website} />
									</Link>
								</S.ProjectLink>
							)}
							{getProjectLinks(activeProject)}
						</S.ProjectLinks>
						<S.ProjectBody>
							<S.ProjectId onClick={() => copyTokenId(activeProject?.flp_token ?? '-')}>
								<span>{`${language.tokenId}:`}</span>
								<p>{activeProject?.flp_token ? formatAddress(activeProject.flp_token, false) : '-'}</p>
								<ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} />
							</S.ProjectId>
							<S.ProjectShortDescription>
								<p className={'primary-text'}>{activeProject?.short_description ?? 'No description'}</p>
							</S.ProjectShortDescription>
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
