'use client';

import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { colorfulVars, getContrastColor } from '@/util/colorfulSetter';
import { trackEvent } from '@/util/analytics';

type Theme = 'plush' | 'sombre' | 'brilliant' | 'luminous';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'plush',
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('plush');
  const [mounted, setMounted] = useState(false);
  const themeStartTimeRef = useRef<number>(Date.now());

  /*// Track time spent on theme
  const trackThemeTime = (themeName: Theme) => {
    const timeSpent = Math.floor((Date.now() - themeStartTimeRef.current) / 1000);
    trackEvent('Theme Duration', { 
      theme: themeName,
      seconds: timeSpent
    });
  };*/

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

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);

      // Change the contrast and accent colors only when switching to/from brilliant/luminous
      if (theme === 'brilliant' || theme === 'luminous') {
        const contrastColor = document.documentElement.style.getPropertyValue(`--${theme}-fg-contrast`);
        
        
        const newContrastColor = theme === 'brilliant' 
          ? getContrastColor(colorfulVars.brilliant, [contrastColor])
          : getContrastColor(colorfulVars.luminous, [contrastColor]);

        document.documentElement.style.setProperty(`--${theme}-fg-contrast`, newContrastColor);
      }
    }
  }, [theme, mounted]);

  const setThemeAndSave = (newTheme: Theme) => {
    requestAnimationFrame(() => {
      // Track time spent on previous theme
      //trackThemeTime(theme);
      
      // Reset timer for new theme
      themeStartTimeRef.current = Date.now();
      
      setTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    });
  };

  // Track final theme duration when component unmounts
  /*useEffect(() => {
    return () => trackThemeTime(theme);
  }, [theme]);*/

  // Avoid rendering children until after client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeAndSave }}>
      {children}
    </ThemeContext.Provider>
  );
};

