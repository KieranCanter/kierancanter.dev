'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import BusinessCard from '@/app/businessCard';
import About from '@/app/about';
import Experience from '@/app/experience';
import Works from '@/app/works';

const DesktopNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleHeaderClick = (newTab: string) => {
    setActiveTab(newTab);
  };

  const renderContent = () => {
    return (
      <div className="flex h-full justify-center overflow-y-auto overscroll-y-contain">
        {activeTab === 'home' && (
          <div className="flex relative mb-20 px-4 overflow-y-auto overscroll-y-contain pointer-events-none">
            <BusinessCard isActive={true} />
          </div>
        )}
        {activeTab === 'about' && (
          <About isActive={true} />
        )}
        {activeTab === 'experience' && (
          <Experience isActive={true} />
        )}
        {activeTab === 'works' && (
          <Works isActive={true} />
        )}
      </div>
    );
  };

  return (
    <div className="max-lg:hidden flex flex-col w-full h-full">
      <div className="flex justify-center">
        <Header activeTab={activeTab} onTabChange={handleHeaderClick} />
      </div>
      
      <main className="flex w-fit h-full mx-auto my-4 overflow-x-hidden overflow-y-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default DesktopNav;
