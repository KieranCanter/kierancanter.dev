import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import LogoSVG from '@/app/components/logoSVG';
import ThemeSwitcher from '@/app/components/themeSwitcher';
import Link from 'next/link';
import Image from 'next/image';

export const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="flex flex-row bg-bg/50 justify-between items-center max-w-full h-fit mx-auto px-16 py-6 backdrop-blur-[0.15rem]">
      <div className="relative flex flex-1">
        <LogoSVG color="fgSoft" hoverColor="fgHard" width="2.5rem" height="2.5rem"/>
      </div>

      <div className="relative flex flex-row justify-between items-center w-fit h-fit gap-8">
        <Link href="https://kierancanter.dev/about" className="header-link">ABOUT</Link>
        <Link href="https://kierancanter.dev/experience" className="header-link">EXPERIENCE</Link>
        <Link href="https://kierancanter.dev/works" className="header-link">WORKS</Link>
      </div>

      <div id="theme-switcher" className="flex flex-1 flex-row gap-4 items-center justify-end">
        <p className="relative font-mono transition-colors duration-[250ms] font-bold text-fgContrast selection:bg-fgContrast selection:text-bg">
          {theme}
        </p>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;