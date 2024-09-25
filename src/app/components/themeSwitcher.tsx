'use client';

import React from 'react';

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
}


const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  return (
    <div id="theme-switcher" className="flex flex-row justify-between w-[28rem] gap-2 p-2 rounded-sm m-auto">
      <button
        onClick={() => onThemeChange('plush')} 
        className="flex-1 bg-plush-bg text-plush-fgSoft p-1 rounded-sm border-plush-fgSoft border selection:bg-plush-fgSoft selection:text-plush-bg selection:hover:bg-plush-fgContrast selection:hover:text-plush-bg hover:text-plush-fgContrast hover:shadow-sm hover:shadow-plush-fgContrast hover:-translate-y-0.5 active:text-plush-fgHard active:border-plush-fgHard transition-all duration-250 ease-in-out"
      >
        Plush
      </button>
      <button 
        onClick={() => onThemeChange('sombre')} 
        className="flex-1 bg-sombre-bg text-sombre-fgSoft p-1 rounded-sm border-sombre-fgSoft border selection:bg-sombre-fgSoft selection:text-sombre-bg selection:hover:bg-sombre-fgContrast selection:hover:text-sombre-bg hover:text-sombre-fgContrast hover:shadow-sm hover:shadow-sombre-fgContrast hover:-translate-y-0.5 active:text-sombre-fgHard active:border-sombre-fgHard transition-all duration-250 ease-in-out"
      >
        Sombre
      </button>
      <button 
        onClick={() => onThemeChange('brilliant')} 
        className="flex-1 bg-brilliant-bg text-brilliant-fgSoft p-1 rounded-sm border-brilliant-fgSoft border selection:bg-brilliant-fgSoft selection:text-brilliant-bg selection:hover:bg-brilliant-fgContrast selection:hover:text-brilliant-bg hover:text-brilliant-fgContrast hover:shadow-sm hover:shadow-brilliant-fgContrast hover:-translate-y-0.5 active:text-brilliant-fgHard active:border-brilliant-fgHard transition-all duration-250 ease-in-out"
      >
        Brilliant
      </button>
      <button 
        onClick={() => onThemeChange('luminous')} 
        className="flex-1 bg-luminous-bg text-luminous-fgSoft p-1 rounded-sm border-luminous-fgSoft border selection:bg-luminous-fgSoft selection:text-luminous-bg selection:hover:bg-luminous-fgContrast selection:hover:text-luminous-bg hover:text-luminous-fgContrast hover:shadow-sm hover:shadow-luminous-fgContrast hover:-translate-y-0.5 active:text-luminous-fgHard active:border-luminous-fgHard transition-all duration-250 ease-in-out"
      >
        Luminous
      </button>
    </div>
  );
};

export default ThemeSwitcher;