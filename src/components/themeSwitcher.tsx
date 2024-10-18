'use client';

import React, { useContext, useCallback } from 'react';
import { ThemeContext } from '@/context/themeContext';
import '@/styles/variables.scss';

type ThemeType = 'sombre' | 'luminous' | 'brilliant' | 'plush';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  const isDarkMode = theme === 'sombre' || theme === 'luminous';
  const isColorfulMode = theme === 'brilliant' || theme === 'luminous';

  const toggleTheme = useCallback((themeType: 'dark' | 'colorful') => {
    const themeMatrix: Record<ThemeType, { dark: ThemeType; colorful: ThemeType }> = {
      sombre: { dark: 'plush', colorful: 'luminous' },
      luminous: { dark: 'brilliant', colorful: 'sombre' },
      brilliant: { dark: 'luminous', colorful: 'plush' },
      plush: { dark: 'sombre', colorful: 'brilliant' },
    };
    setTheme(themeMatrix[theme as ThemeType][themeType]);
  }, [theme, setTheme]);

  const ThemeToggle = ({ label, isActive, onToggle }: { label: string; isActive: boolean; onToggle: () => void }) => (
    <div className="flex items-center gap-2">
      <h4 className="max-lg:hidden font-ibm-plex-sans text-base font-medium text-fgSoft select-none">{label.toLowerCase()}</h4>
      <div className="relative w-24 lg:w-4 h-10 lg:h-4 cursor-pointer" onClick={onToggle}>
        <div className={`absolute flex items-center justify-center inset-0 border ${ isActive ? 'border-fgHard' : 'border-fgSoft' } `}>
          <h4 className={`lg:hidden font-ibm-plex-sans text-base font-medium ${ isActive ? 'text-fgHard' : 'text-fgSoft' } `}>{label.toUpperCase()}</h4>
        </div>
        <div className={`absolute bg-fgHard inset-0 transition-opacity duration-[250ms] ${ isActive ? 'opacity-40 lg:opacity-60 hover:opacity-80' : 'opacity-0 hover:opacity-20' } `} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-row lg:flex-col gap-4 items-end md:max-lg:items-start">
      <h6 className="lg:hidden text-sm text-fgContrast">{theme}</h6>
      <ThemeToggle label="Dark" isActive={isDarkMode} onToggle={() => toggleTheme('dark')} />
      <ThemeToggle label="Colorful" isActive={isColorfulMode} onToggle={() => toggleTheme('colorful')} />
      <h6 className="max-lg:hidden text-sm text-fgContrast selection:bg-fgContrast">{theme}</h6>
    </div>
  );
};

export default ThemeSwitcher;
