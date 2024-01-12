import './MainStyles.css';
import { useEffect, useRef } from 'react';
import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt.tsx';

import HyperTextLoad from '../../../../components/hyperTextLoad.tsx';
import HexocetAnimationComponent from '../../../../components/HexocetAnimation/HexocetAnimationComponent.tsx';

const Main = () => {
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
          <div className="text-hero-wrapper">
            <div className="main-heading">
              <HyperTextLoad
                word={'Hyper.'}
                textType={'h1'}
                speed={1}
                triggerOnLoad
              />
              <HyperTextLoad
                word={'Parallel.'}
                textType={'h1'}
                speed={2}
                triggerOnLoad
              />
              <HyperTextLoad
                word={'Compute.'}
                textType={'h1'}
                speed={3}
                triggerOnLoad
              />
            </div>
            <div className="button-wrapper">
              <button className="glitch primary" data-text="Boot Up Testnet">
                <HyperTextLoad
                  word={'→ Boot Up TestNet'}
                  textType="span"
                  speed={1}
                />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
