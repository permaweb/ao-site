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
						{/* <Link to={'http://aoscan.xyz'}>
              <button className="glitch" data-text="link">
                <HyperTextLoad
                  word={'link'}
                  textType={'span'}
                  speed={1}
                  triggerOnLoad
                />
              </button>
            </Link> */}
						<Link to={'/mint'}>
							<button className="glitch link-terminal-red" data-text="Mint">
								<HyperTextLoad word={'Mint'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
						<Link to={'/spec'}>
							<button className="glitch link-terminal-red" data-text="Spec">
								<HyperTextLoad word={'Spec'} textType={'span'} speed={1} triggerOnLoad />
							</button>
						</Link>
					</div>
				</div>
				<div className="main-cta-wrapper">
					<div className="main-cta-button">
						<Link to={'https://cookbook_ao.g8way.io/'} target="_blank" rel="noopener noreferrer">
							<button className="glitch link-terminal-green" data-text="Docs">
								<HyperTextLoad word={'→ Try It Now'} textType="span" speed={1} triggerOnLoad />
							</button>
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
