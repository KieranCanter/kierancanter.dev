'use client';

import React from 'react';
import DesktopNav from './desktopNav';
import MobileNav from './mobileNav';

export default function Page() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}