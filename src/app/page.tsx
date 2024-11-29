'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import BusinessCard from '@/app/businessCard';
import About from '@/app/about';
import Experience from '@/app/experience';
import Works from '@/app/works';
import ThemeSwitcher from '@/components/themeSwitcher';
import { useSwipeable } from 'react-swipeable';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastX, setLastX] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [velocities, setVelocities] = useState<number[]>([]);
  const [swipeDistances, setSwipeDistances] = useState({ left: 0, right: 0 });

  const tabs = ['home', 'about', 'experience', 'works'];
  const currentIndex = tabs.indexOf(activeTab);

  const GAP_SIZE = 19;
  const MAX_ANGLE_DEGREES = 15;

  const calculateSwipeAngle = (deltaX: number, deltaY: number): number => {
    return Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * (180 / Math.PI);
  };

  const handleTabChange = (newTab: string) => {
    setIsAnimating(true);
    setDragOffset(0);
    setActiveTab(newTab);
  };

  const swipeHandlers = useSwipeable({
    onSwipeStart: (event) => {
      setLastX(event.deltaX);
      setLastTime(Date.now());
      setSwipeDistances({ left: 0, right: 0 });
      setVelocities([]);
    },
    
    onSwiping: (event) => {
      const angle = calculateSwipeAngle(event.deltaX, event.deltaY);
      
      if (angle > MAX_ANGLE_DEGREES) {
        setDragOffset(0);
        return;
      }

      const currentTime = Date.now();
      
      if (lastX !== null && lastTime !== null) {
        const deltaX = event.deltaX - lastX;
        const deltaTime = currentTime - lastTime;
        const velocity = deltaX / deltaTime;

        setVelocities(prev => [...prev, velocity].slice(-5));
        setSwipeDistances(prev => ({
          left: prev.left + (deltaX < 0 ? Math.abs(deltaX) : 0),
          right: prev.right + (deltaX > 0 ? Math.abs(deltaX) : 0),
        }));
      }

      setLastX(event.deltaX);
      setLastTime(currentTime);
      setDragOffset(event.deltaX);
    },

    onSwipedLeft: (event) => {
      const angle = calculateSwipeAngle(event.deltaX, event.deltaY);
      const recentVelocitiesConsistent = velocities.slice(-3).every(v => v < -0.1);

      if (angle > MAX_ANGLE_DEGREES || 
          !recentVelocitiesConsistent || 
          swipeDistances.left <= swipeDistances.right) {
        setDragOffset(0);
        return;
      }

      const threshold = window.innerWidth * 0.1;
      if (Math.abs(event.deltaX) > threshold && currentIndex < tabs.length - 1) {
        handleTabChange(tabs[currentIndex + 1]);
      } else {
        setIsAnimating(true);
        setDragOffset(0);
      }
    },

    onSwipedRight: (event) => {
      const angle = calculateSwipeAngle(event.deltaX, event.deltaY);
      const recentVelocitiesConsistent = velocities.slice(-3).every(v => v > 0.1);

      if (angle > MAX_ANGLE_DEGREES || 
          !recentVelocitiesConsistent || 
          swipeDistances.right <= swipeDistances.left) {
        setDragOffset(0);
        return;
      }

      const threshold = window.innerWidth * 0.1;
      if (Math.abs(event.deltaX) > threshold && currentIndex > 0) {
        handleTabChange(tabs[currentIndex - 1]);
      } else {
        setIsAnimating(true);
        setDragOffset(0);
      }
    },

    onTouchEndOrOnMouseUp: () => {
      if (dragOffset !== 0) {
        setIsAnimating(true);
        setDragOffset(0);
      }
      setLastX(null);
      setLastTime(null);
      setVelocities([]);
      setSwipeDistances({ left: 0, right: 0 });
    },
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
    delta: 3,
    swipeDuration: 500,
    touchEventOptions: { passive: true },
  });

  const renderContent = () => {
    const sectionWidth = 100 + (GAP_SIZE / window.innerWidth * 100);
    const translateX = -(currentIndex * sectionWidth) + (dragOffset / window.innerWidth * 100);
    
    return (
      <div 
        className={`flex gap-4 w-full h-full will-change-transform ${
          isAnimating ? 'transition-transform duration-[250ms]] ease-out' : ''
        }`}
        style={{ transform: `translateX(${translateX}%)` }}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        <div className="flex-shrink-0 w-full h-full overflow-y-auto overscroll-y-contain my-4">
          <div className="relative flex h-full items-center justify-center px-4">
            <BusinessCard />
          </div>
        </div>
        <div className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
          <About />
        </div>
        <div className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
          <Experience />
        </div>
        <div className="flex-shrink-0 w-full justify-items-center overflow-y-auto overscroll-y-contain my-4">
          <Works />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full touch-pan-y">
      <div className="flex w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] justify-center">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <main 
        className="flex-1 h-full overflow-x-hidden lg:pointer-events-none"
        {...swipeHandlers}
      >
        {renderContent()}
      </main>

      <div className="lg:hidden relative flex justify-end pointer-events-auto">
        <ThemeSwitcher />
      </div>
    </div>
  );
}