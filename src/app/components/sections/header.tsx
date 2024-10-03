'use client';

import React, { useEffect, useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import LogoSVG from '@/app/components/logoSVG';
import ThemeSwitcher from '@/app/components/themeSwitcher';
import Link from 'next/link';

const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const header = document.getElementById("header");
    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (prevScrollPos > currScrollPos) {
        (header as HTMLElement).classList.remove("-translate-y-full");
      } else {
        (header as HTMLElement).classList.add("-translate-y-full");
      }
      prevScrollPos = currScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header id="header" className="fixed w-full max-w-full h-fit top-0 mx-auto z-[100] flex flex-row bg-bg/30 justify-between items-center px-4 lg:px-16 py-3 md:py-4 lg:py-6 backdrop-blur-[0.5rem] backdrop-brightness-50 transition duration-[250ms] shadow-black shadow-[0rem_-1rem_2rem_rgba(0,0,0,0.5)]">
      <div id="header-logo" className="relative flex flex-1">
        <Link href="https://kierancanter.dev" className="aspect-square w-8 md:w-10 h-auto fill-fgHard hover:fill-fgContrast transition duration-[250ms]">
          <LogoSVG />
        </Link>
      </div>

      <div id="header-links" className="max-md:hidden relative flex flex-row justify-between items-center w-fit h-fit gap-8">
        <Link href="https://kierancanter.dev/about" className="header-link">ABOUT</Link>
        <Link href="https://kierancanter.dev/experience" className="header-link">EXPERIENCE</Link>
        <Link href="https://kierancanter.dev/works" className="header-link">WORKS</Link>
      </div>

      <div id="theme-switcher" className="flex flex-1 flex-row gap-4 items-center justify-end">
        <p className="relative text-fgContrast text-[0.8rem] lg:text-[0.9rem] font-ibm-plex-mono font-bold transition-colors duration-[250ms] selection:bg-fgContrast selection:text-bg">
          {theme}
        </p>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;