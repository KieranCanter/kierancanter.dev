'use client';

import React, { useContext, useEffect, useRef } from 'react';
import revealAnimation from '@/util/reveal';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { generateAccentColor } from '@/util/colorfulSetter';
import { experienceContent } from '@/data/experienceContent';

const Experience: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const experienceRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let delay: number = 0;
    experienceRefs.current.forEach((element) => {
      revealAnimation(element, delay);
      delay += 0.1;
    })
  }, []);

  return (
    <div id="text-container" className="relative flex flex-col gap-4 w-full lg:w-kic-width h-full overflow-y-auto pointer-events-none [&_*]:pointer-events-auto">
      {experienceContent.map((experience, index) => {
        let accentColor: string;
        if (theme === 'brilliant' || theme === 'luminous') {
          accentColor = generateAccentColor(theme);
        } else {
          accentColor = 'var(--fg-contrast)';
        }
        
        return (
          <div 
          key={index}
          ref={(element) => {
            if (element) {
              experienceRefs.current[index] = element;
            }
          }} 
          className="relative flex flex-col justify-between gap-2 w-full p-4 bg-black/10 rounded-sm transition-colors duration-[250ms] lg:hover:bg-black/20">
            
            <div className="w-full h-fit flex flex-row justify-between items-center">
              <h4 className="relative w-fit font-ibm-plex-sans text-base lg:text-lg text-fgContrast font-semibold selection:bg-fgContrast" dangerouslySetInnerHTML={{ __html: experience.position }} style={{ color: accentColor }}></h4>
              <div className="relative flex rounded-full w-2.5 h-2.5 lg:w-3 lg:h-3 bg-fgContrast" style={{ backgroundColor: accentColor }}/>
            </div>
            
            <div className="w-full h-fit flex flex-row justify-between items-end">
              <h5 className="text-fgSoft text-sm lg:text-base font-ibm-plex-sans font-light" dangerouslySetInnerHTML={{ __html: experience.company }}></h5>
              <h6 className="text-fgSoft text-xs lg:text-sm font-ibm-plex-mono font-semibold" dangerouslySetInnerHTML={{ __html: experience.period }}></h6>
            </div>
  
          </div>
        );
      })}
    </div>
  );
};

export default Experience;
