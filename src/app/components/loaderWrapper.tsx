'use client';

import React, { useState, useContext } from 'react';
import LogoLoader from '@/app/components/loader';
import Home from '@/app/home';
import '@/styles/variables.scss';
import { ThemeContext } from '@/context/themeContext';

const LogoLoaderWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleAnimationComplete = () => {
    setIsLoading(false);
    setShowHome(true);
  };

  return (
    <>
      {isLoading && (
        <div 
          className="fixed inset-0 z-40 transition-colors bg-bg" 
          data-theme={theme}
        >
          <LogoLoader onAnimationComplete={handleAnimationComplete} />
        </div>
      )}
      {showHome && <Home />}
    </>
  );
};

export default LogoLoaderWrapper;