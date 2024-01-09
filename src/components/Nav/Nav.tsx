import './Nav.css';
import aoFont from '../../../../assets/ao-font.svg';
import aoPict from '../../../../assets/ao-pictograph.svg';

const Nav = () => {
  return (
    <header>
      <nav>
        <div className="ao-wrapper">
          <img src={aoPict} alt="ao-pictograph" />
          <img src={aoFont} alt="ao-font" />
        </div>
        <div className="nav-buttons">
          <button>Docs</button>
          <button>Specs</button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
