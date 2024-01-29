import './HomeMainStyles.css';
import { useEffect, useRef } from 'react';
import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt.tsx';

import HyperTextLoad from '../../../../components/hyperTextLoad.tsx';
import HexocetAnimationComponent from '../../../../components/HexocetAnimation/HexocetAnimationComponent.tsx';
import { Link } from 'react-router-dom';

const HomeMain = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    morpheusAsciiArt();
  }, []);

  return (
    <>
      <main>
        <div className="home-main-wrapper" ref={containerRef}>
          {/* <video height={300} autoPlay loop muted>
            <source src={aoMorphingShape} type="video/mp4" />
          </video> */}
          <HexocetAnimationComponent containerRef={containerRef} />
          <div className="content-hero-wrapper">
            <div className="text-hero-wrapper">
              <div className="main-heading">
                <h1>Hyper. Parallel. Computer.</h1>
              </div>
            </div>
            <div className="button-wrapper">
              <Link
                to={'https://cookbook_ao.g8way.io/welcome/index.html'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="glitch primary" data-text="Boot Up Testnet">
                  <HyperTextLoad
                    word={'→ Boot Up The TestNet'}
                    textType="span"
                    speed={1}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeMain;
