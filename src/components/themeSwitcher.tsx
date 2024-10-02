'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import '@/styles/variables.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher: React.FC = () => {
  type Theme = 'plush' | 'sombre' | 'brilliant' | 'luminous';
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toggleDarkMode = () => {
    if (theme === 'plush') {
      toggleTheme('sombre');
    } else if (theme === 'sombre') {
      toggleTheme('plush');
    } else if (theme === 'brilliant') {
      toggleTheme('luminous');
    } else {
      toggleTheme('brilliant');
    }
  };

  const toggleColorful = () => {
    if (theme === 'plush') {
      toggleTheme('brilliant');
    } else if (theme === 'brilliant') {
      toggleTheme('plush');
    } else if (theme === 'sombre') {
      toggleTheme('luminous');
    } else {
      toggleTheme('sombre');
    }
  };


  return (
    <div id="theme-switcher" className="flex flex-row justify-center gap-4 w-fit" aria-label="Theme Switcher">
      <button id="tone-button" className={`relative flex items-center justify-center w-12 h-12 cursor-pointer bg-fgSoft border-[0.2rem] border-fgSoft rounded-sm opacity-80 transition-all duration-[250] ease-in-out hover:-translate-y-0.5 hover:shadow-fgContrast hover:shadow-sm hover:opacity-100 active:opacity-85`} 
        onClick={toggleDarkMode}>
          <FontAwesomeIcon
          id="tone-icon"
          icon={theme === 'plush' ? faSun : faMoon}
          className="text-toneColor fa-xl fa-sharp fa-regular"
          aria-hidden="true"
          />
      </button>
      <button id="color-button" className="relative flex items-center justify-center w-12 h-12 cursor-pointer bg-fgSoft border-[0.2rem] border-fgSoft rounded-sm opacity-80 hover:opacity-100 transition-all duration-[250] ease-in-out hover:-translate-y-0.5 hover:shadow-fgContrast hover:shadow-sm active:opacity-85"
        onClick={toggleColorful}>
        <div id="trefoil1"className="trefoil-classes bg-trefoil1 left-[50%] top-[37%] z-30"></div>
        <div id="trefoil2" className="trefoil-classes bg-trefoil2 left-[37%] top-[63%] z-20"></div>
        <div id="trefoil3" className="trefoil-classes bg-trefoil3 left-[63%] top-[63%] z-10"></div>
      </button>
    </div>  );
};

export default ThemeSwitcher;