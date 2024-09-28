"use client";

import React, { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faBehance, faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// Define social media links
const socialLinks = [
  { title: 'Email', href: 'mailto:contact@kierancanter.dev', icon: faEnvelope },
  { title: 'GitHub', href: 'https://github.com/kierancanter', icon: faGithub },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/kierancanter/', icon: faLinkedin },
  { title: 'CodePen', href: 'https://codepen.io/kierancanter', icon: faCodepen },
  { title: 'Behance', href: 'https://www.behance.net/kierancanter', icon: faBehance },
];

export default function BusinessCard() {
  useEffect(() => {
    const businessCard = document.getElementById('business-card');
    if (businessCard) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (!isMobile) {
        // VanillaTilt for desktop/cursor
        VanillaTilt.init(businessCard, {
          reverse: true,
          max: 15,
          speed: 3000,
        });
      } else {
        // Gyroscope for mobile
        let initialBeta: number | null = null;
        let initialGamma: number | null = null;

        const resetOrientation = () => {
          initialBeta = null;
          initialGamma = null;
          businessCard.style.transform = 'none';
        };

        const handleOrientation = (event: DeviceOrientationEvent) => {
          if (event.beta === null || event.gamma === null) return;

          // Set initial values if not set
          if (initialBeta === null) initialBeta = event.beta;
          if (initialGamma === null) initialGamma = event.gamma;

          // Calculate the difference from initial position
          const deltaBeta = event.beta - initialBeta;
          const deltaGamma = event.gamma - initialGamma;

          // Cap the range at -89/89 degrees
          const tiltX = Math.min(Math.max(deltaBeta, -89), 89);
          const tiltY = Math.min(Math.max(deltaGamma, -89), 89);

          // Check the orientation and apply the appropriate rotation
          if (screen.orientation.type.includes('portrait')) {
            businessCard.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
          } else {
            businessCard.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
          }
        };

        if (window.DeviceOrientationEvent) {
          window.addEventListener('deviceorientation', handleOrientation);
          window.addEventListener('orientationchange', resetOrientation);
        }

        // Cleanup function for mobile
        return () => {
          if (window.DeviceOrientationEvent) {
            window.removeEventListener('deviceorientation', handleOrientation);
            window.removeEventListener('orientationchange', resetOrientation);
          }
        };
      }
    }
  }, []);
  
  return (
    <div id="container" className="w-full max-w-md" role="region" aria-label="Kieran Canter's Business Card">
      <div id="business-card" className="flex relative aspect-[7/4] w-full max-w-md mx-auto text-[#1e1e1e] bg-[#f8f5ec] rounded-[0.1rem] [box-shadow:0rem_0.1rem_0.4rem_0rem_rgba(0,_0,_0,_0.3)] selection:bg-[#1e1e1e] selection:text-[#f8f5ec]">
        <a 
          id="phone" 
          className="absolute left-4 top-4 text-xs font-ibm-plex-serif font-bold selection:bg-black hover:text-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out" 
          href="tel:+12402846363" 
          title="Phone" 
          aria-label="Phone number: +1 240.284.6363"
          target="_blank"
          rel="noopener noreferrer"
        >
          +1 240.284.6363
        </a>

        <a 
          id="logo" 
          className="absolute right-4 top-4 selection:bg-black hover:text-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out" 
          href="https://www.youtube.com/watch?v=YHgwxVCiMyI" 
          title="Impressive. Very nice. Let's see Paul Allen's card." 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Logo: Link to an American Psycho video reference"
        >
          <Image 
            src="/assets/images/logo.svg"
            alt="Kieran Canter's personal logo"
            width={20}
            height={20}
            className="w-5 h-5 sm:w-6.75 sm:h-6.75 text-current"
          />
        </a>

        <div id="me" className="flex flex-col w-full h-full items-center font-spectral-sc justify-center" aria-labelledby="name title">
          <h1 id="name" className="text-lg font-bold">Kieran CANTER</h1>
          <h2 id="title" className="text-sm font-semibold">Computer Scientist</h2>
        </div>

        <nav 
          id="socials" 
          className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4"
          aria-label="Social media links"
        >
          {socialLinks.map((link) => (
            <a 
              key={link.title}
              href={link.href} 
              title={`Visit Kieran's ${link.title} ${link.title === 'Email' ? 'address' : 'profile'}`} 
              className="hover:text-black selection:bg-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out"
              aria-label={`${link.title}: ${link.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon 
                icon={link.icon} 
                className="fa-sharp fa-regular" 
                aria-hidden="true" 
              />
              <span className="sr-only">{link.title}</span>
            </a>
          ))}
        </nav>
        
      </div>
    </div>
  );
}
