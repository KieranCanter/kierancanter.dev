'use client';

import React from 'react';
import Works from '@/app/works/works';
import { useReveal } from '@/util/reveal';

export default function WorksPage() {
  useReveal('.reveal');

    return (
      <div className="reveal relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto">
        <Works />
      </div>
    );
  }