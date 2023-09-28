import { useState, useEffect } from 'react';

type TypewriterProps = {
  languageSets: {
    [key: string]: string[];
  };
  speed?: number;

  pauseDuration?: number;
};

const useTypewriter = (
  languageSets: TypewriterProps['languageSets'],
  speed = 300,
  pauseDuration = 4000
) => {
  const languages = Object.keys(languageSets);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayTexts, setDisplayTexts] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentLanguage = languages[currentLangIndex];
    const paragraphs = languageSets[currentLanguage];

    const typingInterval = setInterval(() => {
      // If the current character index is within the paragraph's length:
      if (charIndex < paragraphs[currentParaIndex].length) {
        // Append the next character to the displayTexts state.
        setDisplayTexts((prevTexts) => {
          const newParagraphs = [...prevTexts];
          if (!newParagraphs[currentParaIndex]) {
            newParagraphs[currentParaIndex] = '';
          }
          newParagraphs[currentParaIndex] +=
            paragraphs[currentParaIndex].charAt(charIndex);
          return newParagraphs;
        });
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
      }
      // If the current paragraph has finished and there are more paragraphs for the current language:
      else if (currentParaIndex < paragraphs.length - 1) {
        setCurrentParaIndex((prevIndex) => prevIndex + 1);
        setCharIndex(0);
      }
      // If all paragraphs for the current language have been processed:
      else {
        setIsPaused(true); // Pause the typing.
        setTimeout(() => {
          setIsPaused(false);
          if (currentLangIndex < languages.length - 1) {
            setCurrentLangIndex((prevIndex) => prevIndex + 1);
          } else {
            setCurrentLangIndex(0);
          }
          setCurrentParaIndex(0); // Reset to the first paragraph.
          setCharIndex(0); // Reset the character index.
          setDisplayTexts([]); // Clear the displayed texts.
        }, pauseDuration);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [
    languageSets,
    speed,
    currentLangIndex,
    currentParaIndex,
    charIndex,
    isPaused,
  ]);

  return displayTexts;
};

const Typewriter = ({
  languageSets,
  speed,
  pauseDuration,
}: TypewriterProps) => {
  const displayTexts = useTypewriter(languageSets, speed, pauseDuration);

  return (
    <>
      {displayTexts.map((text, index) => (
        <p style={{ color: '#6C6C6C' }} key={index}>
          <sup>{index + 1} </sup>
          {text}
        </p>
      ))}
    </>
  );
};

export default Typewriter;
