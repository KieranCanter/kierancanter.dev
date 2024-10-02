'use client';

import '@/styles/globals.scss';
import React from 'react';
import Header from '@/app/sections/header';
import BusinessCard from "@/app/components/businessCard";

const Home: React.FC = () => {

  return (
    <div id="home" className="flex flex-col items-center justify-between min-h-screen p-4 transition-colors duration-[250ms] bg-bg text-fgSoft selection-default">
      <div className="absolute px-16 py-4 w-full max-w-full mx-auto">
        <Header />
      </div>

      <div className="flex-grow flex items-center justify-center w-full">
        <BusinessCard />
      </div>
    </div>
  );
};

export default Home;