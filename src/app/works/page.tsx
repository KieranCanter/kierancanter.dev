'use client';

import React from 'react';
import Works from '@/app/works/works';

export default function WorksPage() {

  return (
    <div className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto no-scrollbar">
      <Works />
    </div>
  );
}