'use client';

import '@/app/globals.scss';
import React, { useState, useEffect } from 'react';
import ThemeSwitcher from '@/app/components/themeSwitcher';
import BusinessCard from "@/app/components/businessCard";


const Home: React.FC = () => {
  const [theme, setTheme] = useState('plush');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = prefersDark ? "sombre" : "plush"; // Set default theme based on system preference
    handleThemeChange(initialTheme);
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