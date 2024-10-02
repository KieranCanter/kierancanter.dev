import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import LogoSVG from '@/app/components/logoSVG';
import ThemeSwitcher from '@/app/components/themeSwitcher';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header-logo" className="md:flex flex flex-row bg-bg/50 justify-between items-center max-w-full h-fit mx-auto px-16 py-6 backdrop-blur-[0.15rem]">
      <div className="relative flex flex-1">
        <Link href="https://kierancanter.dev" className="w-10 h-10 fill-fgSoft hover:fill-fgContrast transition duration-[250ms]">
          <LogoSVG/>
        </Link>
      </div>

      <div id="header-links"className="relative flex flex-row justify-between items-center w-fit h-fit gap-8">
        <Link href="https://kierancanter.dev/about" className="header-link">ABOUT</Link>
        <Link href="https://kierancanter.dev/experience" className="header-link">EXPERIENCE</Link>
        <Link href="https://kierancanter.dev/works" className="header-link">WORKS</Link>
      </div>

      <div id="theme-switcher" className="flex flex-1 flex-row gap-4 items-center justify-end">
        <p className="relative font-ibm-plex-mono transition-colors duration-[250ms] font-bold text-fgContrast selection:bg-fgContrast selection:text-bg">
          {theme}
        </p>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;