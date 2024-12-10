'use client';

import React, { useContext, useCallback } from 'react';
import { ThemeContext } from '@/context/themeContext';
import '@/styles/variables.scss';

/**
 * Valid theme types for the application
 * Combines dark/light with colorful/accented modes
 */
type ThemeType = 'sombre' | 'luminous' | 'brilliant' | 'plush';

/**
 * ThemeSwitcher Component
 * Provides UI controls for switching between different theme modes
 * Features toggles for dark mode and colorful mode
 */
const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  // Derive current states from theme
  const isDarkMode = theme === 'sombre' || theme === 'luminous';
  const isColorfulMode = theme === 'brilliant' || theme === 'luminous';

  /**
   * Handle theme toggle clicks
   * Uses a matrix to determine the next theme based on current state
   * @param themeType - The type of toggle clicked ('dark' or 'colorful')
   */
  const toggleTheme = useCallback((themeType: 'dark' | 'colorful') => {
    const themeMatrix: Record<ThemeType, { dark: ThemeType; colorful: ThemeType }> = {
      sombre: { dark: 'plush', colorful: 'luminous' },
      luminous: { dark: 'brilliant', colorful: 'sombre' },
      brilliant: { dark: 'luminous', colorful: 'plush' },
      plush: { dark: 'sombre', colorful: 'brilliant' },
    };
    setTheme(themeMatrix[theme as ThemeType][themeType]);
  }, [theme, setTheme]);

  /**
   * Theme Toggle Button Component
   * Renders a single theme toggle with label and active state
   */
  const ThemeToggle = ({ label, isActive, onToggle }: { label: string; isActive: boolean; onToggle: () => void }) => (
    <div className="flex items-center gap-2">
      <h4 className="max-lg:hidden font-ibm-plex-sans text-base font-medium text-fgSoft select-none">{label.toLowerCase()}</h4>
      <div className="relative w-24 lg:w-4 h-10 lg:h-4 cursor-pointer" onClick={onToggle}>
        <div className={`absolute flex items-center justify-center inset-0 border ${ isActive ? 'border-fgHard' : 'border-fgSoft' } `}>
          <h4 className={`lg:hidden font-ibm-plex-sans text-base font-medium z-10 ${ isActive ? 'text-bg' : 'text-fgSoft' } `}>{label.toUpperCase()}</h4>
        </div>
        <div className={`absolute bg-fgHard inset-0 transition-opacity duration-250 ${ isActive ? 'opacity-60 lg:opacity-60 hover:opacity-80' : 'opacity-0 hover:opacity-20' } `} />
      </div>
    </div>
  );

  return (
    <div 
      className="flex flex-row gap-4 items-end lg:items-center"
      role="group"
      aria-label="Theme switcher"
    >
      <h6 className="text-sm text-fgContrast" aria-label="Current theme">{theme}</h6>
      <ThemeToggle
        label="Dark"
        isActive={isDarkMode}
        onToggle={() => toggleTheme('dark')}
        aria-label={`Dark mode ${isDarkMode ? 'enabled' : 'disabled'}`}
      />
      <ThemeToggle 
        label="Colorful"
        isActive={isColorfulMode}
        onToggle={() => toggleTheme('colorful')}
        aria-label={`Colorful mode ${isColorfulMode ? 'enabled' : 'disabled'}`}
      />
    </div>
  );
};

export default ThemeSwitcher;
