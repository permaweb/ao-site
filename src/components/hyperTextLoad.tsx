import React, { useEffect, useRef, useState, createElement } from 'react';

interface HyperTextLoadProps {
  word: string;
  textType: 'h1' | 'h2' | 'p' | 'span';
  triggerOnLoad?: boolean; // New prop to control trigger behavior
  speed: number;
}

const HyperTextLoad: React.FC<HyperTextLoadProps> = ({
  word,
  textType,
  triggerOnLoad = false,
  speed,
}) => {
  const [text, setText] = useState(word);
  const letters = 'abcdefghijklmnopqrstuvwxyz.';
  const textRef = useRef<HTMLElement>(null);
  let interval: number | null = null;

  const startAnimation = () => {
    let iteration = 0;

    interval = window.setInterval(() => {
      const newText = word
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return char;
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      setText(newText);

      if (iteration >= word.length && interval) {
        clearInterval(interval);
      }

      iteration += 1 / speed;
    }, 30);
  };

  const mouseOverHandler = () => {
    if (interval) {
      clearInterval(interval);
    }
    startAnimation();
  };

  useEffect(() => {
    if (triggerOnLoad) {
      startAnimation();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [triggerOnLoad]); // Added triggerOnLoad as a dependency

  const textProps = {
    ref: textRef,
    ...(triggerOnLoad ? {} : { onMouseOver: mouseOverHandler }), // Conditionally add onMouseOver
  };

  const TextElement = createElement(textType, textProps, text);

  return <div>{TextElement}</div>;
};

export default HyperTextLoad;
