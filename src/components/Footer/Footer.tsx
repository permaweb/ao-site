import { Link } from 'react-router-dom';

import arweaveLogo from '../../assets/arweave.svg';
import discordLogo from '../../assets/DiscordLogo.svg';
import githubLogo from '../../assets/GithubLogo.svg';
import xLogo from '../../assets/X_social_media.svg';
import HyperTextLoad from '../hyperTextLoad';

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="nav-left">
					<div className="nav-buttons quest-button">
						<Link to={'http://x.com/aoTheComputer'}>
							<button className="glitch" data-text="100101">
								<img width={14} src={xLogo} alt={xLogo} />
							</button>
						</Link>
						<Link to={'https://github.com/permaweb/ao'}>
							<button className="glitch" data-text="100101">
								<img width={18} src={githubLogo} alt={githubLogo} />
							</button>
						</Link>
						<Link to={'https://discord.gg/dYXtHwc9dc'}>
							<button className="glitch" data-text="100101">
								<img width={18} src={discordLogo} alt={discordLogo} />
							</button>
						</Link>
					</div>
				</div>
				<div className="nav-buttons arweave-badge">
					<Link to={'http://arweave.org'} target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
						<button className="glitch link-terminal-blue" data-text="Powered by: Arweave">
							<HyperTextLoad word={'Only Possible On'} textType="span" speed={1} triggerOnLoad />
							<img src={arweaveLogo} alt={arweaveLogo} />
							<HyperTextLoad word={'arweave'} textType="span" speed={1} triggerOnLoad />
						</button>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
