'use client';

import '@/app/globals.scss';
import React, { useState, useEffect } from 'react';
import ThemeSwitcher from '@/app/components/themeSwitcher';
import BusinessCard from "@/app/components/businessCard";

const Home: React.FC = () => {
  const [theme, setTheme] = useState('plush');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <ThemeSwitcher onThemeChange={handleThemeChange} />
        </div>
        <div className="text-center mb-4">
          <p className="font-mono px-2 py-1 inline-block">
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