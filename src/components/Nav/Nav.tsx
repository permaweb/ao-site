import { Link } from 'react-router-dom';

import AoLogo from 'components/atoms/Logo/AoLogo';

import discordLogo from '../../assets/DiscordLogo.svg';
import githubLogo from '../../assets/GithubLogo.svg';
import xLogo from '../../assets/X_social_media.svg';
import HyperTextLoad from '../hyperTextLoad';

const Nav = () => {
	return (
		<header style={{ background: `transparent` }}>
			<nav>
				<div className="nav-left">
					<Link to={'/'}>
						<div className="ao-wrapper">
							<AoLogo color={'#000'} />
						</div>
					</Link>
					<div className="nav-buttons-header">
						<Link to={'/mint'}>
							<button className="glitch" data-text="Mint" style={{ color: `#000` }}>
								<HyperTextLoad word={'Mint'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'/read'}>
							<button className="glitch" data-text="Read" style={{ color: `#000` }}>
								<HyperTextLoad word={'Read'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'https://cookbook_ao.g8way.io/'} target={'_blank'}>
							<button className="glitch" data-text="Build" style={{ color: `#000` }}>
								<HyperTextLoad word={'Build'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
					</div>
				</div>
				<div className="nav-buttons quest-button" style={{ marginBottom: '20px' }}>
					<Link to={'http://x.com/aoTheComputer'}>
						<button className="glitch" data-text="100101">
							<img width={15} src={xLogo} alt={xLogo} />
						</button>
					</Link>
					<Link to={'https://github.com/permaweb/ao'}>
						<button className="glitch" data-text="100101">
							<img width={20} src={githubLogo} alt={githubLogo} />
						</button>
					</Link>
					<Link to={'https://discord.gg/dYXtHwc9dc'}>
						<button className="glitch" data-text="100101">
							<img width={20} src={discordLogo} alt={discordLogo} />
						</button>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
