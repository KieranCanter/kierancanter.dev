'use client';

import '@/styles/globals.scss';
import React, { useState, useEffect } from 'react';
import ThemeSwitcher from '@/components/themeSwitcher';
import BusinessCard from "@/components/businessCard";

const Home: React.FC = () => {
  const [theme, setTheme] = useState('plush');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    fetch('/site.webmanifest')
      .then(response => response.json())
      .then(manifest => {
        manifest.theme_color = getComputedStyle(document.documentElement).getPropertyValue(`--bg`);
        manifest.background_color = getComputedStyle(document.documentElement).getPropertyValue(`--bg`);
      });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      handleThemeChange(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "sombre" : "plush";
      handleThemeChange(initialTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        handleThemeChange(e.matches ? "sombre" : "plush");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div id="home" className="flex flex-col items-center justify-between min-h-screen p-4 transition-colors duration-250 ease-in-out bg-bg text-fgSoft selection-default">
      <div className="w-full max-w-full mx-auto relative">
        <div className="flex flex-col items-center mb-4">
          <ThemeSwitcher onThemeChange={handleThemeChange} />
          <p className="font-mono px-2 py-1 inline-block mt-2 md:mt-0 md:absolute md:top-0 md:right-0">
            <span className="transition-colors duration-250 ease-in-out font-bold text-fgContrast selection:bg-fgContrast selection:text-bg">{theme}</span>
          </p>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        <BusinessCard />
      </div>
    </div>
  );
};

export default Home;