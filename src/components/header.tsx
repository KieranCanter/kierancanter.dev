'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState, createRef } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef({
    home: createRef<HTMLButtonElement>(),
    about: createRef<HTMLButtonElement>(),
    experience: createRef<HTMLButtonElement>(),
    works: createRef<HTMLButtonElement>(),
  });

  useEffect(() => {
    const activeButton = buttonRefs.current[activeTab as keyof typeof buttonRefs.current].current;
    if (activeButton) {
      setUnderlineStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <nav className="flex gap-8 relative m-4">
      <div 
        className="absolute bottom-[-0.25rem] h-[0.15rem] rounded-sm bg-fgContrast transition-all duration-[250ms] ease-in-out"
        style={{ 
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
      />
      <button
        ref={buttonRefs.current.home}
        onClick={() => onTabChange('home')}
        className={`header-link ${activeTab === 'home' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        <FontAwesomeIcon icon={faUserTie} />
      </button>
      <button
        ref={buttonRefs.current.about}
        onClick={() => onTabChange('about')}
        className={`header-link ${activeTab === 'about' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        ABOUT
      </button>
      <button
        ref={buttonRefs.current.experience}
        onClick={() => onTabChange('experience')}
        className={`header-link ${activeTab === 'experience' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        EXPERIENCE
      </button>
      <button
        ref={buttonRefs.current.works}
        onClick={() => onTabChange('works')}
        className={`header-link ${activeTab === 'works' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        WORKS
      </button>
    </nav>
  );
};

export default Header;
