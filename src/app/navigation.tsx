'use client';

import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter, usePathname } from 'next/navigation';

const routes = ['/', '/about', '/experience', '/works'];

const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [offset, setOffset] = React.useState(0);

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
    onSwiping: (eventData) => {
      setOffset(eventData.deltaX / 2);
    },
    onSwiped: () => {
      setOffset(0);
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  });

  return (
    <div 
      {...handlers} 
      className="relative flex flex-[2] p-4 lg:mx-auto lg:mt-0 lg:mb-8 overflow-y-auto no-scrollbar z-30"
      style={{
        transform: `translateX(${offset}px)`,
        transition: offset === 0 ? 'transform 0.25s ease-out' : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default Navigation;
