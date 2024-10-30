'use client';

import React from 'react';
import About from '@/app/about/about';
import { useReveal } from '@/util/reveal';

export default function AboutPage() {
  useReveal('.reveal');

  return (
    <div className="reveal relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
      <About />
    </div>
  );
  }