import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

interface LogoLoaderProps {
  onAnimationComplete: () => void;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ onAnimationComplete }) => {
  const loaderLogo = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const [opacity, setOpacity] = useState(0);
  const [colorLoaded, setColorLoaded] = useState(false);
  const [loaderColor, setLoaderColor] = useState<THREE.Color | null>(null);

  useEffect(() => {
    const checkColor = () => {
      const fgSoft = getComputedStyle(document.documentElement).getPropertyValue('--fg-soft').trim();
      if (fgSoft) {
        const color = new THREE.Color(fgSoft);
        setLoaderColor(color);
        setColorLoaded(true);
      } else {
        setTimeout(checkColor, 100); // Check again after 100ms
      }
    };

    checkColor();
  }, []);

  useEffect(() => {
    if (!colorLoaded || mountedRef.current) return;
    mountedRef.current = true;

    console.log("LogoLoader mounted");
    if (!loaderLogo.current) return;

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

    const loadSVG = () => {
      const loader = new SVGLoader();
      loader.load('/assets/images/logo-no_diamond.svg', (data) => {
        const group = createSVGGroup(data.paths);
        positionSVGGroup(group);
        scene.add(group);
      });
    };

    const createSVGGroup = (paths: THREE.ShapePath[]) => {
      const group = new THREE.Group();
      paths.forEach(path => {
        const material = new THREE.MeshBasicMaterial({
          color: loaderColor ?? 0x666666,
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
      
      const material = new THREE.MeshPhongMaterial({ color: loaderColor ?? 0x666666 });
      diamond = new THREE.Mesh(geometry, material);
      scene.add(diamond);
    };

    const setupCamera = () => {
      const canvasSize = 200;
      renderer.setSize(canvasSize, canvasSize);
      loaderLogo.current?.appendChild(renderer.domElement);

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
    let isAnimating = false;
    const animationDelay = 750; // Added animation delay

    const animate = (timestamp: number) => {
      if (!isAnimating) return;

      if (animationStartTime === null) {
        animationStartTime = timestamp;
      }

      const elapsedTime = timestamp - animationStartTime - animationDelay; // Adjusted to account for delay
      const time = Math.max(Math.min(elapsedTime / rotationDuration, 1), 0); // Ensure time is not negative due to delay

      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const progress = easeInOut(time);

      diamond.rotation.y = progress * rotationsPerCycle * 2 * Math.PI;

      renderer.render(scene, camera);

      if (time < 1) {
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animationStartTime = null;
        requestAnimationFrame(animate);
      }
    };

    const onWindowResize = () => {
      // If you want to make it responsive, you can adjust the scaleFactor here
      // based on window or container size
    };

    const init = () => {
      initScene();
      loadSVG();
      createDiamond();
      setupCamera();
      setupLighting();
      
      setOpacity(1);

      startAnimation();

      window.addEventListener('resize', onWindowResize, false);

      // Start fade out after 3 seconds
      const fadeOutTimer = setTimeout(() => {
        setOpacity(0);
        // Call the callback after the opacity transition
        setTimeout(onAnimationComplete, 1000);
      }, 3500);

      // Update cleanup function
      return () => {
        const container = loaderLogo.current;
        if (container) {
          container.innerHTML = '';
        }
        renderer.dispose();
        window.removeEventListener('resize', onWindowResize);
        clearTimeout(fadeOutTimer);
        mountedRef.current = false;
      };
    };

    init();
  }, [onAnimationComplete, colorLoaded, loaderColor]);

  if (!colorLoaded) {
    return null; // or return a loading indicator
  }

  return (
    <div 
      ref={loaderLogo} 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      style={{
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default LogoLoader;