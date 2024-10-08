'use client';

import '@/styles/globals.scss';
import React from 'react';
import Header from '@/app/components/sections/header';
import BusinessCard from "@/app/components/businessCard";

const Home: React.FC = () => {

  return (
    <div id="home" className="flex flex-col min-h-screen transition-all duration-[250ms] bg-bg text-fgSoft selection-default">
      <Header />

      <div className="relative flex items-center justify-center mt-[50dvh] md:mt-[60vh] lg:mt-[max(50vh,16rem)] -translate-y-1/2 mb-[50vh]">
        <BusinessCard />
      </div>

    </div>
  );
};

export default Home;