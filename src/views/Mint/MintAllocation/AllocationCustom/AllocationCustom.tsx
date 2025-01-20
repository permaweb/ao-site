import React from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';

import * as S from './styles';

export default function AllocationCustom() {
	const [open, setOpen] = React.useState<boolean>(true);
	const [selectedProjects, setSelectedProjects] = React.useState<string[]>([]); // Track selected project titles

	const PROJECTS = [
		{ id: '1', title: 'Orbit', description: 'Decentralized app on the permaweb', token: 'ORBIT', marketCap: '154k' },
		{ id: '2', title: 'Bazar', description: 'Decentralized atomic asset exchange', token: 'PIXL', marketCap: '345k' },
		{ id: '3', title: 'Botega', description: 'Decentralized app on the permaweb', token: 'BOTEGA', marketCap: '532k' },
		{ id: '4', title: 'Orbit', description: 'Decentralized app on the permaweb', token: 'ORBIT', marketCap: '154k' },
		{ id: '5', title: 'Bazar', description: 'Decentralized atomic asset exchange', token: 'PIXL', marketCap: '345k' },
		{ id: '6', title: 'Botega', description: 'Decentralized app on the permaweb', token: 'BOTEGA', marketCap: '532k' },
	];

	const toggleSelection = (id: string) => {
		setSelectedProjects((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	return (
		<S.Wrapper>
			<S.Header open={open} onClick={() => setOpen((prev) => !prev)}>
				<S.HeaderTitle>
					<p>Token Customization</p>
				</S.HeaderTitle>
				<S.HeaderEndWrapper open={open}>
					<ReactSVG src={ASSETS.arrow} />
				</S.HeaderEndWrapper>
			</S.Header>
			{open && (
				<S.Body>
					<S.GridWrapper>
						{PROJECTS.map((project, index) => {
							const isActive = selectedProjects.includes(project.id);

							return (
								<S.GridElement key={index} className={'fade-in'}>
									<S.Project active={isActive} onClick={() => toggleSelection(project.id)}>
										<S.ProjectHeader>
											<S.ProjectTitle>
												<span>{project.title}</span>
											</S.ProjectTitle>
											<S.ProjectIndex active={isActive}>
												<span className={'indicator'}>{`# ${index + 1}`}</span>
											</S.ProjectIndex>
										</S.ProjectHeader>
										<S.ProjectBody>
											<S.ProjectDescription>
												<p className={'primary-text'}>{project.description}</p>
											</S.ProjectDescription>
										</S.ProjectBody>
										<S.ProjectFooter>
											<S.ProjectMarketCap>
												<S.ProjectMarketCapHeader>
													<span className={'primary-text'}>Marketcap</span>
												</S.ProjectMarketCapHeader>
												<S.ProjectMarketCapValue>
													<p>
														<span className={'indicator'}>$</span>
														{project.marketCap}
													</p>
												</S.ProjectMarketCapValue>
											</S.ProjectMarketCap>
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
				</S.Body>
			)}
		</S.Wrapper>
	);
}
