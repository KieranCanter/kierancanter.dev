'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import '@/styles/variables.scss';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  const isDarkMode = theme === 'sombre' || theme === 'luminous';
  const isColorfulMode = theme === 'brilliant' || theme === 'luminous';

  const toggleDarkMode = () => {
    if (isColorfulMode) {
      setTheme(isDarkMode ? 'brilliant' : 'luminous');
    } else {
      setTheme(isDarkMode ? 'plush' : 'sombre');
    }
  };

  const toggleColorfulMode = () => {
    if (isDarkMode) {
      setTheme(isColorfulMode ? 'sombre' : 'luminous');
    } else {
      setTheme(isColorfulMode ? 'plush' : 'brilliant');
    }
  };

  const ThemeToggle = ({ label, isActive, onToggle }: { label: string; isActive: boolean; onToggle: () => void }) => (
    <div className="flex items-center gap-2">
      <h4 className="max-lg:hidden font-ibm-plex-sans text-base font-light text-fgSoft">{label}</h4>
      <div className="relative w-20 lg:w-4 h-10 lg:h-4 cursor-pointer transition duration-[250ms]" onClick={onToggle}>
        <div className="absolute flex items-center justify-center inset-0 border border-fgHard">
          <h4 className="lg:hidden font-ibm-plex-sans text-base font-light text-fgSoft">{label}</h4>
        </div>
        <div className={`absolute inset-0 ${isActive ? 'bg-fgHard opacity-40 lg:opacity-60' : ''}`}></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row lg:flex-col gap-4 items-end md:max-lg:items-start">
      <h6 className="lg:hidden text-sm text-fgContrast">{theme}</h6>
      <ThemeToggle label="Dark" isActive={isDarkMode} onToggle={toggleDarkMode} />
      <ThemeToggle label="Colorful" isActive={isColorfulMode} onToggle={toggleColorfulMode} />
      <h6 className="max-lg:hidden text-sm text-fgContrast">{theme}</h6>
    </div>
  );
};

export default ThemeSwitcher;
