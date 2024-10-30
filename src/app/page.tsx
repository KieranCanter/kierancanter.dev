'use client';

import React, { useEffect, useRef } from 'react';
import BusinessCard from '@/components/businessCard';
import revealAnimation from '@/util/reveal';

export default function Page() {
  const revealElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    revealAnimation(revealElement.current!);
  }, []);

  return (
    <div ref={revealElement} className="relative flex m-auto lg:mb-[calc(50vh-10rem)] pointer-events-none [&_*]:pointer-events-auto">
      <BusinessCard />
    </div>
  );
}

