'use client';

import React from 'react';

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {

  const getThemeClasses = (theme: string) => {
    const baseClasses = 'hover:-translate-y-0.5';
    switch (theme) {
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
    <div id="theme-switcher" className="flex flex-row justify-center gap-2 w-full max-w-md">
      {['plush', 'sombre', 'brilliant', 'luminous'].map((theme) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme)}
          className={`flex-1 w-1/4 p-2 rounded-sm border transition-all duration-250 ease-in-out text-sm ${getThemeClasses(theme)}`}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;