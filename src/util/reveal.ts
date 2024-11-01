import { gsap } from 'gsap';

const revealAnimation = (element: HTMLElement | string | null, delay: number = 0) => {
  if (!element) return; // Ensure the element exists
  gsap.fromTo(element, {
    duration: 0.5,
    y: 15,
    opacity: 0,
    scale: 0.99,
    ease: 'power1.inOut',
    delay: delay,
  }, {
    duration: 0.5,
    y: 0,
    opacity: 1,
    scale: 1,
    ease: 'power1.inOut',
    delay: delay,
  });
};

export default revealAnimation;