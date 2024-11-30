import { gsap } from 'gsap';

const revealAnimation = (element: HTMLElement | string | null, delay: number = 0) => {
  if (!element) return;
  
  // First reset the element's state
  gsap.set(element, {
    y: 15,
    opacity: 0,
    scale: 0.99,
  });

  // Then animate it
  return gsap.to(element, {
    duration: 0.5,
    y: 0,
    opacity: 1,
    scale: 1,
    ease: 'power1.inOut',
    delay: delay,
  });
};

export default revealAnimation;