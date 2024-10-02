import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import LogoSVG from '@/app/components/logoSVG';
import ThemeSwitcher from '@/app/components/themeSwitcher';

export const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="flex flex-row justify-between items-center max-w-full mx-auto">
      <LogoSVG color="var(--fg-soft)" width="2.5rem" height="2.5rem"/>
      <div className="flex flex-col justify-center items-center h-15rem">
        <ThemeSwitcher />
        <p className="absolute mt-24 font-mono transition-colors duration-[250ms] font-bold text-fgContrast selection:bg-fgContrast selection:text-bg">
          {theme}
        </p>
      </div>
    </header>
  );
};

export default Header;