'use client';

import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import Header from '@/components/header';
import BusinessCard from './businessCard';
import About from './about';
import Experience from './experience';
import Works from './works';
import ThemeSwitcher from '@/components/themeSwitcher';

const MobileNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleHeaderClick = (newTab: string) => {
    setActiveTab(newTab);
  };

  const currentIndex = ['home', 'about', 'experience', 'works'].indexOf(activeTab);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const nextTabs = {
        'home': 'about',
        'about': 'experience',
        'experience': 'works'
      };
      if (nextTabs[activeTab as keyof typeof nextTabs]) {
        setActiveTab(nextTabs[activeTab as keyof typeof nextTabs]);
      }
    },
    onSwipedRight: () => {
      const prevTabs = {
        'about': 'home',
        'experience': 'about',
        'works': 'experience'
      };
      if (prevTabs[activeTab as keyof typeof prevTabs]) {
        setActiveTab(prevTabs[activeTab as keyof typeof prevTabs]);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const renderContent = () => {
    return (
      <div {...handlers} className="flex gap-4 w-full h-full">
        {activeTab === 'home' && (
          <div className="flex-shrink-0 w-full h-full overflow-y-auto overscroll-y-contain my-4">
            <div className="relative flex h-full items-center justify-center px-4">
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
    <div className="lg:hidden flex flex-col w-full h-full">
      <div className="flex w-full justify-center">
        <Header activeTab={activeTab} onTabChange={handleHeaderClick} />
      </div>
      
      <main className="flex-1 h-full overflow-x-hidden overflow-y-hidden">
        {renderContent()}
      </main>
      <div className="lg:hidden relative flex justify-end pointer-events-auto">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default MobileNav;
