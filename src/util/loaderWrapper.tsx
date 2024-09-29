import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import Home from '@/app/home';
import '@/styles/variables.scss';
import { ThemeContext } from '@/context/themeContext';

// Dynamically import LogoLoader with SSR disabled
const LogoLoader = dynamic(() => import('@/components/loader'), { ssr: false });

const LogoLoaderWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("LogoLoaderWrapper mounted");
    return () => console.log("LogoLoaderWrapper unmounted");
  }, []);

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