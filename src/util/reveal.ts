import { useEffect } from 'react';

export const useReveal = (selector: string) => {
  useEffect(() => {
    const loadScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default;

      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 200,
      });

      sr.reveal(selector);
    };

    loadScrollReveal();
  }, [selector]);
};