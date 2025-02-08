import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { HyperTextLoad } from 'components/atoms/HyperTextLoad';
import { IconButton } from 'components/atoms/IconButton';
import { Panel } from 'components/atoms/Panel';
import { ASSETS, REDIRECTS, URLS } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Header() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showPanel, setShowPanel] = React.useState<boolean>(false);

	const paths: { path: string; label: string; target?: '_blank' }[] = [
		{ path: URLS.mintDeposits, label: language.mint },
		{ path: REDIRECTS.cookbook, label: language.build, target: '_blank' },
	];

	const socials: { redirect: string; icon: string }[] = [
		{ redirect: REDIRECTS.x, icon: ASSETS.x },
		{ redirect: REDIRECTS.github, icon: ASSETS.github },
		{ redirect: REDIRECTS.discord, icon: ASSETS.discord },
	];

	return (
		<>
			<S.Wrapper id={'site-header'}>
				<S.Content className={'max-view-wrapper fade-in'}>
					<S.SectionStart>
						<S.LogoWrapper>
							<Link to={URLS.base}>
								<ReactSVG src={ASSETS.ao} />
							</Link>
						</S.LogoWrapper>
						<S.DesktopNavWrapper>
							{paths.map((element: { path: string; label: string; target?: '_blank' }, index: number) => {
								return (
									<Link key={index} to={element.path} target={element.target || ''} className={'primary-text'}>
										<HyperTextLoad word={element.label} textType={'span'} speed={1} triggerOnLoad />
									</Link>
								);
							})}
						</S.DesktopNavWrapper>
					</S.SectionStart>
					<S.SectionEnd>
						{/* <S.DesktopSocialWrapper>
							{socials.map((element: { redirect: string; icon: string }, index: number) => {
								return (
									<Link key={index} to={element.redirect} target={'_blank'}>
										<ReactSVG src={element.icon} />
									</Link>
								);
							})}
						</S.DesktopSocialWrapper> */}
						<S.MobileNavWrapper>
							<IconButton
								type={'alt1'}
								src={ASSETS.menu}
								handlePress={() => setShowPanel(true)}
								dimensions={{ wrapper: 35, icon: 19.5 }}
							/>
						</S.MobileNavWrapper>
					</S.SectionEnd>
				</S.Content>
			</S.Wrapper>
			<Panel open={showPanel} width={450} header={'Menu'} handleClose={() => setShowPanel(false)}>
				<S.MobilePathsWrapper>
					{paths.map((element: { path: string; label: string; target?: '_blank' }, index: number) => {
						return (
							<Link
								key={index}
								to={element.path}
								target={element.target || ''}
								className={'primary-text'}
								onClick={() => setShowPanel(false)}
							>
								<HyperTextLoad word={element.label} textType={'span'} speed={1} triggerOnLoad />
							</Link>
						);
					})}
				</S.MobilePathsWrapper>
				<S.MobileSocialWrapper>
					{socials.map((element: { redirect: string; icon: string }, index: number) => {
						return (
							<Link key={index} to={element.redirect} target={'_blank'} onClick={() => setShowPanel(false)}>
								<ReactSVG src={element.icon} />
							</Link>
						);
					})}
				</S.MobileSocialWrapper>
			</Panel>
		</>
	);
}
