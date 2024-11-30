'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Header from '@/components/header';
import BusinessCard from './businessCard';
import About from './about';
import Experience from './experience';
import Works from './works';
import ThemeSwitcher from '@/components/themeSwitcher';

const MobileNav = () => {
  const [activeTab, setActiveTab] = useState('home');
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

  const handleHeaderClick = useCallback((newTab: string) => {
    const index = tabs.findIndex(tab => tab.id === newTab);
    emblaApi?.scrollTo(index);
    setActiveTab(newTab);
  }, [emblaApi, tabs]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('settle', () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveTab(tabs[index].id);
    });

    emblaApi.on('select', () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveTab(tabs[index].id);
    });

    return () => {
      emblaApi.off('settle', () => {});
      emblaApi.off('select', () => {});
    };
  }, [emblaApi, tabs]);

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
