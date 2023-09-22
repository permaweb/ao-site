import ColorBox from '../02-main/components/ColorBox';
import './FooterStyles.css';
import x from '../../assets/x-logo.svg';
import arweave from '../../assets/arweave-logo.svg';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <span>follow us on: </span>
          <div className="footer-links">
            <a href="https://twitter.com/fwdresearch">
              <img src={x} alt="x-logo" />
            </a>
            <a href="https://arweave.com/">
              <img src={arweave} alt="arweave-logo" />
            </a>
          </div>
        </div>
        <div className="footer-colors">
          <ColorBox color={'orange'} />
          <ColorBox color={'green'} />
          <ColorBox color={'blue'} />
          <ColorBox color={'red'} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
