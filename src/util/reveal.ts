import { gsap } from 'gsap';

const revealAnimation = (element: HTMLElement | null) => {
  if (!element) return; // Ensure the element exists
  gsap.from(element, {
    duration: 0.5,
    opacity: 10,
    y: "+=20",
  });
};

export default revealAnimation;