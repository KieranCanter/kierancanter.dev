'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState, useMemo } from 'react';

/**
 * Props for Header component
 * @property {string} activeTab - Currently selected tab ID
 * @property {function} onTabChange - Callback when tab selection changes
 */
interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Header Component
 * Navigation bar with animated underline indicator
 * Provides tab switching between different sections of the site
 */
const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  // Track underline position and width
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

  /**
   * Update underline position when active tab changes
   * Animates to match the position and width of the active button
   */
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
      {/* Animated underline indicator */}
      <div 
        className="absolute bottom-[-0.25rem] h-[0.15rem] rounded-sm bg-fgContrast transition-all duration-250 ease-in-out"
        style={{ 
          left: `${underlineStyle.left}px`,
          width: `${underlineStyle.width}px`,
        }}
        aria-hidden="true"
      />
      
      {/* Home/Logo button */}
      <button
        ref={buttonRefs.home}
        onClick={() => onTabChange('home')}
        className={`header-link ${activeTab === 'home' ? 'text-fgContrast' : 'text-fgHard'}`}
        aria-label="Home"
        aria-current={activeTab === 'home' ? 'page' : undefined}
      >
        <FontAwesomeIcon icon={faUserTie} aria-hidden="true" />
      </button>

      {/* About section button */}
      <button
        ref={buttonRefs.about}
        onClick={() => onTabChange('about')}
        className={`header-link ${activeTab === 'about' ? 'text-fgContrast' : 'text-fgHard'}`}
        aria-current={activeTab === 'about' ? 'page' : undefined}
      >
        ABOUT
      </button>

      {/* Experience section button */}
      <button
        ref={buttonRefs.experience}
        onClick={() => onTabChange('experience')}
        className={`header-link ${activeTab === 'experience' ? 'text-fgContrast' : 'text-fgHard'}`}
        aria-current={activeTab === 'experience' ? 'page' : undefined}
      >
        EXPERIENCE
      </button>

      {/* Works section button */}
      <button
        ref={buttonRefs.works}
        onClick={() => onTabChange('works')}
        className={`header-link ${activeTab === 'works' ? 'text-fgContrast' : 'text-fgHard'}`}
        aria-current={activeTab === 'works' ? 'page' : undefined}
      >
        WORKS
      </button>
    </nav>
  );
};

export default Header;
