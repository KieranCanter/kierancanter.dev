'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { colorfulVars, getContrastColor } from '@/util/colorfulSetter';

/**
 * Available theme options
 * - Plush: Light subdued theme with accented colors
 * - Sombre: Dark subdued theme with accented colors
 * - brilliant: Light vibrant theme with colorful elements
 * - Luminous: Dark vibrant theme with colorful elements
 */
type Theme = 'plush' | 'sombre' | 'brilliant' | 'luminous';

/**
 * Theme context interface
 * @property {Theme} theme - Current active theme
 * @property {function} setTheme - Function to update the active theme
 */
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * Create theme context with default values
 * Default theme is 'plush' (light accented)
 */
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'plush',
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider Component
 * Manages theme state and persistence
 * Handles system preference detection and theme application
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('plush');
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme on mount
   * Checks localStorage and system preferences
   */
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['plush', 'sombre', 'brilliant', 'luminous'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkMode ? 'sombre' : 'plush');
    }
  }, []);

  /**
   * Apply theme changes to document
   * Updates CSS variables and generates new contrast colors for colorful themes
   */
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);

      // Change the contrast and accent colors only when switching to/from brilliant/luminous
      if (theme === 'brilliant' || theme === 'luminous') {
        const contrastColor = document.documentElement.style.getPropertyValue(`--${theme}-fg-contrast`);
        
        // Generate new contrast color avoiding the current one
        const newContrastColor = theme === 'brilliant' 
          ? getContrastColor(colorfulVars.brilliant, [contrastColor])
          : getContrastColor(colorfulVars.luminous, [contrastColor]);

        document.documentElement.style.setProperty(`--${theme}-fg-contrast`, newContrastColor);
      }
    }
  }, [theme, mounted]);

  /**
   * Theme setter with animation frame handling
   * Ensures smooth theme transitions
   */
  const setThemeAndSave = (newTheme: Theme) => {
    requestAnimationFrame(() => {
      setTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    });
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeAndSave }}>
      {children}
    </ThemeContext.Provider>
  );
};

