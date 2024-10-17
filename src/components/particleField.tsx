'use client';

import React, { useRef, useEffect } from 'react';

// Constants
const PARTICLE_SPACING = 3;
const REPULSION_STRENGTH = Math.pow(80, 2);
const VELOCITY_DECAY = 0.95;
const RETURN_FORCE = 0.25;
const CELL_SIZE = 70; // Size of each grid cell for spatial partitioning

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
    let PARTICLE_COUNT: number;
    let COLS: number;
    let ROWS: number;

    let mouseX: number;
    let mouseY: number;

    let isMouseOverField = false;

    // Spatial partitioning grid
    let grid: Particle[][][] = [];

    const init = () => {
      resizeCanvas();
      createParticles();
      createGrid();
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
      createGrid();
    };

    const createParticles = () => {
      particleList = [];
      for (let index = 0; index < PARTICLE_COUNT; index++) {
        const particle = {
          velocityX: 0,
          velocityY: 0,
          currentX: PARTICLE_SPACING * (index % COLS),
          currentY: PARTICLE_SPACING * Math.floor(index / COLS),
          originalX: PARTICLE_SPACING * (index % COLS),
          originalY: PARTICLE_SPACING * Math.floor(index / COLS)
        };
        particleList.push(particle);
      }
    };

    const createGrid = () => {
      const gridCols = Math.ceil(canvas.width / CELL_SIZE);
      const gridRows = Math.ceil(canvas.height / CELL_SIZE);
      grid = Array(gridRows).fill(null).map(() => Array(gridCols).fill(null).map(() => []));
    };

    const updateGrid = () => {
      // Clear the grid
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          grid[i][j] = [];
        }
      }

      // Assign particles to grid cells
      for (const particle of particleList) {
        const gridX = Math.floor(particle.currentX / CELL_SIZE);
        const gridY = Math.floor(particle.currentY / CELL_SIZE);
        if (grid[gridY] && grid[gridY][gridX]) {
          grid[gridY][gridX].push(particle);
        }
      }
    };

    const step = () => {
      updateParticlePositions();
      renderParticles();
      requestAnimationFrame(step);
    };

    const updateParticlePositions = () => {
      updateGrid();

      if (isMouseOverField) {
        const gridX = Math.floor(mouseX / CELL_SIZE);
        const gridY = Math.floor(mouseY / CELL_SIZE);

        // Check only neighboring cells
        for (let i = Math.max(0, gridY - 1); i <= Math.min(grid.length - 1, gridY + 1); i++) {
          for (let j = Math.max(0, gridX - 1); j <= Math.min(grid[0].length - 1, gridX + 1); j++) {
            for (const particle of grid[i][j]) {
              updateParticle(particle);
            }
          }
        }
      }

      // Apply velocity and return force to all particles
      for (const particle of particleList) {
        particle.currentX += (particle.velocityX *= VELOCITY_DECAY) + 
                             (particle.originalX - particle.currentX) * RETURN_FORCE;
        particle.currentY += (particle.velocityY *= VELOCITY_DECAY) + 
                             (particle.originalY - particle.currentY) * RETURN_FORCE;
      }
    };

    const updateParticle = (particle: Particle) => {
      const deltaX = mouseX - particle.currentX;
      const deltaY = mouseY - particle.currentY;
      const distance = deltaX * deltaX + deltaY * deltaY;
      const force = -REPULSION_STRENGTH / distance;

      if (distance < REPULSION_STRENGTH) {
        const angle = Math.atan2(deltaY, deltaX);
        particle.velocityX += force * Math.cos(angle);
        particle.velocityY += force * Math.sin(angle);
      }
    };

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const pixelArray = imageData.data;

      const [r, g, b] = parseRGBColor(color);

      for (const particle of particleList) {
        const pixelIndex = (~~particle.currentX + (~~particle.currentY * canvas.width)) * 4;
        
        pixelArray[pixelIndex]     = r;
        pixelArray[pixelIndex + 1] = g;
        pixelArray[pixelIndex + 2] = b;
        pixelArray[pixelIndex + 3] = 100;
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
    <div ref={containerRef} className="fixed inset-4 lg:inset-8">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
};

export default ParticleField;
