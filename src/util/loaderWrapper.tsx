import React, { useState, useEffect, useContext } from 'react';
import LogoLoader from '@/components/loader';
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

  useEffect(() => {
    console.log("LogoLoaderWrapper mounted");
    return () => console.log("LogoLoaderWrapper unmounted");
  }, []);

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