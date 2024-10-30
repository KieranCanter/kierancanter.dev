'use client';

import React, { useEffect, useRef } from 'react';
import Works from '@/app/works/works';
import revealAnimation from '@/util/reveal';


export default function WorksPage() {
  const revealElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    revealAnimation(revealElement.current!);
  }, []);

  return (
    <div ref={revealElement} className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
      <Works />
    </div>
  );
}