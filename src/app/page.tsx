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
    <div className="flex flex-col items-center justify-center h-screen transition-colors duration-250 ease-in-out bg-bg text-fgSoft selection-default">
      <div className="relative w-full m-auto mt-4 px-4">
        <div className="flex justify-center">
          <ThemeSwitcher onThemeChange={handleThemeChange} />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <p className="font-mono px-2 py-1">
            <span className="transition-colors duration-250 ease-in-out font-bold text-fgContrast selection:bg-fgContrast selection:text-bg">{theme}</span>
          </p>
        </div>
      </div>
      <div className="flex absolute justify-center items-center">
        <BusinessCard />
      </div>
    </div>
  );
};

export default Home;