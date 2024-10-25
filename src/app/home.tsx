'use client';

import '@/styles/globals.scss';
import React from 'react';
import BusinessCard from '@/components/businessCard';


const Home: React.FC = () => {

  return (
    <div className="relative flex m-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none [&_*]:pointer-events-auto">
      <BusinessCard />
    </div>
  );
};

export default Home;
