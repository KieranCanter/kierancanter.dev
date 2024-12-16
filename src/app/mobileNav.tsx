'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Header from '@/components/header';
import BusinessCard from './businessCard';
import About from './about';
import Experience from './experience';
import Works from './works';
import ThemeSwitcher from '@/components/themeSwitcher';

/**
 * MobileNav Component
 * Handles mobile navigation and content display using Embla Carousel
 * Only visible on small/medium screens (below lg breakpoint)
 */
const MobileNav = () => {
  // Track currently active tab/section
  const [activeTab, setActiveTab] = useState('home');
  
  // Initialize Embla Carousel with mobile-friendly settings
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',          // Align slides to start of viewport
    skipSnaps: false,        // Always snap to slide boundaries
    dragFree: false,         // Restrict free-form dragging
    containScroll: 'keepSnaps', // Keep slides within viewport
  });

  // Define available tabs and their corresponding components
  const tabs = useMemo(() => [
    { id: 'home', component: <BusinessCard isActive={true} /> },
    { id: 'about', component: <About isActive={true} /> },
    { id: 'experience', component: <Experience isActive={true} /> },
    { id: 'works', component: <Works isActive={true} /> }
  ], []);

  /**
   * Handle tab changes from header navigation
   * Scrolls carousel to selected tab and updates active state
   */
  const handleHeaderClick = useCallback((newTab: string) => {
    const index = tabs.findIndex(tab => tab.id === newTab);
    emblaApi?.scrollTo(index);  // Scroll carousel to selected tab
    setActiveTab(newTab);
  }, [emblaApi, tabs]);

  /**
   * Sync carousel state with active tab
   * Updates active tab when carousel slides change
   */
  useEffect(() => {
    if (!emblaApi) return;

    // Update active tab when carousel settles
    emblaApi.on('settle', () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveTab(tabs[index].id);
    });

    // Update active tab during scroll
    emblaApi.on('select', () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveTab(tabs[index].id);
    });

    // Cleanup event listeners
    return () => {
      emblaApi.off('settle', () => {});
      emblaApi.off('select', () => {});
    };
  }, [emblaApi, tabs]);

  return (
    <div className="lg:hidden flex flex-col w-full h-full">
      {/* Header Navigation */}
      <div className="flex w-full justify-center">
        <Header activeTab={activeTab} onTabChange={handleHeaderClick} />
      </div>
      
      {/* Main Content Carousel */}
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

      {/* Theme Switcher */}
      <div className="relative flex justify-end m-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default MobileNav;
