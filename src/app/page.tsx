'use client';

import '@/app/globals.scss';
import React, { useState, useEffect } from 'react';
import ThemeSwitcher from '@/components/themeSwitcher';
import BusinessCard from "@/components/businessCard";


const Home: React.FC = () => {
  const [theme, setTheme] = useState('plush');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = prefersDark ? "sombre" : "plush"; // Set default theme based on system preference
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen transition-colors duration-250 ease-in-out bg-bg text-fgSoft selection-default">
      <ThemeSwitcher onThemeChange={handleThemeChange} />
      <div className="relative m-auto mt-4">
        Using the <span className="transition-colors duration-250 ease-in-out font-bold text-fgContrast selection:bg-fgContrast selection:text-bg">{theme}</span> theme
      </div>
      <div className="flex absolute justify-center items-center">
        <BusinessCard />
      </div>
    </div>
  );
};

export default Home;