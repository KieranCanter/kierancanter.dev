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
      <div className="flex gap-4 w-full h-full">
        {activeTab === 'home' && (
          <section aria-label="Home" className="flex-shrink-0 w-full h-full overflow-y-auto overscroll-y-contain my-4">
            <div className="relative flex h-full items-center justify-center px-4 pointer-events-none">
              <BusinessCard isActive={true} />
            </div>
          </section>
        )}
        {activeTab === 'about' && (
          <section aria-label="About" className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <About isActive={true} />
          </section>
        )}
        {activeTab === 'experience' && (
          <section aria-label="Experience" className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <Experience isActive={true} />
          </section>
        )}
        {activeTab === 'works' && (
          <section aria-label="Works" className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <Works isActive={true} />
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="hidden lg:flex flex-col w-full h-full">
      <div className="flex justify-center">
        <Header activeTab={activeTab} onTabChange={handleHeaderClick} />
      </div>
      
      <main className="flex-1 h-full overflow-x-hidden overflow-y-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default DesktopNav;
