'use client';

import React from 'react';
import DesktopNav from '../app/desktopNav';
import MobileNav from '../app/mobileNav';

/**
 * Root Page Component
 * Renders either desktop or mobile navigation based on viewport size
 * Both components are rendered but only one is displayed via CSS
 */
export default function Page() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}