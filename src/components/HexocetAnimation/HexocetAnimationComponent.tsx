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
		}
	}, [containerRef]);
	return null;
};

export default HexocetAnimationComponent;
