'use client';

import Experience from '@/app/experience/experience';
import { useReveal } from '@/util/reveal';

export default function ExperiencePage() {
  useReveal('.reveal');

  return (
    <div className="reveal relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
      <Experience />
    </div>
  );
  }