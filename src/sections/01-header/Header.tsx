import { useState, useEffect } from 'react';
import './HeaderStyles.css';
import ForwardResearchLogo from './components/ForwardResearchLogo';

const Header = () => {
  const year = new Date().getFullYear();

  const [logoSize, setLogoSize] = useState(100); // Default size
  useEffect(() => {
    function handleResize() {
      if (window.matchMedia('(max-width: 570px)').matches) {
        setLogoSize(50);
      } else if (
        window.matchMedia('(min-width: 571px) and (max-width: 850px)').matches
      ) {
        setLogoSize(75);
      } else {
        setLogoSize(100);
      }
    }

    handleResize(); // Call once to set the size based on the initial viewport size
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <div className="header-container">
        <div className="left-container">
          <div className="left-wrapper">
            <h1>Forward Research.</h1>
            <span>{year}.</span>
          </div>
        </div>
        <div className="right-container">
          <ForwardResearchLogo size={logoSize} />
        </div>
      </div>
    </header>
  );
};

export default Header;
