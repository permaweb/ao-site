import React, { useEffect } from 'react';
import Hexocet from './Hexocet';

const HexocetAnimationComponent = () => {
  useEffect(() => {
    const hexocet = new Hexocet();
    hexocet.setupCanvas();

    const animate = () => {
      hexocet.update();
      requestAnimationFrame(animate);
    };

    animate();
  }, []);
  return <div />;
};

export default HexocetAnimationComponent;
