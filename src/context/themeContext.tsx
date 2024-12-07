'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { colorfulVars, getContrastColor } from '@/util/colorfulSetter';

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

  // Add theme duration tracking
  useEffect(() => {
    if (!mounted) return;
    
    const startTime = Date.now();
    return () => {
      const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track(theme, {
          seconds: durationSeconds
        });
      }
    };
  }, [theme, mounted]);

  const setThemeAndSave = (newTheme: Theme) => {
    requestAnimationFrame(() => {
      setTheme(newTheme);
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', newTheme);
        }
    });
  };

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

