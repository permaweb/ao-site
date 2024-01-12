import React, { useEffect } from 'react';
import Hexocet from './Hexocet';

const HexocetAnimationComponent = () => {
  useEffect(() => {
    const hexocet = new Hexocet();
    hexocet.setupCanvas();
  }, []);
  return;
};

export default HexocetAnimationComponent;
