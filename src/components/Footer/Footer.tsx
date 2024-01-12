import './Footer.css';
import { Link } from 'react-router-dom';
import HyperTextLoad from '../hyperTextLoad';
import arweaveLogo from '../../assets/arweave.svg';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="nav-left">
          <div className="nav-buttons quest-button">
            <Link to={'/specs'}>
              <button className="glitch" data-text="Quests">
                Quests
              </button>
            </Link>
          </div>
        </div>
        <div className="nav-buttons">
          <button className="glitch" data-text="Powered by: Arweave">
            <HyperTextLoad word={'Powered by:'} textType="span" speed={1} />
            <img src={arweaveLogo} alt={arweaveLogo} />
            <span>arweave</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
