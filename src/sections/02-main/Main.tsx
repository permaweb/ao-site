import './MainStyles.css';
import aoFont from '../../assets/ao-font.svg';
import aoPict from '../../assets/ao-pictograph.svg';
import { useEffect, useState } from 'react';
import ProgressOverlay from './components/ProgressOverlay';
import morpheusAsciiArt from './components/MorpheusAsciiArt.tsx';

const Main = () => {
  const [isOverlay, setIsOverlay] = useState(true);

  useEffect(() => {
    // console log morpheus
    morpheusAsciiArt();

    // timer to clear out overlay after 4 seconds
    const timer = setTimeout(() => {
      setIsOverlay(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ProgressOverlay isOverlay={isOverlay} />
      <main>
        <div className="main-wrapper">
          <div className="ao-wrapper">
            <img src={aoPict} alt="ao-pictograph" />
            <img src={aoFont} alt="ao-font" />
          </div>
          <div className="text-content-wrapper">
            <p>
              What if smart contracts could actually scale? That’s ao: an actor
              oriented, scale-free decentralized computer on Arweave. It
              achieves horizontal scalability with parallel execution and
              message passing.
            </p>
            <p>
              ao is already live in testing. Developers will find the entrance
              to the rabbit hole on this page.{' '}
            </p>
            <p>
              Can’t find it? <span>Console</span> yourself by asking a fellow
              Arweaver.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
