import './Nav.css';
import aoFont from '../../assets/ao-font.svg';
import aoPict from '../../assets/ao-pictograph.svg';
import { Link } from 'react-router-dom';
import HyperTextLoad from '../hyperTextLoad';

const Nav = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <Link to={'/'}>
            <div className="ao-wrapper">
              <img src={aoPict} alt="ao-pictograph" />
              <img src={aoFont} alt="ao-font" />
            </div>
          </Link>
          <div className="nav-buttons">
            {/* <Link to={'http://aoscan.xyz'}>
              <button className="glitch" data-text="scan">
                <HyperTextLoad
                  word={'scan'}
                  textType={'span'}
                  speed={1}
                  triggerOnLoad
                />
              </button>
            </Link> */}
            <Link to={'/spec'}>
              <button className="glitch" data-text="Spec">
                <HyperTextLoad
                  word={'Spec'}
                  textType={'span'}
                  speed={1}
                  triggerOnLoad
                />
              </button>
            </Link>
          </div>
        </div>
        <div className="main-cta-wrapper">
          <div className="main-cta-button">
            <Link
              to={'https://cookbook_ao.g8way.io/welcome/index.html'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="glitch" data-text="Docs">
                <HyperTextLoad
                  word={'Try It Now'}
                  textType="span"
                  speed={1}
                  triggerOnLoad
                />
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
