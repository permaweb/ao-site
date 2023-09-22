type ColorValues = 'red' | 'blue' | 'green' | 'orange';

interface ColorBoxProps {
  color: ColorValues;
}

const ColorBox = ({ color }: ColorBoxProps) => {
  return <div className={`color-box ${color}`}></div>;
};

export default ColorBox;
