"use client";

import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faBehance, faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoSVG from '@/app/components/logoSVG';

// Define social media links
const socialLinks = [
  { title: 'Email', href: 'mailto:contact@kierancanter.dev', icon: faEnvelope },
  { title: 'GitHub', href: 'https://github.com/kierancanter', icon: faGithub },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/kierancanter/', icon: faLinkedin },
  { title: 'CodePen', href: 'https://codepen.io/kierancanter', icon: faCodepen },
  { title: 'Behance', href: 'https://www.behance.net/kierancanter', icon: faBehance },
];


export default function BusinessCard() {
  const businessCardRef = document.getElementById("business-card");

  useEffect(() => {
    if (businessCardRef) {
        // VanillaTilt for desktop/cursor
      VanillaTilt.init(businessCardRef, {
        reverse: true,
        max: 15,
        speed: 3000,
        gyroscope: true,
        gyroscopeMinAngleX: -89,
        gyroscopeMaxAngleX: 89,
        gyroscopeMinAngleY: -89,
        gyroscopeMaxAngleY: 89,
      });
    }
  });
  
  return (
    <div 
      id="business-card" 
      className="flex flex-col justify-between relative aspect-[7/4] w-[28rem] md:w-[50%] md:max-w-[28rem] h-auto mx-4 p-2 lg:p-3 text-[#1e1e1e] bg-[#f8f5ec] rounded-[0.1rem] [box-shadow:0rem_0.1rem_0.4rem_0rem_rgba(0,_0,_0,_0.3)] selection:bg-[#1e1e1e] selection:text-[#f8f5ec]" 
      aria-label="Kieran Canter's Business Card"
    >
      
      <div id="phone-and-logo" className="relative flex flex-row flex-[40%] justify-between w-full h-fit">
        <Link 
          id="phone" 
          className="relative w-fit h-fit text-xs font-ibm-plex-serif font-bold hover:text-gray-500 hover:selection:bg-gray-500 active:opacity-85 transition-all duration-[250ms]" 
          href="tel:+12402846363" 
          title="Phone" 
          aria-label="Phone number: +1 240.284.6363"
          target="_blank"
          rel="noopener noreferrer"
        >
          +1 240.284.6363
        </Link>

        <Link 
          id="logo" 
          className="relative aspect-square w-5 md:w-6 lg:w-7 h-fit active:opacity-85 fill-[#1e1e1e] hover:fill-gray-500 transition duration-[250ms]" 
          href="https://www.youtube.com/watch?v=YHgwxVCiMyI" 
          title="Impressive. Very nice. Let's see Paul Allen's card." 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Logo: Link to an American Psycho video reference"
        >
          <LogoSVG />
        </Link>
      </div>

      <div id="centerpiece" className = "flex flex-col flex-[60%] w-fit mx-auto justify-between h-fit">

        <div id="me" className="flex flex-col mx-auto w-fit h-fit items-center font-spectral-sc justify-center" aria-labelledby="name title">
          <h1 id="name" className="text-base lg:text-lg font-bold">Kieran CANTER</h1>
          <h2 id="title" className="text-xs lg:text-sm font-semibold">Computer Scientist</h2>
        </div>

        <nav 
          id="socials" 
          className="relative text-sm lg:text-base flex w-full mx-auto justify-between"
          aria-label="Social media links"
        >
          {socialLinks.map((link) => (
            <Link 
              key={link.title}
              href={link.href} 
              title={`Kieran's ${link.title}`} 
              className="hover:text-gray-500 active:opacity-85 transition-all duration-[250ms]"
              aria-label={`${link.title}: ${link.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon 
                icon={link.icon} 
                className="fa-sharp" 
                aria-hidden="true" 
              />
              <span className="sr-only">{link.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
    </div>
  );
}
