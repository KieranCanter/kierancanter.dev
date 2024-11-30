"use client";

import React, { useEffect, useRef } from 'react';
import revealAnimation from '@/util/reveal';
import VanillaTilt from 'vanilla-tilt';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoSVG from '@/components/logoSVG';

// Define social media links
const socialLinks = [
  { title: 'Email', href: 'mailto:contact@kierancanter.dev', icon: faEnvelope },
  { title: 'GitHub', href: 'https://github.com/kierancanter', icon: faGithub },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/kierancanter/', icon: faLinkedin },
  { title: 'CodePen', href: 'https://codepen.io/kierancanter', icon: faCodepen },
];

// Add this type definition at the top of your file
type BusinessCardElement = HTMLElement & { vanillaTilt?: { destroy: () => void } };

export default function BusinessCard({ isActive }: { isActive: boolean }) {
  const businessCardRef = useRef<BusinessCardElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isActive) {
      revealAnimation(businessCardRef.current!);
    }
  }, [isActive]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    const deltaX = touchX - touchStartRef.current.x;
    const deltaY = touchY - touchStartRef.current.y;
    
    const rotationX = Math.min(Math.max(-deltaY * 0.1, -15), 15);
    const rotationY = Math.min(Math.max(deltaX * 0.1, -15), 15);
    
    currentRotationRef.current = { x: rotationX, y: rotationY };

    if (businessCardRef.current) {
      businessCardRef.current.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    if (businessCardRef.current) {
      businessCardRef.current.style.transition = 'transform 0.5s ease-out';
      businessCardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
      setTimeout(() => {
        if (businessCardRef.current) {
          businessCardRef.current.style.transition = '';
        }
      }, 500);
    }
  };

  useEffect(() => {
    const card = businessCardRef.current;

    if (businessCardRef.current) {
      if (!isMobile) {
        VanillaTilt.init(businessCardRef.current, {
          reverse: true,
          max: 15,
          speed: 3000,
        });
      } else {
        card?.addEventListener('touchstart', handleTouchStart);
        card?.addEventListener('touchmove', handleTouchMove);
        card?.addEventListener('touchend', handleTouchEnd);
      }

      return () => {
        if (card?.vanillaTilt) {
          card.vanillaTilt.destroy();
        }
        card?.removeEventListener('touchstart', handleTouchStart);
        card?.removeEventListener('touchmove', handleTouchMove);
        card?.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  return (
    <div 
      ref={businessCardRef as React.RefObject<HTMLDivElement>}
      id="business-card" 
      className="relative flex flex-col w-[calc(100vw-6rem)] max-w-[24rem] lg:max-w-[28rem] h-fit aspect-[7/4] m-auto p-2 lg:p-3 text-[#1e1e1e] bg-[#f8f5ec] rounded-sm [box-shadow:0rem_0.1rem_0.4rem_0rem_rgba(0,_0,_0,_0.3)] [&_*]:selection:bg-[#1e1e1e] [&_*]:selection:text-[#f8f5ec] opacity-0 pointer-events-auto"
      aria-label="Kieran Canter's Business Card"
    >
      <div id="phone-and-logo" className="relative flex flex-row justify-between w-full h-fit">
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

      <div id="centerpiece" className = "flex flex-col w-fit h-full mx-auto justify-end">

        <div id="me" className="flex flex-col m-auto w-fit h-fit items-center" aria-labelledby="name title">
          <h2 id="name" className="text-base lg:text-lg font-bold">Kieran CANTER</h2>
          <h3 id="title" className="text-xs lg:text-sm font-semibold">Software Engineer</h3>
        </div>

        <div 
          id="socials" 
          className="relative text-sm lg:text-base flex w-full h-fit mx-auto justify-between"
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
        </div>
      </div>

    </div>
  );
}
