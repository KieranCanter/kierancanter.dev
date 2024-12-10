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
      <div className="flex gap-4 w-full h-full">
        {/* Home/BusinessCard Section */}
        {activeTab === 'home' && (
          <section aria-label="Home" className="flex-shrink-0 w-full h-full overflow-y-auto overscroll-y-contain my-4">
            <div className="relative flex h-full items-center justify-center px-4 pointer-events-none">
              <BusinessCard isActive={true} />
            </div>
          </section>
        )}
        {/* About Section */}
        {activeTab === 'about' && (
          <section aria-label="About" className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <About isActive={true} />
          </section>
        )}
        {/* Experience Section */}
        {activeTab === 'experience' && (
          <section aria-label="Experience" className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <Experience isActive={true} />
          </section>
        )}
        {/* Works Section */}
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
