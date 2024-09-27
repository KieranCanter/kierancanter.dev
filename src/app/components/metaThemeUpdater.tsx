'use client';

import { useEffect } from 'react';

export function MetaThemeUpdater() {
  useEffect(() => {
    // Function to update theme color
    const updateThemeColor = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkMode ? '#000000' : '#ffffff');
    };

    // Initial call
    updateThemeColor();

    // Listen for changes in color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);

    // Cleanup
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateThemeColor);
    };
  }, []);

  return null;
}