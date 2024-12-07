'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Header from '@/components/header';
import BusinessCard from './businessCard';
import About from './about';
import Experience from './experience';
import Works from './works';
import ThemeSwitcher from '@/components/themeSwitcher';
import { trackEvent } from '@/util/analytics';

const MobileNav = () => {
  const [activeTab, setActiveTab] = useState('home');
  const startTimeRef = useRef<number>(Date.now());
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'keepSnaps',
  });

  const tabs = [
    { id: 'home', component: <BusinessCard isActive={true} /> },
    { id: 'about', component: <About isActive={true} /> },
    { id: 'experience', component: <Experience isActive={true} /> },
    { id: 'works', component: <Works isActive={true} /> }
  ];

  const trackSectionTime = (section: string) => {
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    trackEvent('Section Duration', { 
      section: section,
      seconds: timeSpent
    });
  };

  const handleHeaderClick = useCallback((newTab: string) => {
    // Track time spent on current section before changing
    trackSectionTime(activeTab);
    
    // Reset timer and change tab
    startTimeRef.current = Date.now();
    const index = tabs.findIndex(tab => tab.id === newTab);
    emblaApi?.scrollTo(index);
    setActiveTab(newTab);
  }, [emblaApi, activeTab]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('settle', () => {
      const index = emblaApi.selectedScrollSnap();
      const newTab = tabs[index].id;
      
      // Track time spent on current section
      trackSectionTime(activeTab);

      // Reset timer and update tab
      startTimeRef.current = Date.now();
      setActiveTab(newTab);
    });

    // Track final section time when leaving page
    return () => trackSectionTime(activeTab);
  }, [emblaApi, activeTab]);

  return (
    <div className="lg:hidden flex flex-col w-full h-full">
      <div className="flex w-full justify-center">
        <Header activeTab={activeTab} onTabChange={handleHeaderClick} />
      </div>
      
      <main className="flex-1 overflow-hidden h-full">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex touch-pan-y h-full">
            {tabs.map((tab) => (
              <div 
                key={tab.id} 
                className={`w-full flex-none px-4 overflow-y-auto ${
                  tab.id === 'home' ? 'flex items-center justify-center' : ''
                }`}
              >
                {tab.component}
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="relative flex justify-end m-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default MobileNav;
