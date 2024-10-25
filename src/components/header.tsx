'use client';

import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav id="header-links" className="relative flex flex-row justify-between items-center w-fit h-fit gap-8 pointer-events-none [&_*]:pointer-events-auto ">
      <Link href='/' passHref
        className={`header-link ${pathname === '/' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        <FontAwesomeIcon icon={faUserTie} />
      </Link>
      <Link href='/about' passHref
        className={`header-link ${pathname === '/about' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        ABOUT
      </Link>
      <Link href='/experience' passHref
        className={`header-link ${pathname === '/experience' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        EXPERIENCE
      </Link>
      <Link href='/works' passHref
        className={`header-link ${pathname === '/works' ? 'text-fgContrast' : 'text-fgSoft'}`}
      >
        WORKS
      </Link>
    </nav>
  );
};

export default Header;
