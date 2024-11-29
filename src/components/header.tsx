'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = {
    home: useRef<HTMLButtonElement>(null),
    about: useRef<HTMLButtonElement>(null),
    experience: useRef<HTMLButtonElement>(null),
    works: useRef<HTMLButtonElement>(null),
  };

  useEffect(() => {
    const activeButton = buttonRefs[activeTab as keyof typeof buttonRefs].current;
    if (activeButton) {
      setUnderlineStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <nav className="flex gap-8 relative">
      <div 
        className="absolute bottom-[-0.25rem] h-[0.15rem] rounded-sm bg-fgContrast transition-all duration-[250ms] ease-in-out"
        style={{ 
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
      />
      <button
        ref={buttonRefs.home}
        onClick={() => onTabChange('home')}
        className={`header-link ${activeTab === 'home' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        <FontAwesomeIcon icon={faUserTie} />
      </button>
      <button
        ref={buttonRefs.about}
        onClick={() => onTabChange('about')}
        className={`header-link ${activeTab === 'about' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        ABOUT
      </button>
      <button
        ref={buttonRefs.experience}
        onClick={() => onTabChange('experience')}
        className={`header-link ${activeTab === 'experience' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        EXPERIENCE
      </button>
      <button
        ref={buttonRefs.works}
        onClick={() => onTabChange('works')}
        className={`header-link ${activeTab === 'works' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        WORKS
      </button>
    </nav>
  );
};

export default Header;
