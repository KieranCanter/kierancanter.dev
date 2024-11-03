'use client';

import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter, usePathname } from 'next/navigation';

const routes = ['/', '/about', '/experience', '/works'];

const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (direction: 'left' | 'right') => {
    const currentIndex = routes.indexOf(pathname);
    let nextIndex;

    if (direction === 'left') {
      nextIndex = currentIndex + 1;
      if (nextIndex >= routes.length) nextIndex = 0;
    } else {
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) nextIndex = routes.length - 1;
    }

    router.replace(routes[nextIndex]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNavigation('left'),
    onSwipedRight: () => handleNavigation('right'),
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  });

  return <div {...handlers} className="relative flex flex-[2] m-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-x-clip overflow-y-auto no-scrollbar z-50">{children}</div>;
};

export default Navigation;
