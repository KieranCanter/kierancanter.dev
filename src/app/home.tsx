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
          <div className="relative flex overflow-hidden pointer-events-none [&_*]:pointer-events-auto">
            <About />
          </div>
        );
      case 'experience':
        return (
          <div className="relative flex flex-[2] overflow-hidden pointer-events-none [&_*]:pointer-events-auto">
            <Experience />
          </div>
        );
      case 'works':
        return <Works />;
      case 'businessCard':
      default:
        return (
          <div className="relative flex m-auto pointer-events-none [&_*]:pointer-events-auto">
            <BusinessCard />
          </div>
        );
    }
  };

  return (
    <div className="relative h-screen bg-bg text-fgSoft selection:bg-fgSoft selection:text-bg p-4 lg:p-8">
      <div className="relative flex flex-col h-full justify-between md:max-lg:justify-start border border-fgHard min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)]">
        <ParticleField color="rgb(110, 110, 110)" />
        {isLoading ? (
          <LogoLoader onAnimationComplete={handleAnimationComplete} />
        ) : (
          showContent && (
            <>
              <Header setCurrentSection={setCurrentSection} />
              {renderSection()}
              <ThemeSwitcher />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
