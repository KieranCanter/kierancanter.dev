import React from 'react';

interface DiamondBulletProps {
  color: string;
}

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
