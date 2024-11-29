'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import BusinessCard from '@/app/businessCard';
import About from '@/app/about';
import Experience from '@/app/experience';
import Works from '@/app/works';
import ThemeSwitcher from '@/components/themeSwitcher';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="relative flex items-center justify-center h-full px-4 pointer-events-none">
            <BusinessCard />
          </div>
        );
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'works':
        return <Works />;
      default:
        return (
          <div className="relative flex items-center justify-center h-full px-4 pointer-events-none">
            <BusinessCard />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] justify-center">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <main className="flex-1 h-full justify-items-center my-4 overflow-y-auto">
        {renderContent()}
      </main>

      <div className="lg:hidden relative flex justify-end pointer-events-auto">
        <ThemeSwitcher />
      </div>
    </div>
  );
}