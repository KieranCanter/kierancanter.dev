import React, { useContext } from 'react';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { generateAccentColor } from '@/util/colorfulSetter';
import { aboutContent } from '@/data/aboutContent';
import DiamondBullet from '@/components/diamondBullet';

const About: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div 
      id="text-container" 
      className="relative flex flex-col w-full lg:w-kic-width h-fit p-4 text-fgSoft bg-black/10 rounded-sm transition-colors duration-[250ms] overflow-y-auto lg:hover:bg-black/20">
      <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
      <ul className="relative columns-2 mt-2 font-ibm-plex-mono text-xs md:text-sm list-none">
        {aboutContent.skills.map((skill: string, index: number) => {
          let accentColor: string;
          if (theme === 'brilliant' || theme === 'luminous') {
            accentColor = generateAccentColor(theme);
          } else {
            accentColor = 'var(--fg-contrast)';
          }

          return (
            <li key={index} className="mb-1 break-words text-fgHard selection:bg-fgHard flex items-center">
              <DiamondBullet color={accentColor} />
              {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default About;
