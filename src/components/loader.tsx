import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import Logo3D from '@/components/logo3D';

interface LogoLoaderProps {
  onAnimationComplete: () => void;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ onAnimationComplete }) => {
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
    if (!colorLoaded) return;

    setOpacity(1);

    const fadeOutTimer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onAnimationComplete, 1000);
    }, 3500);

    return () => clearTimeout(fadeOutTimer);
  }, [onAnimationComplete, colorLoaded]);

  if (!colorLoaded || !loaderColor) {
    return null;
  }

  return (
    <div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      style={{
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <Logo3D color={loaderColor} animate={true} />
    </div>
  );
};

export default LogoLoader;