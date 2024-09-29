import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface LogoProps {
  color: THREE.Color;
  onRender?: () => void;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ color, onRender, animate = false }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      camera: THREE.PerspectiveCamera,
      diamond: THREE.Mesh,
      logoModel: THREE.Group;

    const initScene = () => {
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
      renderer.setClearColor(0xBBBBBB, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    let modelLoaded = false;
    let diamondCreated = false;

    const loadGLTF = () => {
      const loader = new GLTFLoader();
      loader.load('/assets/images/logo3D.gltf', (gltf) => {
        logoModel = gltf.scene;
        positionLogoModel(logoModel);
        scene.add(logoModel);
        modelLoaded = true;
        renderIfReady();
      });
    };

    const positionLogoModel = (model: THREE.Group) => {
      const scalar = 40;
      model.position.set(0, 0, 0);
      model.scale.multiplyScalar(scalar);
      
      // Apply the color and material to the logo model
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhongMaterial({ 
            color: color,
            shininess: 100, // Adjust this value to match the diamond's shininess
          });
        }
      });
    };

    const createDiamond = () => {
      const geometry = new THREE.OctahedronGeometry(1, 0);
      geometry.scale(1, 1.192, 1);
      
      const material = new THREE.MeshPhongMaterial({ color: color });
      diamond = new THREE.Mesh(geometry, material);
      diamond.position.x = 1.5;
      scene.add(diamond);
      diamondCreated = true;
      renderIfReady();
    };

    const setupCamera = () => {
      const canvasSize = 200;
      renderer.setSize(canvasSize, canvasSize);
      logoRef.current?.appendChild(renderer.domElement);

      const aspectRatio = 1;
      camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
      camera.position.z = 20;
    };

    const setupLighting = () => {
      const lights = [
        { position: [0, 0, 5] },
        { position: [0, 5, 0] },
        { position: [5, 0, 0] }
      ];

      lights.forEach(light => {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(...light.position as [number, number, number]);
        scene.add(directionalLight);
      });

      // Add ambient light for both diamond and logo
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
    };

    const rotationDuration = 2500;
    const rotationsPerCycle = 3;

    let animationStartTime: number | null = null;
    let isAnimating = animate;

    const animateLogo = (timestamp: number) => {
      if (!isAnimating) return;

      if (animationStartTime === null) {
        animationStartTime = timestamp;
      }

      const elapsedTime = timestamp - animationStartTime;
      const time = Math.min(elapsedTime / rotationDuration, 1);

      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const progress = easeInOut(time);

      diamond.rotation.y = progress * rotationsPerCycle * 2 * Math.PI;

      renderer.render(scene, camera);

      if (time < 1) {
        requestAnimationFrame(animateLogo);
      } else {
        isAnimating = false;
      }
    };

    const renderIfReady = () => {
      if (modelLoaded && diamondCreated) {
        renderer.render(scene, camera);
        if (onRender) onRender();

        if (animate) {
          setTimeout(() => {
            requestAnimationFrame(animateLogo);
          }, 500);
        }
      }
    };

    const init = () => {
      initScene();
      loadGLTF();
      createDiamond();
      setupCamera();
      setupLighting();
    };

    init();

    return () => {
      if (logo) {
        logo.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [color, onRender, animate]);

  return <div ref={logoRef} />;
};

export default Logo;