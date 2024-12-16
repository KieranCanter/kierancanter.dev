import { gsap } from 'gsap';

/**
 * Reveal Animation Function
 * Animates element into view with fade and slide up effect
 * @param element - Element to animate
 * @param delay - Optional delay before animation starts
 * @returns GSAP animation instance
 */
const revealAnimation = (element: HTMLElement | string | null, delay: number = 0) => {
  if (!element) return;
  
  // Reset initial state
  gsap.set(element, {
    y: 15,
    opacity: 0,
    scale: 0.99,
  });

  // Animate to final state
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