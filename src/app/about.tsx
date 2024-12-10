'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import revealAnimation from '@/util/reveal';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { generateAccentColor } from '@/util/colorfulSetter';
import { aboutContent } from '@/data/aboutContent';
import DiamondBullet from '@/components/diamondBullet';

const About: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const { theme } = useContext(ThemeContext);
  const aboutRef = useRef<HTMLDivElement>(null);
  const accentColorsRef = useRef<string[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (isActive) {
      revealAnimation(aboutRef.current!);
    }
  }, [isActive]);

  useEffect(() => {
    const isColorful = theme === 'brilliant' || theme === 'luminous';
    
    // Reset and regenerate colors
    accentColorsRef.current = aboutContent.skills.map(() => 
      isColorful ? generateAccentColor(theme) : 'var(--fg-contrast)'
    );
    
    // Force a re-render
    setForceUpdate(prev => prev + 1);
  }, [theme]);

  return (
    <section 
      id="text-container" 
      ref={aboutRef}
      className="relative flex flex-col w-full lg:w-kic-width h-fit p-2 text-fgSoft bg-black/10 rounded-sm transition-colors duration-250 hover:bg-black/20 lg:pointer-events-auto"
      aria-label="About Me"
    >
      <article>
        <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
        <aside>
          <h4 className="sr-only">Skills</h4>
          <ul className="relative columns-2 mt-2 font-ibm-plex-mono text-xs md:text-sm list-none">
            {aboutContent.skills.map((skill: string, index: number) => (
              <li key={index} className="mb-1 break-words text-fgHard selection:bg-fgHard flex items-center">
                <DiamondBullet color={accentColorsRef.current[index] || 'var(--fg-contrast)'} />
                {skill}
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </section>
  );
};

export default About;
