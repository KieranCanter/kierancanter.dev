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
  const toneDuration = 250;
  const colorDuration = 500;

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
        duration: toneDuration,
        easing: 'ease-in-out',
        fill: 'forwards'
      });

      // Change the icon after 125ms
      setTimeout(() => {
        setToneIcon(theme === 'plush' || theme === 'brilliant' ? faSun : faMoon);
      }, toneDuration / 2);
    }
  };

  const animateTrefoils = () => {
    const trefoils = ['trefoil1', 'trefoil2', 'trefoil3'];

    trefoils.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const startTop = getComputedStyle(element).top;
        const startLeft = getComputedStyle(element).left;

        element.animate(
          [
            { top: startTop, left: startLeft, scale: 1, offset: 0 },
            { top: '50%', left: '50%', scale: 1, offset: 0.25 },
            { top: '50%', left: '50%', scale: 1, offset: 0.75 },
            { scale: 1.1, offset: 0.85 },
            { scale: 1.1, offset: 0.95 },
            { top: startTop, left: startLeft, scale: 1, offset: 1 },
          ],
          {
            duration: colorDuration,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        );
      }
    });
  };

  const toggleDarkMode = () => {
    animateToneIcon();
    setTimeout(() => {
      if (theme === 'plush') {
        toggleTheme('sombre');
      } else if (theme === 'sombre') {
        toggleTheme('plush');
      } else if (theme === 'brilliant') {
        toggleTheme('luminous');
      } else {
        toggleTheme('brilliant');
      }
    }, toneDuration / 2);
  };

  const toggleColorful = () => {
    animateTrefoils();
    setTimeout(() => {
      if (theme === 'plush') {
        toggleTheme('brilliant');
      } else if (theme === 'brilliant') {
        toggleTheme('plush');
      } else if (theme === 'sombre') {
        toggleTheme('luminous');
      } else {
        toggleTheme('sombre');
      }
    }, colorDuration / 2);
  };

  return (
    <div id="theme-switcher" className="flex flex-row justify-center gap-4 w-fit" aria-label="Theme Switcher">
      <button id="tone-button" className="group relative flex items-center justify-center w-12 h-12 cursor-pointer bg-fgSoft border-[0.2rem] border-fgSoft rounded-sm opacity-80 transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-fgContrast hover:shadow-sm hover:opacity-100 active:opacity-85" 
        onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          <FontAwesomeIcon
            id="tone-icon"
            icon={toneIcon}
            className="fa-sharp fa-regular text-fgSoft text-2xl group-hover:text-toneColor transition-all duration-[250ms]"
            aria-hidden="true"
          />
      </button>
      <button id="color-button" className="group relative flex items-center justify-center w-12 h-12 cursor-pointer bg-fgSoft border-[0.2rem] border-fgSoft rounded-sm opacity-80 hover:opacity-100 transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-fgContrast hover:shadow-sm active:opacity-85"
        onClick={toggleColorful} aria-label="Toggle Colorful Mode">
        <div id="trefoil1" className="trefoil-classes bg-trefoil1 left-[50%] top-[40%] z-30"></div>
        <div id="trefoil2" className="trefoil-classes bg-trefoil2 left-[40%] top-[60%] z-20"></div>
        <div id="trefoil3" className="trefoil-classes bg-trefoil3 left-[60%] top-[60%] z-10"></div>
      </button>
    </div>  );
};

export default ThemeSwitcher;