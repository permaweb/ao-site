import './Nav.css';
import aoFont from '../../assets/ao-font.svg';
import aoPict from '../../assets/ao-pictograph.svg';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <div className="ao-wrapper">
            <img src={aoPict} alt="ao-pictograph" />
            <img src={aoFont} alt="ao-font" />
          </div>
          <div className="nav-buttons">
            <Link to={'/'}>
              <button className="glitch" data-text="Docs">
                Home
              </button>
            </Link>
            <button className="glitch" data-text="Docs">
              Docs
            </button>
            <Link to={'/specs'}>
              <button className="glitch" data-text="Specs">
                Specs
              </button>
            </Link>
          </div>
        </div>
        <div className="nav-buttons">
          <button className="glitch" data-text="Docs">
            Try It Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
