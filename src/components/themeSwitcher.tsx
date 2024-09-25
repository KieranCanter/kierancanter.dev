'use client';

import React from 'react';

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
}


const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {

  return (
    <div className="flex flex-row gap-2 p-2 rounded-sm m-auto mt-4 mb-0" >
      <button
        onClick={() => onThemeChange('plush')} 
        className="w-24 bg-plush-bg text-plush-fgSoft p-1 rounded-sm border-plush-fgSoft border selection:bg-plush-fgSoft selection:text-plush-bg hover:shadow-md hover:-translate-y-0.5 active:text-plush-fgHard active:border-plush-fgHard transition-all duration-250 ease-in-out"
      >
        Plush
      </button>
      <button 
        onClick={() => onThemeChange('sombre')} 
        className="w-24 bg-sombre-bg text-sombre-fgSoft p-1 rounded-sm border-sombre-fgSoft border selection:bg-sombre-fgSoft selection:text-sombre-bg hover:shadow-md hover:-translate-y-0.5 active:text-sombre-fgHard active:border-sombre-fgHard transition-all duration-250 ease-in-out"
      >
        Sombre
      </button>
      <button 
        onClick={() => onThemeChange('brilliant')} 
        className="w-24 bg-brilliant-bg text-brilliant-fgSoft p-1 rounded-sm border-brilliant-fgSoft border selection:bg-brilliant-fgSoft selection:text-brilliant-bg hover:shadow-md hover:-translate-y-0.5 active:text-brilliant-fgHard active:border-brilliant-fgHard transition-all duration-250 ease-in-out"
      >
        Brilliant
      </button>
      <button 
        onClick={() => onThemeChange('luminous')} 
        className="w-24 bg-luminous-bg text-luminous-fgSoft p-1 rounded-sm border-luminous-fgSoft border selection:bg-luminous-fgSoft selection:text-luminous-bg hover:shadow-md hover:-translate-y-0.5 active:text-luminous-fgHard active:border-luminous-fgHard transition-all duration-250 ease-in-out"
      >
        Luminous
      </button>
    </div>
  );
};

export default ThemeSwitcher;