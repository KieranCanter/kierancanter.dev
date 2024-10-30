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
    <div ref={revealElement} className="relative flex m-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none [&_*]:pointer-events-auto">
      <BusinessCard />
    </div>
  );
}

