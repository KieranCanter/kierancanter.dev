'use client';

import React, { useContext, useEffect, useRef } from 'react';
import revealAnimation from '@/util/reveal';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { worksContent } from '@/data/worksContent';
import { generateAccentColor } from '@/util/colorfulSetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Works: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const worksRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let delay: number = 0;
    worksRefs.current.forEach((element) => {
      revealAnimation(element, delay);
      delay += 0.1;
    })
  }, []);

  return (
    <div id="text-container" className="relative flex flex-col gap-4 w-full lg:w-kic-width h-full pointer-events-none [&_*]:pointer-events-auto">
      {worksContent.map((work, index) => (
        <div 
        key={index} 
        ref={(element) => {
          if (element) {
            worksRefs.current[index] = element;
          }
        }} 
        className="relative flex flex-col justify-between gap-2 w-full p-4 bg-black/10 rounded-sm transition-colors duration-[250ms] lg:hover:bg-black/20 opacity-0">
          <div className="w-full h-fit flex flex-row gap-4 justify-between items-start md:items-center">
            
            <Link href={work.githubURL} passHref target="_blank" rel="noopener noreferrer">
              <h4 className="relative w-fit font-ibm-plex-sans text-base lg:text-lg text-fgHard font-semibold selection:bg-fgHard hover:text-fgContrast hover:selection:bg-fgContrast transition-colors duration-[250ms]">{work.project}</h4>
            </Link>
            
            <div className="relative flex flex-row gap-4">
              {work.projectURL && (
                <Link href={work.projectURL} passHref target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faUpRightFromSquare} className="text-fgHard text-lg hover:text-fgContrast transition-colors duration-[250ms]" />
                </Link>
              )}
              <Link href={work.githubURL} passHref target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="text-fgHard text-lg hover:text-fgContrast transition-colors duration-[250ms]" />
              </Link>
            </div>
            
          </div>
          
          <p className="text-fgSoft text-sm lg:text-base font-ibm-plex-sans font-light" dangerouslySetInnerHTML={{ __html: work.description }} />

          <div className="flex flex-wrap gap-2 mt-2">
            {work.technologies.map((tech, techIndex) => {
              let accentColor: string;
              if (theme === 'brilliant' || theme === 'luminous') {
                accentColor = generateAccentColor(theme);
              } else {
                accentColor = 'var(--fg-contrast)';
              }

              return (
                <h6 key={techIndex} className={`text-[0.65rem] font-bold text-bg px-2 py-1 rounded-sm cursor-default hover:opacity-85 selection:bg-bg selection:text-fgContrast`}
                style={{ backgroundColor: accentColor }}>
                {tech}
                </h6>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
};

export default Works;
