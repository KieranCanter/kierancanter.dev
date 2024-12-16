'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import BusinessCard from '@/app/businessCard';
import About from '@/app/about';
import Experience from '@/app/experience';
import Works from '@/app/works';

/**
 * Desktop Navigation Component
 * Handles the desktop version of the site navigation and content display
 * Only visible on large screens (lg: breakpoint and above)
 */
const DesktopNav = () => {
  // Track currently active section/tab
  const [activeTab, setActiveTab] = useState('home');

  /**
   * Handle tab changes from header navigation
   * @param newTab - The ID of the newly selected tab
   */
  const handleHeaderClick = (newTab: string) => {
    setActiveTab(newTab);
  };

  /**
   * Render the content for the currently active tab
   * Each section is wrapped in a container with consistent styling
   */
  const renderContent = () => {
    return (
      <div className="flex h-full justify-center overflow-y-auto overscroll-y-contain">
        {activeTab === 'home' && (
          <div className="flex relative mb-20 px-4 overflow-y-auto overscroll-y-contain pointer-events-none">
            <BusinessCard isActive={true} />
          </div>
        )}
        {/* About Section */}
        {activeTab === 'about' && (
          <About isActive={true} />
        )}
        {/* Experience Section */}
        {activeTab === 'experience' && (
          <Experience isActive={true} />
        )}
        {/* Works Section */}
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
