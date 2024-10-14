import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const LOGO_ANIMATION_DURATION = 3000;
export const LOGO_ROTATIONS = 3;

interface LogoProps {
  color: THREE.Color;
  animate?: boolean;
  animationDuration?: number; // in milliseconds
  rotations?: number;
}

const Logo: React.FC<LogoProps> = ({ 
  color, 
  animate = false, 
  animationDuration = LOGO_ANIMATION_DURATION,
  rotations = LOGO_ROTATIONS
}) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      camera: THREE.PerspectiveCamera,
      diamond: THREE.Mesh;

    const initScene = () => {
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0xBBBBBB, 0);
      renderer.setPixelRatio(window.devicePixelRatio);

      const canvasSize = 50;
      renderer.setSize(canvasSize, canvasSize);
      logo.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
      camera.position.z = 3.5;
    };

    const createDiamond = () => {
      const geometry = new THREE.OctahedronGeometry(1, 0);
      geometry.scale(1, 1.4, 1);
      
      const material = new THREE.MeshPhongMaterial({ color: color });
      diamond = new THREE.Mesh(geometry, material);
      scene.add(diamond);

      // Only render if all necessary objects are defined
      if (scene && camera && renderer) {
        renderer.render(scene, camera);

        if (animate) {
          setTimeout(() => {
            requestAnimationFrame(animateLogo);
          }, 500);
        }
      }
    };

    const setupLighting = () => {
      const lights = [
        { position: [0, 0, 5], intensity: 2 },
        { position: [0, 5, 0], intensity: 2 },
        { position: [5, 0, 0], intensity: 2 }
      ];

      lights.forEach(light => {
        const directionalLight = new THREE.DirectionalLight(0xffffff, light.intensity);
        directionalLight.position.set(...light.position as [number, number, number]);
        scene.add(directionalLight);
      });
    };

    let startTime: number;
    let animationCompleted = false;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateLogo = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      
      if (progress < 1) {
        const easedProgress = easeInOutCubic(progress);
        const rotationAngle = easedProgress * Math.PI * 2 * rotations;

        diamond.rotation.y = rotationAngle;
        
        renderer.render(scene, camera);

        if (animate) {
          requestAnimationFrame(animateLogo);
        }
      } else if (!animationCompleted) {
        // Ensure the final state is rendered
        diamond.rotation.y = Math.PI * 2 * rotations;
        renderer.render(scene, camera);
        animationCompleted = true;
      }
    };

    const init = () => {
      initScene();
      setupLighting();
      createDiamond();
    };

    init();

    return () => {
      if (logo.firstChild) {
        logo.removeChild(logo.firstChild);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [color, animate, animationDuration, rotations]);

  return <div ref={logoRef} />;
};

export default Logo;