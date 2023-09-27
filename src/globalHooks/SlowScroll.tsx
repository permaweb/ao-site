import { useEffect } from 'react';

const useParallaxScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolledY = window.scrollY;

      const leftTranslate = scrolledY * 0.75;
      const rightTranslate = scrolledY * 1;
      const spinRotate = scrolledY * 0.5; // Adjust the factor as needed

      const leftElem = document.querySelector('.landing-left') as HTMLElement;
      const rightElem = document.querySelector('.landing-right') as HTMLElement;
      const button = document.querySelector('.landing-bottom') as HTMLElement;
      const spinElem = document.querySelector('.spin') as HTMLElement;

      if (leftElem && rightElem && button) {
        leftElem.style.transform = `translateY(-${leftTranslate}px)`;
        button.style.transform = `translateY(-${leftTranslate}px)`;
        rightElem.style.transform = `translateY(-${rightTranslate}px)`;
      }
      if (spinElem) {
        spinElem.style.transform = `rotate(${spinRotate}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Here, you can return any value or method if needed.
};

export default useParallaxScroll;
