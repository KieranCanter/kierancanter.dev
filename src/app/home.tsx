'use client';

import '@/styles/globals.scss';
import React, { useState } from 'react';
import ParticleField from '@/components/particleField';
import Header from '@/components/header';
import ThemeSwitcher from '@/components/themeSwitcher';
import BusinessCard from '@/components/businessCard';
import About from '@/app/about/about';
import Experience from '@/app/experience/experience';
import Works from '@/app/works/works';
import LogoLoader from '@/components/loader';
import Footer from '@/components/footer';

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
          <div className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
            <About />
          </div>
        );
      case 'experience':
        return (
          <div className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
            <Experience />
          </div>
        );
      case 'works':
        return (
          <div className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
            <Works />
          </div>
        );
      case 'businessCard':
      default:
        return (
          <div className="relative flex m-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none [&_*]:pointer-events-auto">
            <BusinessCard />
          </div>
        );
    }
  };

  return (
    <div className="relative h-screen bg-bg text-fgSoft p-4 lg:p-8 transition-colors duration-[250ms] overflow-clip">
      <div className="relative flex flex-col h-full justify-between border border-fgHard min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] transition-colors duration-[250ms]">
        <ParticleField color="rgb(110, 110, 110)" />
        {isLoading ? (
          <LogoLoader onAnimationComplete={handleAnimationComplete} />
        ) : (
          showContent && (
            <>
              <header className="flex relative w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] h-fit my-4 lg:mt-8 lg:mb-16 mx-auto justify-between pointer-events-none">
                <div className="relative flex mx-auto md:max-lg:ml-0 lg:justify-center">
                  <Header setCurrentSection={setCurrentSection} />
                </div>
                <div className="max-md:hidden relative flex justify-end lg:absolute lg:top-0 lg:right-0 lg:m-0 pointer-events-auto  ">
                  <ThemeSwitcher />
                </div>
              </header>
              {renderSection()}
              <div className="md:hidden relative flex justify-end m-4 pointer-events-auto">
                <ThemeSwitcher />
              </div>
            </>
          )
        )}
      </div>
      
      <footer className="relative w-fit h-fit m-auto ml-0 flex">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
