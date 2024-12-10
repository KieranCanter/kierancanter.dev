'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import revealAnimation from '@/util/reveal';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { generateAccentColor } from '@/util/colorfulSetter';
import { aboutContent } from '@/data/aboutContent';
import DiamondBullet from '@/components/diamondBullet';

/**
 * About Component
 * Displays personal bio and skills list with dynamic theme-based styling
 * @param {boolean} isActive - Whether this component is currently visible/active
 */
const About: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const { theme } = useContext(ThemeContext);
  const aboutRef = useRef<HTMLDivElement>(null);
  const accentColorsRef = useRef<string[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  /**
   * Trigger reveal animation when component becomes active
   */
  useEffect(() => {
    if (isActive) {
      revealAnimation(aboutRef.current!);
    }
  }, [isActive]);

  /**
   * Update accent colors when theme changes
   * Generates new colors for brilliant/luminous themes
   */
  useEffect(() => {
    const isColorful = theme === 'brilliant' || theme === 'luminous';
    
    // Reset and regenerate colors for each skill
    accentColorsRef.current = aboutContent.skills.map(() => 
      isColorful ? generateAccentColor(theme) : 'var(--fg-contrast)'
    );
    
    // Force a re-render to apply new colors
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
        {/* Bio Section - HTML content from aboutContent */}
        <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
        
        {/* Skills List */}
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
