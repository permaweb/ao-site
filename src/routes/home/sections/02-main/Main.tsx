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
        <div className="main-wrapper">
          <video width={600} autoPlay loop controls>
            <source src={aoMorphingShape} type="video/mp4" />
          </video>
        </div>
      </main>
    </>
  );
};

export default Main;
