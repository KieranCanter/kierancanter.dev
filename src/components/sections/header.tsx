import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentSection }) => {
  return (
      <nav id="header-links" className="relative flex flex-row justify-between items-center w-fit h-fit mx-auto mt-4 gap-8">
        <button onClick={() => setCurrentSection('businessCard')} className="header-link">
          <FontAwesomeIcon icon={faUserTie} />
        </button>
        <button onClick={() => setCurrentSection('about')} className="header-link">ABOUT</button>
        <button onClick={() => setCurrentSection('experience')} className="header-link">EXPERIENCE</button>
        <button onClick={() => setCurrentSection('works')} className="header-link">WORKS</button>
      </nav>
  );
};

export default Header;
