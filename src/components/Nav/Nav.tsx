import { Link, useLocation } from 'react-router-dom';

import AoLogo from 'components/atoms/Logo/AoLogo';

import HyperTextLoad from '../hyperTextLoad';

const Nav = () => {
	const location = useLocation();

	const isHomePage = location.pathname === '/';
	const dynamicColor = isHomePage ? '#F5CD19' : '#000';
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
			</nav>
		</header>
	);
};

export default Nav;
