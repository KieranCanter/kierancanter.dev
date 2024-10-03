'use client';

import '@/styles/globals.scss';
import React from 'react';
import Header from '@/app/components/sections/header';
import BusinessCard from "@/app/components/businessCard";

const Home: React.FC = () => {

  return (
    <div id="home" className="flex flex-col min-h-screen transition-all duration-[250ms] bg-bg text-fgSoft selection-default">
      <Header />

      <div className="relative flex items-center justify-center mt-[50vh] md:mt-[60vh] lg:mt-[50vh] -translate-y-1/2 mb-[50vh]">
        <BusinessCard />
      </div>

      <div className="relative flex items-center justify-center w-full mb-10">
        <BusinessCard />
      </div>

      <div className="relative flex items-center justify-center w-full mb-10">
        <BusinessCard />
      </div>

      <div className="relative flex items-center justify-center w-full mb-10">
        <BusinessCard />
      </div>

      <div className="relative flex items-center justify-center w-full mb-10">
        <BusinessCard />
      </div>

      <div className="relative flex items-center justify-center w-full mb-10">
        <BusinessCard />
      </div>

    </div>
  );
};

export default Home;