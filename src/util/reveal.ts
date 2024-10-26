import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export const useReveal = (selector: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 200,
      });

      sr.reveal(selector);

      return () => sr.destroy();
    }
  }, [selector]);
};
