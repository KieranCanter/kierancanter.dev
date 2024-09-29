'use client';

import '@/styles/globals.scss';
import React, { useContext } from 'react';
import ThemeSwitcher from '@/components/themeSwitcher';
import BusinessCard from "@/components/businessCard";
import { ThemeContext } from '@/context/themeContext';

const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div id="home" className="flex flex-col items-center justify-between min-h-screen p-4 transition-colors duration-250 ease-in-out bg-bg text-fgSoft selection-default">
      <div className="w-full max-w-full mx-auto relative">
        <div className="flex flex-col items-center mb-4">
          <ThemeSwitcher />
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