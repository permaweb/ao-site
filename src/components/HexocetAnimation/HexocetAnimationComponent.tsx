import { useEffect } from 'react';
import Hexocet from './Hexocet';

const HexocetAnimationComponent = ({ containerRef }: any) => {
  useEffect(() => {
    if (containerRef && containerRef.current) {
      const hexocet = new Hexocet();
      hexocet.setupCanvas(containerRef.current);

      const animate = () => {
        hexocet.update();
        requestAnimationFrame(animate);
      };

      animate();
      const canvas = document.getElementById('hexocet');
      const handleMouseMove = (event: any) => {
        const x = event.pageX,
          y = event.pageY;
        hexocet.birth(x, y);
      };
      if (canvas) {
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
          canvas.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }
  }, [containerRef]);
  return null;
};

export default HexocetAnimationComponent;
