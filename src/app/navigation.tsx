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

    router.push(routes[nextIndex]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNavigation('left'),
    onSwipedRight: () => handleNavigation('right'),
  });

  return <div {...handlers} className="fixed inset-0 w-full h-full z-50">{children}</div>;
};

export default Navigation;
