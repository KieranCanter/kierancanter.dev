import React from 'react';

/**
 * Props for DiamondBullet component
 * @property {string} color - The fill color for the diamond shape
 */
interface DiamondBulletProps {
  color: string;
}

/**
 * DiamondBullet Component
 * Renders a diamond-shaped bullet point with customizable color
 * Used in lists to provide visual hierarchy and theme-based styling
 */
const DiamondBullet: React.FC<DiamondBulletProps> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 24"
    width="9"
    height="12"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5em' }}
  >
    <path d="M9 0L0 12L9 24L18 12L9 0Z" />
  </svg>
);

export default DiamondBullet;
