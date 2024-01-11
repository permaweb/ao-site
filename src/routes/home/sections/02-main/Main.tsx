import './MainStyles.css';
import { useEffect } from 'react';
import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt.tsx';
import aoMorphingShape from '../../../../assets/ao.mp4';

const Main = () => {
  useEffect(() => {
    morpheusAsciiArt();
  }, []);

  return (
    <>
      <main>
        <div className="home-main-wrapper">
          <video height={1000} autoPlay loop muted>
            <source src={aoMorphingShape} type="video/mp4" />
          </video>
        </div>
      </main>
    </>
  );
};

export default Main;
