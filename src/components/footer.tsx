import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <Link href="https://github.com/kierancanter/kierancanter.dev" target="_blank" rel="noopener noreferrer">
      <p className="group text-center font-ibm-plex-serif text-fgSoft text-[10px] font-medium hover:text-fgContrast hover:selection:bg-fgContrast transition-colors duration-[250ms]">with passion by <span className="font-spectral-sc font-semibold group-hover:selection:bg-fgContrast">Kieran CANTER</span> — {new Date().getFullYear()}</p>
    </Link>
  );
};


export default Footer;