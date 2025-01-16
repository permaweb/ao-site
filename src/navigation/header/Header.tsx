import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { HyperTextLoad } from 'components/atoms/HyperTextLoad';
import { IconButton } from 'components/atoms/IconButton';
import { Panel } from 'components/atoms/Panel';
import { ASSETS, REDIRECTS, URLS } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

const AOLogo = () => {
	return (
		<svg width="24" height="11.97" viewBox="0 0 429 214" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 214H71.3763L85.9429 174.61L53.1681 107.5L0 214Z" />
			<path d="M189.366 160.75L109.978 1L85.9429 55.7089L160.961 214H215L189.366 160.75Z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M322 214C381.094 214 429 166.094 429 107C429 47.9055 381.094 0 322 0C262.906 0 215 47.9055 215 107C215 166.094 262.906 214 322 214ZM322 172C357.899 172 387 142.899 387 107C387 71.1015 357.899 42 322 42C286.101 42 257 71.1015 257 107C257 142.899 286.101 172 322 172Z"
			/>
		</svg>
	);
};

export default function Header() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showPanel, setShowPanel] = React.useState<boolean>(false);

	const paths: { path: string; label: string; target?: '_blank' }[] = [
		{ path: URLS.mint, label: language.mint },
		{ path: URLS.read, label: language.read },
		{ path: REDIRECTS.cookbook, label: language.build, target: '_blank' },
	];

	const socials: { redirect: string; icon: string }[] = [
		{ redirect: REDIRECTS.x, icon: ASSETS.x },
		{ redirect: REDIRECTS.github, icon: ASSETS.github },
		{ redirect: REDIRECTS.discord, icon: ASSETS.discord },
	];

	return (
		<>
			<S.Wrapper>
				<S.Content className={'max-view-wrapper'}>
					<S.SectionStart>
						<S.LogoWrapper>
							<Link to={URLS.base}>
								<AOLogo />
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
						<S.DesktopSocialWrapper>
							{socials.map((element: { redirect: string; icon: string }, index: number) => {
								return (
									<Link key={index} to={element.redirect} target={'_blank'}>
										<ReactSVG src={element.icon} />
									</Link>
								);
							})}
						</S.DesktopSocialWrapper>
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
			<Panel open={showPanel} header={'Menu'} handleClose={() => setShowPanel(false)}>
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
