'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const getThemeClasses = (selectedTheme: string) => {
    const baseClasses = 'hover:-translate-y-0.5';
    switch (selectedTheme) {
      case 'plush':
        return `${baseClasses} bg-plush-bg text-plush-fgSoft border-plush-fgSoft hover:text-plush-fgContrast hover:shadow-plush-fgContrast hover:shadow-sm active:opacity-85`;
      case 'sombre':
        return `${baseClasses} bg-sombre-bg text-sombre-fgSoft border-sombre-fgSoft hover:text-sombre-fgContrast hover:shadow-sombre-fgContrast hover:shadow-sm active:opacity-85`;
      case 'brilliant':
        return `${baseClasses} bg-brilliant-bg text-brilliant-fgSoft border-brilliant-fgSoft hover:text-brilliant-fgContrast hover:shadow-brilliant-fgContrast hover:shadow-sm active:opacity-85`;
      case 'luminous':
        return `${baseClasses} bg-luminous-bg text-luminous-fgSoft border-luminous-fgSoft hover:text-luminous-fgContrast hover:shadow-luminous-fgContrast hover:shadow-sm active:opacity-85`;
      default:
        return '';
    }
  };

  return (
    <div id="theme-switcher" className="flex flex-row justify-center gap-2 w-full max-w-md" aria-label="Theme Switcher">
      {['plush', 'sombre', 'brilliant', 'luminous'].map((selectedTheme) => (
        <button
          key={selectedTheme}
          onClick={() => setTheme(selectedTheme as 'plush' | 'sombre' | 'brilliant' | 'luminous')}
          className={`flex-1 w-1/4 p-2 border rounded-sm transition-all duration-250 ease-in-out text-sm ${getThemeClasses(selectedTheme)} ${theme === selectedTheme ? '-translate-y-0.5 shadow-fgContrast shadow-sm' : ''}`}
          aria-label={`Switch to the ${selectedTheme} theme`}
          aria-pressed={theme === selectedTheme}
        >
          {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;