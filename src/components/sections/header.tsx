'use-client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentSection }) => {
  const [selectedSection, setSelectedSection] = useState('businessCard');

  const handleSectionClick = (section: string) => {
    setCurrentSection(section);
    setSelectedSection(section);
  };

  return (
    <nav id="header-links" className="relative flex flex-row justify-between items-center w-fit h-fit gap-8 pointer-events-none [&_*]:pointer-events-auto ">
      <button
        onClick={() => handleSectionClick('businessCard')}
        className={`header-link ${selectedSection === 'businessCard' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        <FontAwesomeIcon icon={faUserTie} />
      </button>
      <button
        onClick={() => handleSectionClick('about')}
        className={`header-link ${selectedSection === 'about' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        ABOUT
      </button>
      <button
        onClick={() => handleSectionClick('experience')}
        className={`header-link ${selectedSection === 'experience' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        EXPERIENCE
      </button>
      <button
        onClick={() => handleSectionClick('works')}
        className={`header-link ${selectedSection === 'works' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        WORKS
      </button>
    </nav>
  );
};

export default Header;
