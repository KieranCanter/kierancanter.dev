'use client';

import React, { useEffect, useRef } from 'react';
import About from '@/app/about/about';
import revealAnimation from '@/util/reveal';


export default function AboutPage() {
  const revealElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    revealAnimation(revealElement.current!);
  }, []);

  return (
    <div ref={revealElement} className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
      <About />
    </div>
  );
}