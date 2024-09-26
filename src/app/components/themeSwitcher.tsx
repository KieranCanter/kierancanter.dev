'use client';

import React from 'react';

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
}


const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  return (
    <div id="theme-switcher" className="flex flex-row justify-center gap-2 w-full max-w-md">
      {['plush', 'sombre', 'brilliant', 'luminous'].map((theme) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme)}
          className={`flex-1 w-1/4 bg-${theme}-bg text-${theme}-fgSoft p-2 rounded-sm border-${theme}-fgSoft border selection:bg-${theme}-fgSoft selection:text-${theme}-bg selection:hover:bg-${theme}-fgContrast selection:hover:text-${theme}-bg hover:text-${theme}-fgContrast hover:shadow-sm hover:shadow-${theme}-fgContrast hover:-translate-y-0.5 active:text-${theme}-fgHard active:border-${theme}-fgHard transition-all duration-250 ease-in-out text-sm`}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;