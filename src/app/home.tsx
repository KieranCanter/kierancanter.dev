'use client';

import '@/styles/globals.scss';
import React from 'react';
import Header from '@/app/components/sections/header';
import BusinessCard from "@/app/components/businessCard";

const Home: React.FC = () => {

  return (
    <div id="home" className="flex flex-col items-center justify-between min-h-screen transition-colors duration-[250ms] bg-bg text-fgSoft selection-default">
      <div className="fixed w-full max-w-full top-0 mx-auto z-[100]">
        <Header />
      </div>

      <div className="flex-grow flex items-center justify-center w-full">
        <BusinessCard />
      </div>
    </div>
  );
};

export default Home;