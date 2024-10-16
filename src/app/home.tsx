'use client';

import '@/styles/globals.scss';
import React, { useState } from 'react';
import ParticleField from '@/components/particleField';
import Header from '@/components/sections/header';
import ThemeSwitcher from '@/components/sections/themeSwitcher';
import BusinessCard from '@/components/sections/businessCard';
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
          <div className="relative flex flex-[2] lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 overflow-hidden pointer-events-none [&_*]:pointer-events-auto">
            <About />
          </div>
        );
      case 'experience':
        return (
          <div className="relative flex flex-[2] lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 overflow-hidden pointer-events-none">
            <Experience />
          </div>
        );
      case 'works':
        return <Works />;
      case 'businessCard':
      default:
        return (
          <div className="relative flex m-auto md:max-lg:mt-0 pointer-events-none lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 [&_*]:pointer-events-auto">
            <BusinessCard />
          </div>
        );
    }
  };

  return (
    <div className="relative h-screen bg-bg text-fgSoft selection:bg-fgSoft selection:text-bg p-4 lg:p-8">
      <div className="relative flex flex-col h-full justify-between border border-fgHard min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)]">
        <ParticleField color="rgb(110, 110, 110)" />
        {isLoading ? (
          <LogoLoader onAnimationComplete={handleAnimationComplete} />
        ) : (
          showContent && (
            <>
              <header className="flex relative w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] h-fit my-4 lg:my-8 mx-auto justify-between pointer-events-none">
                <div className="max-lg:hidden relative flex flex-1" />
                <div className="relative flex mx-auto md:max-lg:ml-0 lg:justify-center md:flex-1">
                  <Header setCurrentSection={setCurrentSection} />
                </div>
                <div className="max-md:hidden relative flex justify-end lg:m-0 md:flex-1">
                  <ThemeSwitcher />
                </div>
              </header>

              {renderSection()}
              <div className="md:hidden relative flex justify-end m-4 pointer-events-none">
                <ThemeSwitcher />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
