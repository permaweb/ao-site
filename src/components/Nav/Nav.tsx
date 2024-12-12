import { Link, useLocation } from 'react-router-dom';

import AoLogo from 'components/atoms/Logo/AoLogo';

import discordLogo from '../../assets/DiscordLogo.svg';
import githubLogo from '../../assets/GithubLogo.svg';
import xLogo from '../../assets/X_social_media.svg';
import HyperTextLoad from '../hyperTextLoad';

const Nav = () => {
	const location = useLocation();

	const isHomePage = location.pathname === '/';
	const dynamicColor = isHomePage ? '#FFF' : '#000';
	const invert = isHomePage ? 'invert(1)' : '';
	const dynamicBg = isHomePage
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0.70) 45.24%, rgba(0, 0, 0, 0.00) 100%)'
		: 'transparent';

	return (
		<header style={{ background: `${dynamicBg}` }}>
			<nav>
				<div className="nav-left">
					<Link to={'/'}>
						<div className="ao-wrapper">
							<AoLogo color={dynamicColor} />
						</div>
					</Link>
					<div className="nav-buttons-header">
						<Link to={'/mint'}>
							<button className="glitch" data-text="Mint" style={{ color: `${dynamicColor}` }}>
								<HyperTextLoad word={'Mint'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'/read'}>
							<button className="glitch" data-text="Read" style={{ color: `${dynamicColor}` }}>
								<HyperTextLoad word={'Read'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'https://cookbook_ao.g8way.io/'} target={'_blank'}>
							<button className="glitch" data-text="Build" style={{ color: `${dynamicColor}` }}>
								<HyperTextLoad word={'Build'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
					</div>
				</div>
				<div className="nav-buttons quest-button" style={{ marginBottom: '20px' }}>
					<Link to={'http://x.com/aoTheComputer'}>
						<button className="glitch" data-text="100101">
							<img width={15} src={xLogo} alt={xLogo} style={{ filter: `${invert}` }} />
						</button>
					</Link>
					<Link to={'https://github.com/permaweb/ao'}>
						<button className="glitch" data-text="100101">
							<img width={20} src={githubLogo} alt={githubLogo} style={{ filter: `${invert}` }} />
						</button>
					</Link>
					<Link to={'https://discord.gg/dYXtHwc9dc'}>
						<button className="glitch" data-text="100101">
							<img width={20} src={discordLogo} alt={discordLogo} style={{ filter: `${invert}` }} />
						</button>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
