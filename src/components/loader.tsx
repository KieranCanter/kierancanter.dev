import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import Diamond3D, { LOGO_ANIMATION_DURATION, LOGO_ROTATIONS } from '@/components/diamond3D';

interface LogoLoaderProps {
  onAnimationComplete: () => void;
  logoColor?: string;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ onAnimationComplete }) => {
  const [opacity, setOpacity] = useState(0);
  const [colorLoaded, setColorLoaded] = useState(false);
  const [diamondColor, setDiamondColor] = useState<THREE.Color | null>(null);

  useEffect(() => {
    const checkColor = () => {
      const fgContrast = getComputedStyle(document.documentElement).getPropertyValue('--fg-contrast');
      if (fgContrast) {
        const color = new THREE.Color(fgContrast);
        setDiamondColor(color);
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
    }, LOGO_ANIMATION_DURATION + 1000);

    return () => clearTimeout(fadeOutTimer);
  }, [onAnimationComplete, colorLoaded]);

  if (!colorLoaded || !diamondColor) {
    return null;
  }

  return (
    <div 
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-500 ease-in-out"
    style={{
      opacity: opacity,
    }}>
      <Diamond3D 
        color={diamondColor} 
        animate={true} 
        animationDuration={LOGO_ANIMATION_DURATION}
        rotations={LOGO_ROTATIONS}
      />
    </div>
  );
};

export default LogoLoader;