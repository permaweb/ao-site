import { useRive } from '@rive-app/react-canvas';
import './ProgressOverlay.css';
import aoProgressAnimation from '../../../assets/ao.riv';
import aoLoadSound from '../../../assets/ao_load_up.wav';

interface overlayProps {
  isOverlay: boolean;
  setIsOverlay: any;
}

const ProgressOverlay = ({ isOverlay, setIsOverlay }: overlayProps) => {
  const stateMachine = 'AO';

  const { RiveComponent } = useRive({
    src: aoProgressAnimation,
    stateMachines: stateMachine,
    autoplay: true,
  });

  const handleOverlayClose = () => {
    const sound = new Audio(aoLoadSound);

    sound
      .play()
      .then(() => {
        setIsOverlay(false); // Close the overlay after the sound has played
      })
      .catch((error) => {
        console.error('Error playing sound:', error);
        setIsOverlay(false); // Close the overlay even if the sound fails to play
      });
  };

  return isOverlay ? (
    <div className="overlay">
      <div className="ao-animation-container">
        <RiveComponent />
        <button onClick={handleOverlayClose}>Success</button>
      </div>
    </div>
  ) : null;
};

export default ProgressOverlay;
