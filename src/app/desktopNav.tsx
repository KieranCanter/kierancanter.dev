'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import BusinessCard from '@/components/businessCard';
import About from '@/components/about';
import Experience from '@/components/experience';
import Works from '@/components/works';

/**
 * Desktop Navigation Component
 * Handles the desktop version of the site navigation and content display
 * Only visible on large screens (lg: breakpoint and above)
 */
const DesktopNav = () => {
  // Track currently active section/tab
  const [activeTab, setActiveTab] = useState('home');

  /**
   * Render the content for the currently active tab
   * Each section is wrapped in a container with consistent styling
   */
  const renderContent = () => {
    return (
      <div className="flex w-full h-full justify-center overflow-y-auto overscroll-y-contain">
        {/* Keep all components mounted but only show active one */}
        <div className={`${activeTab === 'home' ? 'flex relative mb-20 px-4 overflow-y-auto overscroll-y-contain pointer-events-none' : 'hidden'}`}>
          <BusinessCard isActive={activeTab === 'home'} />
        </div>
        
        <div className={`${activeTab === 'about' ? '' : 'hidden'}`}>
          <About isActive={activeTab === 'about'} />
        </div>
        
        <div className={`${activeTab === 'experience' ? '' : 'hidden'}`}>
          <Experience isActive={activeTab === 'experience'} />
        </div>
        
        <div className={`${activeTab === 'works' ? '' : 'hidden'}`}>
          <Works isActive={activeTab === 'works'} />
        </div>
      </div>
    );
  };

  return (
    <div className="max-lg:hidden flex flex-col w-full h-full">
      <div className="flex justify-center">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <main className="flex w-full h-full mx-auto mt-2 overflow-x-hidden overflow-y-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default DesktopNav;
