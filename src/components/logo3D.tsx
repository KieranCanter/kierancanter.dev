import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

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
      diamond: THREE.Mesh;

    const initScene = () => {
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
      renderer.setClearColor(0xBBBBBB, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    let svgLoaded = false;
    let diamondCreated = false;

    const loadSVG = () => {
      const loader = new SVGLoader();
      loader.load('/assets/images/logo-no_diamond.svg', (data) => {
        const group = createSVGGroup(data.paths);
        positionSVGGroup(group);
        scene.add(group);
        svgLoaded = true;
        renderIfReady();
      });
    };

    const createSVGGroup = (paths: THREE.ShapePath[]) => {
      const group = new THREE.Group();
      paths.forEach(path => {
        const material = new THREE.MeshBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach(shape => {
          const geometry = new THREE.ShapeGeometry(shape);
          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
        });
      });
      return group;
    };

    const positionSVGGroup = (group: THREE.Group) => {
      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      const scalar = 0.0125;
      center.x = center.y + 55.7844;
      group.position.set(-center.x * scalar, -center.y * scalar, 1);
      group.scale.multiplyScalar(scalar);
    };

    const createDiamond = () => {
      const geometry = new THREE.OctahedronGeometry(1, 0);
      geometry.scale(1, 1.192, 1);
      
      const material = new THREE.MeshPhongMaterial({ color: color });
      diamond = new THREE.Mesh(geometry, material);
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
      camera.position.z = 15;
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
      if (svgLoaded && diamondCreated) {
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
      loadSVG();
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