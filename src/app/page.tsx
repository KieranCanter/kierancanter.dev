'use client';

import React, { useState } from 'react';
import BusinessCard from '@/app/businessCard';
import About from '@/app/about';
import Experience from '@/app/experience';
import Works from '@/app/works';

export default function Page() {
  const tabs: String[] = ['Home', 'About', 'Experience', 'Works'];
  const [activeTab, setActiveTab] = useState<String>('Home');

  return (
    <div className="flex flex-col items-center">
      {/* Tab Bar */}
      <nav className="relative flex justify-between w-full">
        {tabs.map((tab) => (
          <button
            className={`relative hover:opacity-80 transition-colors duration-[250ms] font-medium py-2 ${
              activeTab === tab ? 'text-fgContrast' : 'text-fgSoft'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        {/* Animated Bottom Border */}
        <div
          className="absolute bottom-0 h-1 bg-fgContrast transition-all duration-[250ms]"
          style={{
            width: `${activeTab.length}`,
            left: `${tabs.indexOf(activeTab) * (100 / tabs.length)}%`,
          }}
        />
      </nav>

      {/* Content */}
      <div>
        {activeTab === 'Home' && <BusinessCard />}
        {activeTab === 'About' && <About />}
        {activeTab === 'Experience' && <Experience />}
        {activeTab === 'Works' && <Works />}
      </div>
    </div>
  );

}