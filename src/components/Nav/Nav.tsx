import { Link } from 'react-router-dom';

import aoPict from '../../assets/ao-pictograph.svg';
import HyperTextLoad from '../hyperTextLoad';

const Nav = () => {
	return (
		<header>
			<nav>
				<div className="nav-left">
					<Link to={'/'}>
						<div className="ao-wrapper">
							<img src={aoPict} alt="ao-pictograph" />
							{/* <img src={aoFont} alt="ao-font" /> */}
						</div>
					</Link>
					<div className="nav-buttons-header">
						<Link to={'/explore'}>
							<button className="glitch link-terminal-green" data-text="Explore">
								<HyperTextLoad word={'Explore'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'/mint'}>
							<button className="glitch link-terminal-red" data-text="Mint">
								<HyperTextLoad word={'Mint'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'/read'}>
							<button className="glitch link-terminal-blue" data-text="Paper">
								<HyperTextLoad word={'Paper'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'https://cookbook_ao.g8way.io/'} target={'_blank'}>
							<button className="glitch link-terminal-green" data-text="Build">
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
