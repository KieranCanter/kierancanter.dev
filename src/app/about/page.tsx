'use client';

import React from 'react';
import About from '@/app/about/about';


export default function AboutPage() {

  return (
    <div className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto no-scrollbar">
      <About />
    </div>
  );
}