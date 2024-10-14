'use client';

import '@/styles/globals.scss';
import React, { useState } from 'react';
import ParticleField from '@/components/particleField';
import Header from '@/components/sections/header';
import ThemeSwitcher from '@/components/sections/themeSwitcher';
import BusinessCard from "@/components/businessCard";
import About from '@/app/about/about';
import Experience from '@/app/experience/experience';
import Works from '@/app/works/works';
import LogoLoader from '@/components/sections/loader';

interface HomeProps {
  initialSection?: string;
}

const Home: React.FC<HomeProps> = ({ initialSection = 'businessCard' }) => {
  const [currentSection, setCurrentSection] = useState<string>(initialSection);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 250);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return (
          <div className="relative flex my-8 md:absolute md:w-fit md:left-1/2 md:-translate-x-1/2 md:max-lg:mt-8 md:max-lg:mb-0 justify-center items-center">
            <About />
          </div>
        );
      case 'experience':
        return <Experience />;
      case 'works':
        return <Works />;
      case 'businessCard':
      default:
        return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:max-lg:mt-4">
            <BusinessCard />
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-fgSoft selection:bg-fgSoft selection:text-bg">
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <div className="border border-fgHard min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] relative">
          <ParticleField color="rgb(110, 110, 110)" />
          {isLoading ? (
            <LogoLoader onAnimationComplete={handleAnimationComplete} />
          ) : (
            showContent && (
              <>
                <Header setCurrentSection={setCurrentSection} />
                <ThemeSwitcher />
                {renderSection()}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
