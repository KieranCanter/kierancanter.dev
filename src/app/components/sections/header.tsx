'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import LogoSVG from '@/app/components/logoSVG';
import ThemeSwitcher from '@/app/components/themeSwitcher';

interface HeaderProps {
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentSection }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header" className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-4 md:p-8 transition-all duration-[250ms]">
      <div id="backdrop" className="absolute inset-0 w-full h-full bg-bg opacity-80 transition duration-[250ms] hidden"></div>
      <div id="header-logo" className="relative flex flex-1">
        <button onClick={() => setCurrentSection('businessCard')} className="aspect-square w-8 md:w-10 h-auto fill-fgHard hover:fill-fgContrast transition duration-[250ms]">
          <LogoSVG />
        </button>
      </div>

      <nav id="header-links" className="max-md:hidden relative flex flex-row justify-between items-center w-fit h-fit gap-8">
        <button onClick={() => setCurrentSection('about')} className="header-link">ABOUT</button>
        <button onClick={() => setCurrentSection('experience')} className="header-link">EXPERIENCE</button>
        <button onClick={() => setCurrentSection('works')} className="header-link">WORKS</button>
      </nav>

      <div id="theme-switcher" className="flex flex-1 flex-row gap-4 items-center justify-end">
        <p className="relative text-fgContrast text-[0.8rem] lg:text-[0.9rem] font-ibm-plex-mono font-bold transition-colors duration-[250ms] selection:bg-fgContrast selection:text-bg">
          {theme}
        </p>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
