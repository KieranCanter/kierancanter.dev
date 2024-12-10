'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState, useMemo } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const homeRef = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLButtonElement>(null);
  const experienceRef = useRef<HTMLButtonElement>(null);
  const worksRef = useRef<HTMLButtonElement>(null);

  const buttonRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    experience: experienceRef,
    works: worksRef,
  }), []);

  useEffect(() => {
    const activeButton = buttonRefs[activeTab as keyof typeof buttonRefs].current;
    if (activeButton) {
      setUnderlineStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab, buttonRefs]);

  return (
    <nav className="flex gap-8 relative m-4" role="navigation" aria-label="Header">
      <div 
        className="absolute bottom-[-0.25rem] h-[0.15rem] rounded-sm bg-fgContrast transition-all duration-250 ease-in-out"
        style={{ 
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
        aria-hidden="true"
      />
      <button
        ref={buttonRefs.home}
        onClick={() => onTabChange('home')}
        className={`header-link ${activeTab === 'home' ? 'text-fgContrast' : 'text-fgSoft'}`}
        aria-label="Home"
        aria-current={activeTab === 'home' ? 'page' : undefined}
      >
        <FontAwesomeIcon icon={faUserTie} aria-hidden="true" />
      </button>
      <button
        ref={buttonRefs.about}
        onClick={() => onTabChange('about')}
        className={`header-link ${activeTab === 'about' ? 'text-fgContrast' : 'text-fgSoft'}`}
        aria-current={activeTab === 'about' ? 'page' : undefined}
      >
        ABOUT
      </button>
      <button
        ref={buttonRefs.experience}
        onClick={() => onTabChange('experience')}
        className={`header-link ${activeTab === 'experience' ? 'text-fgContrast' : 'text-fgSoft'}`}
        aria-current={activeTab === 'experience' ? 'page' : undefined}
      >
        EXPERIENCE
      </button>
      <button
        ref={buttonRefs.works}
        onClick={() => onTabChange('works')}
        className={`header-link ${activeTab === 'works' ? 'text-fgContrast' : 'text-fgSoft'}`}
        aria-current={activeTab === 'works' ? 'page' : undefined}
      >
        WORKS
      </button>
    </nav>
  );
};

export default Header;
