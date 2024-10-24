"use client";

import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faBehance, faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoSVG from '@/components/logoSVG';

// Define social media links
const socialLinks = [
  { title: 'Email', href: 'mailto:contact@kierancanter.dev', icon: faEnvelope },
  { title: 'GitHub', href: 'https://github.com/kierancanter', icon: faGithub },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/kierancanter/', icon: faLinkedin },
  { title: 'CodePen', href: 'https://codepen.io/kierancanter', icon: faCodepen },
  { title: 'Behance', href: 'https://www.behance.net/kierancanter', icon: faBehance },
];

// Add this type definition at the top of your file
type BusinessCardElement = HTMLElement & { vanillaTilt?: { destroy: () => void } };

export default function BusinessCard() {
  const setupGyroscope = () => {
    let initialBeta: number | null = null;
    let initialGamma: number | null = null;

    const resetOrientation = () => {
      initialBeta = null;
      initialGamma = null;
      if (businessCardRef.current) {
        businessCardRef.current.style.transform = 'none';
      }
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
      const tiltX = Math.min(Math.max(deltaBeta, -45), 45);
      const tiltY = Math.min(Math.max(deltaGamma, -45), 45);

      // Check the orientation and apply the appropriate rotation
      if (window.matchMedia('(orientation: portrait)').matches) {
        if (businessCardRef.current) {
          businessCardRef.current.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
        }
      } else {
        if (businessCardRef.current) {
          businessCardRef.current.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
        }
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
      window.addEventListener('orientationchange', resetOrientation);
    }
  }

  const businessCardRef = useRef<BusinessCardElement>(null);
  
  useEffect(() => {
    interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    }
    
    const card = businessCardRef.current;
    const isIOS: boolean = /iPad|iPhone|iPod/.test(navigator.userAgent);
    

    if (businessCardRef.current) {
      if (!isMobile) {
        VanillaTilt.init(card as HTMLElement, {
          reverse: true,
          max: 15,
          speed: 3000,
        });
      }
      else {
        if (isIOS) {
          const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
          DeviceOrientationEventiOS.requestPermission?.()
            .then(response => {
              if (response == 'granted') {
                window.addEventListener('deviceorientation', () => {
                  setupGyroscope();
                })
              }
            })
            .catch(() => console.error("iOS orientation permission request denied"));
        } else {
          setupGyroscope();
        }
      }

      // Cleanup function
      return () => {
        if (card?.vanillaTilt) {
          card.vanillaTilt.destroy();
        }
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div 
      ref={businessCardRef as React.RefObject<HTMLDivElement>}
      id="business-card" 
      className="flex flex-col justify-between aspect-[7/4] w-[calc(100vw-4rem)] md:h-auto md:max-w-[28rem] lg:max-w-[30rem] h-auto p-2 lg:p-3 text-[#1e1e1e] bg-[#f8f5ec] rounded-sm [box-shadow:0rem_0.1rem_0.4rem_0rem_rgba(0,_0,_0,_0.3)] [&_*]:selection:bg-[#1e1e1e] [&_*]:selection:text-[#f8f5ec]"
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
          className="relative aspect-square w-5 md:w-6 h-fit active:opacity-85 fill-[#1e1e1e] hover:fill-gray-500 transition duration-[250ms]" 
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

        <div id="me" className="flex flex-col mx-auto w-fit h-fit items-center justify-center" aria-labelledby="name title">
          <h2 id="name" className="text-base lg:text-lg font-bold">Kieran CANTER</h2>
          <h3 id="title" className="text-xs lg:text-sm font-semibold">Software Engineer</h3>
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
              title={`${link.title}`} 
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
