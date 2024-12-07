'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/header';
import BusinessCard from '@/app/businessCard';
import About from '@/app/about';
import Experience from '@/app/experience';
import Works from '@/app/works';
import ThemeSwitcher from '@/components/themeSwitcher';
import { trackEvent } from '@/util/analytics';

const DesktopNav = () => {
  const [activeTab, setActiveTab] = useState('home');
  const startTimeRef = useRef<number>(Date.now());

  const trackSectionTime = (section: string) => {
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    trackEvent('Section Duration', { 
      section: section,
      seconds: timeSpent
    });
  };

  const handleHeaderClick = (newTab: string) => {
    // Track time spent on current section before changing
    trackSectionTime(activeTab);
    
    // Reset timer and change tab
    startTimeRef.current = Date.now();
    setActiveTab(newTab);
  };

  // Track final section time when leaving page
  useEffect(() => {
    return () => trackSectionTime(activeTab);
  }, [activeTab]);

  const renderContent = () => {
    return (
      <div className="flex gap-4 w-full h-full">
        {activeTab === 'home' && (
          <div className="flex-shrink-0 w-full h-full overflow-y-auto overscroll-y-contain my-4">
            <div className="relative flex h-full items-center justify-center px-4 pointer-events-none">
              <BusinessCard isActive={true} />
            </div>
          </div>
        )}
        {activeTab === 'about' && (
          <div className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <About isActive={true} />
          </div>
        )}
        {activeTab === 'experience' && (
          <div className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <Experience isActive={true} />
          </div>
        )}
        {activeTab === 'works' && (
          <div className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
            <Works isActive={true} />
          </div>
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
