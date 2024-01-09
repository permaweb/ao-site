import './MainStyles.css';
import { useEffect } from 'react';
import morpheusAsciiArt from '../../components/MorpheusAsciiArt.tsx';
import Nav from '../../components/Nav/Nav.tsx';

const Main = () => {
  useEffect(() => {
    // console log morpheus
    morpheusAsciiArt();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <div className="main-wrapper">
          <div className="text-content-wrapper"></div>
        </div>
      </main>
    </>
  );
};

export default Main;
