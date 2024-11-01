'use client';

import React from 'react';
import Experience from '@/app/experience/experience';

export default function ExperiencePage() {

  return (
    <div className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 pointer-events-none overflow-y-auto no-scrollbar">
      <Experience />
    </div>
  );
}