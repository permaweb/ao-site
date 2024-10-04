import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import arweaveLogo from '../../assets/arweave.svg';
import discordLogo from '../../assets/DiscordLogo.svg';
import githubLogo from '../../assets/GithubLogo.svg';
import xLogo from '../../assets/X_social_media.svg';
import HyperTextLoad from '../hyperTextLoad';

const Footer = () => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const handleScroll = () => {
		if (window.scrollY > lastScrollY) {
			// Scrolling down
			setIsVisible(false);
		} else {
			// Scrolling up
			setIsVisible(true);
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	return (
		<footer
			style={{
				transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
				transition: 'transform 0.5s ease-in-out',
				position: 'fixed',
				bottom: 0,
				width: '100%',
			}}
		>
			<div className="footer-container">
				<div className="nav-left">
					<div className="nav-buttons quest-button">
						<Link to={'http://x.com/aoTheComputer'}>
							<button className="glitch" data-text="100101">
								<img width={14} src={xLogo} alt="X Logo" />
							</button>
						</Link>
						<Link to={'https://github.com/permaweb/ao'}>
							<button className="glitch" data-text="100101">
								<img width={18} src={githubLogo} alt="GitHub Logo" />
							</button>
						</Link>
						<Link to={'https://discord.gg/dYXtHwc9dc'}>
							<button className="glitch" data-text="100101">
								<img width={18} src={discordLogo} alt="Discord Logo" />
							</button>
						</Link>
					</div>
				</div>
				<div className="nav-buttons arweave-badge">
					<Link to={'http://arweave.org'} target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
						<button className="glitch link-terminal-blue" data-text="Powered by: Arweave">
							<HyperTextLoad word={'Only Possible On'} textType="span" speed={1} triggerOnLoad />
							<img src={arweaveLogo} alt="Arweave Logo" />
							<HyperTextLoad word={'arweave'} textType="span" speed={1} triggerOnLoad />
						</button>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
