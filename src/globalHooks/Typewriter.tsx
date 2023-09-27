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

  // This effect simulates typing, pausing, and deleting text for different paragraphs and languages.
  useEffect(() => {
    if (isPaused) return;

    const currentSpeed = isDeleting ? deleteSpeed : speed;

    const currentLanguage = languages[currentLangIndex];

    if (!currentLanguage) {
      console.error('currentLanguage is not defined.');
      return;
    }

    const paragraphs = languageSets[currentLanguage];

    if (!paragraphs) {
      console.error(`No paragraphs found for language: ${currentLanguage}`);
      return;
    }

    // Set an interval for the typing effect.
    const typingInterval = setInterval(() => {
      try {
        // If not in deletion mode and the current character index is within the paragraph's length:
        if (!isDeleting && charIndex < paragraphs[currentParaIndex].length) {
          // Append the next character to the displayTexts state.
          setDisplayTexts((prevTexts) => {
            const newParagraphs = [...prevTexts];

            // Ensure the paragraph is initialized to an empty string if undefined.
            if (!newParagraphs[currentParaIndex]) {
              newParagraphs[currentParaIndex] = '';
            }

            newParagraphs[currentParaIndex] +=
              paragraphs[currentParaIndex].charAt(charIndex);
            return newParagraphs;
          });

          // Increment the character index.
          setCharIndex((prevCharIndex) => prevCharIndex + 1);
        }
        // If in deletion mode and there are still characters left:
        else if (isDeleting && charIndex > 0) {
          // Remove the last character from the displayTexts state.
          setDisplayTexts((prevTexts) => {
            const newParagraphs = [...prevTexts];

            // Check if the value at currentParaIndex is defined.
            if (typeof newParagraphs[currentParaIndex] === 'string') {
              newParagraphs[currentParaIndex] = newParagraphs[
                currentParaIndex
              ].slice(0, -1);
            } else {
              console.error(
                `Unexpected value at currentParaIndex: ${currentParaIndex}. Expected a string but got ${newParagraphs[currentParaIndex]}.`
              );
            }

            return newParagraphs;
          });

          // Decrement the character index.
          setCharIndex((prevCharIndex) => prevCharIndex - 1);
        }
        // If the current paragraph has finished but there are more paragraphs for the current language:
        else if (currentParaIndex < paragraphs.length - 1) {
          // Move to the next paragraph.
          setCurrentParaIndex((prevIndex) => prevIndex + 1);
          setCharIndex(0); // Reset the character index.
          setIsDeleting(false); // Stop deleting.
        }
        // If all paragraphs for the current language have been processed, but there are more languages:
        else if (currentLangIndex < languages.length - 1) {
          // Move to the next language.
          setCurrentLangIndex((prevIndex) => prevIndex + 1);
          setCurrentParaIndex(0); // Reset the paragraph index.
          setCharIndex(0); // Reset the character index.
          setIsDeleting(false); // Stop deleting.
          setDisplayTexts([]); // Clear the displayed texts.
        }
        // If the current paragraph has finished but there are more paragraphs for the current language:
        else if (currentParaIndex < paragraphs.length - 1) {
          setIsPaused(true); // Pause the typing.
          setTimeout(() => {
            // After the pause, resume typing.
            setIsPaused(false);
            setCurrentParaIndex((prevIndex) => prevIndex + 1); // Move to the next paragraph.
            setCharIndex(0); // Reset the character index.
          }, pauseDuration);
        }
        // If all paragraphs for all languages have been processed:
        else {
          setIsDeleting(true); // Start deleting.
          setCurrentLangIndex(0); // Reset the language index.
          setCurrentParaIndex(0); // Reset the paragraph index.
          setDisplayTexts([]); // Clear the displayed texts.
        }
      } catch (error) {
        console.error('Error occurred in typingInterval:', error);
        clearInterval(typingInterval);
      }
    }, currentSpeed);

    // Cleanup: When this effect re-runs or the component unmounts, clear the typing interval.
    return () => {
      clearInterval(typingInterval);
    };

    // Dependencies for the effect. Whenever any of these change, the effect will re-run.
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
