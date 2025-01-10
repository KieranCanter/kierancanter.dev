'use client';

import React, { useRef, useEffect } from 'react';

/**
 * System Configuration Constants
 * Fine-tuned values for particle behavior and performance
 */
const PARTICLE_SPACING = 3;        // Space between particles
const REPULSION_STRENGTH = Math.pow(80, 2);  // Squared for performance
const VELOCITY_DECAY = 0.85;       // Particle movement dampening
const RETURN_FORCE = 0.25;         // Force pulling particles back to origin
const CELL_SIZE = 80;              // Size of spatial partitioning cells

/**
 * Particle interface defining properties for each point
 */
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

/**
 * Converts RGB color string to array of RGB values
 * @param rgbString - Color in format 'rgb(r,g,b)'
 * @returns Array of [r,g,b] values
 */
const parseRGBColor = (rgbString: string): number[] => {
  const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
};

/**
 * ParticleField Component
 * Creates an interactive field of particles that respond to mouse movement
 * Uses spatial partitioning and pixel manipulation for performance
 */
const ParticleField: React.FC<ParticleFieldProps> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Device detection for performance optimization
    const isMobile = () => {
      return window.innerWidth <= 768 || 'ontouchstart' in window;
    };

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // State variables
    let animationFrameId: number;
    let particleList: Particle[] = [];
    let PARTICLE_COUNT: number;
    let COLS: number;
    let ROWS: number;
    let mouseX: number = -1000;
    let mouseY: number = -1000;
    let isMouseOverField = false;
    let grid: Particle[][][] = [];
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 1000 / 60; // Target 60 updates per second
    let isMousePressed = false;

    /**
     * Initialize the particle system
     * Sets up canvas, creates particles, and starts animation loop
     */
    const init = () => {
      resizeCanvas();
      createParticles();
      createGrid();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    /**
     * Mouse event handlers
     * Track mouse position for particle interactions
     */
    const updateMousePosition = (e: MouseEvent) => {
      if (isMobile()) return;
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      if (isMobile()) return;
      isMouseOverField = true;
    };

    const handleMouseLeave = () => {
      if (isMobile()) return;
      isMouseOverField = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isMobile() || e.button !== 0) return; // Only respond to left mouse button
      isMousePressed = true;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isMobile() || e.button !== 0) return;
      isMousePressed = false;
    };

    /**
     * Canvas resize handler
     * Updates canvas dimensions and recreates particle system
     */
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      COLS = Math.ceil(rect.width / PARTICLE_SPACING);
      ROWS = Math.ceil(rect.height / PARTICLE_SPACING);
      PARTICLE_COUNT = COLS * ROWS;

      createParticles();
      createGrid();
    };

    /**
     * Create initial particle array
     * Positions particles in a grid pattern
     */
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

    /**
     * Create spatial partitioning grid
     * Divides space into cells for efficient collision detection
     */
    const createGrid = () => {
      const gridCols = Math.ceil(canvas.width / CELL_SIZE);
      const gridRows = Math.ceil(canvas.height / CELL_SIZE);
      grid = Array(gridRows).fill(null).map(() => Array(gridCols).fill(null).map(() => []));
    };

    /**
     * Update spatial grid with current particle positions
     */
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

    /**
     * Main game loop
     * Handles timing and calls update/render functions
     */
    const gameLoop = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(gameLoop);

      // Update at fixed time intervals
      if (timestamp - lastUpdateTime >= UPDATE_INTERVAL) {
        updateParticlePositions();
        lastUpdateTime = timestamp;
      }

      renderParticles();
    };

    /**
     * Update particle positions and handle interactions
     */
    const updateParticlePositions = () => {
      updateGrid();

      // Only process particles when mouse is pressed and over field
      if (isMouseOverField && isMousePressed && !isMobile()) {
        const gridX = Math.floor(mouseX / CELL_SIZE);
        const gridY = Math.floor(mouseY / CELL_SIZE);

        // Check neighboring cells for mouse interaction
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
        particle.currentX += particle.velocityX + (particle.originalX - particle.currentX) * RETURN_FORCE;
        particle.currentY += particle.velocityY + (particle.originalY - particle.currentY) * RETURN_FORCE;
        particle.velocityX *= VELOCITY_DECAY;
        particle.velocityY *= VELOCITY_DECAY;
      }
    };

    /**
     * Update single particle based on mouse position
     */
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

    /**
     * Render particles to canvas using optimized pixel manipulation
     */
    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelArray = imageData.data;

      const [r, g, b] = parseRGBColor(color);

      for (const particle of particleList) {
        const x = ~~particle.currentX;
        const y = ~~particle.currentY;
        const pixelIndex = (x + y * canvas.width) * 4;
        
        pixelArray[pixelIndex]     = r;
        pixelArray[pixelIndex + 1] = g;
        pixelArray[pixelIndex + 2] = b;
        pixelArray[pixelIndex + 3] = 100;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Initialize system and set up event listeners
    init();

    container.addEventListener('mousemove', updateMousePosition);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', updateMousePosition);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
};

export default ParticleField;
