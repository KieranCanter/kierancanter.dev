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
      VanillaTilt.init(businessCard, {
        reverse: true,
        max: 15,
        speed: 3000,
        glare: true,
        'max-glare': 0.5,
      });
    }
  }, []);
  
  return (
    <div id="container" className="flex justify-center items-center h-screen bg-gray-800">
      <div id="business-card" className="flex relative w-[28rem] h-64 m-auto text-[#1e1e1e] bg-[#f8f5ec] rounded-[0.1rem] [box-shadow:0rem_0.1rem_0.4rem_0rem_rgba(0,_0,_0,_0.3)] font-['Bona_Nova_SC',_Serif] [font-variant:small-caps] font-bold [transform-style:preserve-3d] [transform:perspective(1000px)]">

        <a id="phone" className="absolute w-[fit-content] h-[fit-content] left-[0] top-[0] ml-4 mt-4 text-[0.9rem] no-underline [color:inherit] hover:text-[#6f5d60]" href="tel:+12402846363" title="Phone">+1 240.284.6363</a>

        <a id="logo" className="absolute w-[fit-content] h-[fit-content] right-[0] top-[0] mr-4 mt-4" href="https://codepen.io/Kieran-Canter/pen/oNrMozK" title="Hmm, impressive. Let's see Paul Allen's card.">
          <FontAwesomeIcon icon={faAddressCard} className="fa-sharp fa-regular fa-xl" />
        </a>

        <div id="me"className="flex flex-col w-[fit-content] h-[fit-content] items-center justify-center h-full left-[0] top-[0] right-[0] bottom-[0] m-auto">
          <h1 id="name" className="text-[1.3rem]">Kieran CANTER</h1>
          <h2 id="title" className="text-[1rem]">Computer Scientist</h2>
        </div>

        <div id="socials" className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <a href="mailto:contact@kierancanter.dev" title="Email">
            <FontAwesomeIcon icon={faPaperPlane} className="fa-sharp fa-regular" />
          </a>
          <a href="https://github.com/kierancanter/" title="GitHub">
            <FontAwesomeIcon icon={faGithub} className="fa-sharp fa-regular" />
          </a>
          <a href="https://linkedin.com/in/kierancanter/" title="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} className="fa-sharp fa-regular" />
          </a>
          <a href="https://codepen.io/kierancanter/" title="CodePen">
            <FontAwesomeIcon icon={faCodepen} className="fa-sharp fa-regular" />
          </a>
          <a href="https://behance.net/kierancanter" title="Behance">
            <FontAwesomeIcon icon={faBehance} className="fa-sharp fa-regular" />
          </a>
        </div>
        
      </div>
    </div>
  );
}
