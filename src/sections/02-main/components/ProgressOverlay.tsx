import { useRive } from '@rive-app/react-canvas';
import './ProgressOverlay.css';
import aoProgressAnimation from '../../../assets/ao.riv';

interface overlayProps {
  isOverlay: boolean;
}

const ProgressOverlay = ({ isOverlay }: overlayProps) => {
  const stateMachine = 'AO';

  const { RiveComponent } = useRive({
    src: aoProgressAnimation,
    stateMachines: stateMachine,
    autoplay: true,
  });

  return isOverlay ? (
    <div className="overlay">
      <div className="ao-animation-container">
        <RiveComponent />
      </div>
    </div>
  ) : null;
};

export default ProgressOverlay;
