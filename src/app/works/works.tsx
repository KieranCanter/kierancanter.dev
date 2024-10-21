'use client';

import React, { useContext } from 'react';
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

  return (
    <div id="text-container" className="relative flex flex-col gap-4 w-full lg:w-kic-width h-fit pointer-events-none [&_*]:pointer-events-auto">
      {worksContent.map((work, index) => (
        <div key={index} className="relative flex flex-col justify-between gap-2 w-full p-4 bg-black/10 rounded-sm transition-colors duration-[250ms] lg:hover:bg-black/20">
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
              let techColor: string;
              if (theme === 'brilliant' || theme === 'luminous') {
                techColor = generateAccentColor(theme);
              } else {
                techColor = 'var(--fg-contrast)';
              }

              return (
                <h6 key={techIndex} className={`text-[0.65rem] font-bold text-bg px-2 py-1 rounded-sm selection:bg-bg selection:text-fgContrast`}
                style={{ backgroundColor: techColor }}>
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
