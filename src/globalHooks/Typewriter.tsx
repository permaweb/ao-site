import { useState, useEffect } from 'react';

type TypewriterProps = {
  languageSets: {
    [key: string]: string[];
  };
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
};

const useTypewriter = (
  languageSets: TypewriterProps['languageSets'],
  speed = 50,
  deleteSpeed = 50,
  pauseDuration = 2000
) => {
  const languages = Object.keys(languageSets);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayTexts, setDisplayTexts] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentSpeed = isDeleting ? deleteSpeed : speed;
    const currentLanguage = languages[currentLangIndex];
    const paragraphs = languageSets[currentLanguage];

    const typingInterval = setInterval(() => {
      if (!isDeleting && charIndex < paragraphs[currentParaIndex].length) {
        setDisplayTexts((prevTexts) => {
          const newParagraphs = [...prevTexts];
          newParagraphs[currentParaIndex] =
            (newParagraphs[currentParaIndex] || '') +
            paragraphs[currentParaIndex].charAt(charIndex);
          return newParagraphs;
        });
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayTexts((prevTexts) => {
          const newParagraphs = [...prevTexts];
          newParagraphs[currentParaIndex] = newParagraphs[
            currentParaIndex
          ].slice(0, -1);
          return newParagraphs;
        });
        setCharIndex((prevCharIndex) => prevCharIndex - 1);
      } else if (currentParaIndex < paragraphs.length - 1) {
        setCurrentParaIndex((prevIndex) => prevIndex + 1);
        setCharIndex(0);
        setIsDeleting(false);
      } else if (currentLangIndex < languages.length - 1) {
        setIsPaused(true); // Pause after finishing a language
        setTimeout(() => {
          setCurrentLangIndex((prevIndex) => prevIndex + 1);
          setCurrentParaIndex(0);
          setCharIndex(0);
          setIsDeleting(false);
          setDisplayTexts([]);
          setIsPaused(false); // End the pause state
        }, pauseDuration);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setCurrentLangIndex(0); // Resetting the language index
          setCurrentParaIndex(0); // Resetting the paragraph index
          setCharIndex(0); // Resetting the character index
          setIsDeleting(false); // Set it to type again
          setDisplayTexts([]); // Reset the display text
          setIsPaused(false); // End the pause state
        }, pauseDuration);
      }
    }, currentSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [
    languageSets,
    speed,
    deleteSpeed,
    currentLangIndex,
    currentParaIndex,
    charIndex,
    isDeleting,
  ]);

  return displayTexts;
};

const Typewriter = ({
  languageSets,
  speed = 50,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypewriterProps) => {
  const displayTexts = useTypewriter(
    languageSets,
    speed,
    deleteSpeed,
    pauseDuration
  );

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
