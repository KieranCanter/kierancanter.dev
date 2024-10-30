'use client';

import React from 'react';
import BusinessCard from '@/components/businessCard';
import { useReveal } from '@/util/reveal';

export default function Page() {
  useReveal('.reveal');

  return (
    <div className="reveal relative flex m-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none [&_*]:pointer-events-auto">
      <BusinessCard />
    </div>
  );
}

