'use client';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '@/context/themeContext';
import '@/styles/variables.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher: React.FC = () => {
  type Theme = 'plush' | 'sombre' | 'brilliant' | 'luminous';
  const { theme, setTheme } = useContext(ThemeContext);

  const [toneIcon, setToneIcon] = useState(theme === 'plush' || theme === 'brilliant' ? faMoon : faSun);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toneIconRef = document.getElementById('tone-icon');
  const animateToneIcon = () => {
    if (toneIconRef) {
      toneIconRef.animate([
        { transform: 'rotate(0deg) scale(1)', offset: 0 },
        { transform: 'rotate(360deg) scale(0)', offset: 0.5 },
        { transform: 'rotate(720deg) scale(1)', offset: 1 }
      ], {
        duration: 250,
        easing: 'ease-in-out',
        fill: 'forwards'
      });

      // Change the icon after 125ms
      setTimeout(() => {
        setToneIcon(theme === 'plush' || theme === 'brilliant' ? faSun : faMoon);
      }, 125);
    }
  };

  const toggleDarkMode = () => {
    animateToneIcon();
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
      <button id="tone-button" className="group relative flex items-center justify-center w-12 h-12 cursor-pointer bg-fgSoft border-[0.2rem] border-fgSoft rounded-sm opacity-80 transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-fgContrast hover:shadow-sm hover:opacity-100 active:opacity-85" 
        onClick={toggleDarkMode} 
        aria-label="Toggle Dark Mode">
          <FontAwesomeIcon
            id="tone-icon"
            icon={toneIcon}
            className="fa-sharp fa-regular text-fgSoft text-2xl group-hover:text-toneColor transition-all duration-[250ms]"
            aria-hidden="true"
          />
      </button>
      <button id="color-button" className="relative flex items-center justify-center w-12 h-12 cursor-pointer bg-fgSoft border-[0.2rem] border-fgSoft rounded-sm opacity-80 hover:opacity-100 transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-fgContrast hover:shadow-sm active:opacity-85"
        onClick={toggleColorful} aria-label="Toggle Colorful Mode">
        <div id="trefoil1" className="trefoil-classes bg-trefoil1 left-[50%] top-[40%] z-30"></div>
        <div id="trefoil2" className="trefoil-classes bg-trefoil2 left-[40%] top-[60%] z-20"></div>
        <div id="trefoil3" className="trefoil-classes bg-trefoil3 left-[60%] top-[60%] z-10"></div>
      </button>
    </div>  );
};

export default ThemeSwitcher;