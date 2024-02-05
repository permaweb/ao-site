import './HomeMainStyles.css';
import { useEffect, useRef } from 'react';
import morpheusAsciiArt from '../../../../components/MorpheusAsciiArt.tsx';

import HyperTextLoad from '../../../../components/hyperTextLoad.tsx';
import HexocetAnimationComponent from '../../../../components/HexocetAnimation/HexocetAnimationComponent.tsx';
import { Link } from 'react-router-dom';

const HomeMain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    morpheusAsciiArt();
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) * 0.05;
      const deltaY = (clientY - centerY) * 0.05;

      if (containerRef.current) {
        const hexocet = containerRef.current.querySelector('canvas');
        if (hexocet) {
          hexocet.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <main>
        <div className="home-main-wrapper" ref={containerRef}>
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
                <button
                  className="glitch primary link-terminal-blue"
                  data-text="Boot Up Testnet"
                >
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
