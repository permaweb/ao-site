import './Footer.css';
import { Link } from 'react-router-dom';
import HyperTextLoad from '../hyperTextLoad';
import arweaveLogo from '../../assets/arweave.svg';
import xLogo from '../../assets/X_social_media.svg';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="nav-left">
          <div className="nav-buttons quest-button">
            <Link to={'/specs'}>
              <button className="glitch" data-text="100101">
                <img width={12} src={xLogo} alt={xLogo} />
              </button>
            </Link>
          </div>
        </div>
        <div className="nav-buttons">
          <button className="glitch" data-text="Powered by: Arweave">
            <HyperTextLoad
              word={'Permanently On'}
              textType="span"
              speed={1}
              triggerOnLoad
            />
            <img src={arweaveLogo} alt={arweaveLogo} />
            <HyperTextLoad
              word={'arweave'}
              textType="span"
              speed={1}
              triggerOnLoad
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
