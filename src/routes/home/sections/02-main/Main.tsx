import './MainStyles.css';
import { useEffect } from 'react';
import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt.tsx';
import aoMorphingShape from '../../../../assets/ao.mp4';
import HyperTextLoad from '../../../../components/hyperTextLoad.tsx';

const Main = () => {
  useEffect(() => {
    morpheusAsciiArt();
  }, []);

  return (
    <>
      <main>
        <div className="home-main-wrapper">
          <video height={300} autoPlay loop muted>
            <source src={aoMorphingShape} type="video/mp4" />
          </video>
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
                  word={'Boot Up TestNet'}
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
