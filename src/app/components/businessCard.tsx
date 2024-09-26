"use client";

import React, { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faLinkedin, faCodepen, faBehance } from '@fortawesome/free-brands-svg-icons';


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
        const handleOrientation = (event: DeviceOrientationEvent) => {
          if (event.beta === null || event.gamma === null) return;

          const tiltX = Math.min(Math.max(event.beta, -45), 45);
          const tiltY = Math.min(Math.max(event.gamma, -45), 45);

          businessCard.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
        };

        if (window.DeviceOrientationEvent) {
          window.addEventListener('deviceorientation', handleOrientation);
        }

        // Cleanup function for mobile
        return () => {
          if (window.DeviceOrientationEvent) {
            window.removeEventListener('deviceorientation', handleOrientation);
          }
        };
      }
    }
  }, []);
  
  return (
    <div id="container" className="w-full max-w-md">
      <div id="business-card" className="flex relative aspect-[7/4] w-full max-w-md mx-auto text-[#1e1e1e] bg-[#f8f5ec] rounded-[0.1rem] [box-shadow:0rem_0.1rem_0.4rem_0rem_rgba(0,_0,_0,_0.3)] selection:bg-[#1e1e1e] selection:text-[#f8f5ec]">
        <a id="phone" className="absolute left-4 top-4 text-sm font-ibm-plex-serif font-bold selection:bg-black hover:text-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out" href="tel:+12402846363" title="Phone">+1 240.284.6363</a>

        <a id="logo" className="absolute right-4 top-4 selection:bg-black hover:text-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out" href="https://codepen.io/Kieran-Canter/pen/oNrMozK" title="Hmm, impressive. Let's see Paul Allen's card.">
          <FontAwesomeIcon icon={faAddressCard} className="fa-sharp fa-regular fa-lg sm:fa-xl" />
        </a>

        <div id="me" className="flex flex-col w-full h-full items-center font-spectral-sc justify-center">
          <h1 id="name" className="text-lg font-bold">Kieran CANTER</h1>
          <h2 id="title" className="text-sm font-semibold">Computer Scientist</h2>
        </div>

        <div id="socials" className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <a href="mailto:contact@kierancanter.dev" title="Email" className="hover:text-black selection:bg-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out">
            <FontAwesomeIcon icon={faPaperPlane} className="fa-sharp fa-regular" />
          </a>
          <a href="https://github.com/kierancanter/" title="GitHub" className="hover:text-black selection:bg-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out">
            <FontAwesomeIcon icon={faGithub} className="fa-sharp fa-regular" />
          </a>
          <a href="https://linkedin.com/in/kierancanter/" title="LinkedIn" className="hover:text-black selection:bg-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out">
            <FontAwesomeIcon icon={faLinkedin} className="fa-sharp fa-regular" />
          </a>
          <a href="https://codepen.io/kierancanter/" title="CodePen" className="hover:text-black selection:bg-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out">
            <FontAwesomeIcon icon={faCodepen} className="fa-sharp fa-regular" />
          </a>
          <a href="https://behance.net/kierancanter" title="Behance" className="hover:text-black selection:bg-black hover:-translate-y-0.5 active:opacity-85 transition-all duration-250 ease-in-out">
            <FontAwesomeIcon icon={faBehance} className="fa-sharp fa-regular" />
          </a>
        </div>
        
      </div>
    </div>
  );
}
