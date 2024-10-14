'use client';

import React, { useRef, useEffect } from 'react';

// Constants
const PARTICLE_SPACING = 3;
const REPULSION_STRENGTH = Math.pow(80, 2);
const VELOCITY_DECAY = 0.95;
const RETURN_FORCE = 0.25;

interface Particle {
  velocityX: number;
  velocityY: number;
  currentX: number;
  currentY: number;
  originalX: number;
  originalY: number;
}

interface ParticleFieldProps {
  color: string;
}

// Parse RGB color string to an array of numbers
const parseRGBColor = (rgbString: string): number[] => {
  const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
};

const ParticleField: React.FC<ParticleFieldProps> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleList: Particle[] = [];
    let currentParticle: Particle;
    let PARTICLE_COUNT: number;
    let COLS: number;
    let ROWS: number;

    let mouseX: number;
    let mouseY: number;

    let isUpdatingPositions: boolean;
    let deltaX: number, deltaY: number;
    let distance: number, angle: number, force: number;
    let imageData: ImageData, pixelArray: Uint8ClampedArray;
    let index: number;

    let isMouseOverField = false;

    const init = () => {
      isUpdatingPositions = true;
      particleList = [];

      resizeCanvas();
      createParticles();
    };

    const updateMousePosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isMouseOverField = true;
    };

    const handleMouseLeave = () => {
      isMouseOverField = false;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      COLS = Math.ceil(canvas.width / PARTICLE_SPACING);
      ROWS = Math.ceil(canvas.height / PARTICLE_SPACING);
      PARTICLE_COUNT = COLS * ROWS;

      createParticles();
    };

    const createParticles = () => {
      particleList = [];
      for (let index = 0; index < PARTICLE_COUNT; index++) {
        currentParticle = {
          velocityX: 0,
          velocityY: 0,
          currentX: PARTICLE_SPACING * (index % COLS),
          currentY: PARTICLE_SPACING * Math.floor(index / COLS),
          originalX: PARTICLE_SPACING * (index % COLS),
          originalY: PARTICLE_SPACING * Math.floor(index / COLS)
        };
        particleList[index] = currentParticle;
      }
    };

    const step = () => {
      if (isUpdatingPositions = !isUpdatingPositions) {
        updateParticlePositions();
      } else {
        renderParticles();
      }

      requestAnimationFrame(step);
    };

    const updateParticlePositions = () => {
      for (index = 0; index < PARTICLE_COUNT; index++) {
        currentParticle = particleList[index];
        
        if (isMouseOverField) {
          distance = (deltaX = mouseX - currentParticle.currentX) * deltaX + 
                     (deltaY = mouseY - currentParticle.currentY) * deltaY;
          force = -REPULSION_STRENGTH / distance;

          if (distance < REPULSION_STRENGTH) {
            angle = Math.atan2(deltaY, deltaX);
            currentParticle.velocityX += force * Math.cos(angle);
            currentParticle.velocityY += force * Math.sin(angle);
          }
        }

        currentParticle.currentX += (currentParticle.velocityX *= VELOCITY_DECAY) + 
                                    (currentParticle.originalX - currentParticle.currentX) * RETURN_FORCE;
        currentParticle.currentY += (currentParticle.velocityY *= VELOCITY_DECAY) + 
                                    (currentParticle.originalY - currentParticle.currentY) * RETURN_FORCE;
      }
    };

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      imageData = ctx.createImageData(canvas.width, canvas.height);
      pixelArray = imageData.data;

      const [r, g, b] = parseRGBColor(color);

      for (index = 0; index < PARTICLE_COUNT; index++) {
        currentParticle = particleList[index];
        const pixelIndex = (~~currentParticle.currentX + (~~currentParticle.currentY * canvas.width)) * 4;
        
        pixelArray[pixelIndex]     = r;  // Red channel
        pixelArray[pixelIndex + 1] = g;  // Green channel
        pixelArray[pixelIndex + 2] = b;  // Blue channel
        pixelArray[pixelIndex + 3] = 100;  // Alpha channel
      }

      ctx.putImageData(imageData, 0, 0);
    };

    init();
    step();

    container.addEventListener('mousemove', updateMousePosition);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      container.removeEventListener('mousemove', updateMousePosition);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color]);

  return (
    <div ref={containerRef} className="fixed inset-4 md:inset-8">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
};

export default ParticleField;
