import React from 'react';
import '@/styles/globals.scss';
import { aboutContent } from '@/data/aboutContent';

const About: React.FC = () => {

  return (
    <div className="flex flex-col w-[calc(100%-2rem)] md:max-lg:w-[calc(50dvw+2rem)] lg:w-kic-width justify-center items-center bg-black/10 rounded-sm">
      <div id="text-container" className="w-full relative flex flex-col h-[calc(100dvh-13rem)] md:max-lg:h-[calc(100dvh-9rem)] lg:h-fit p-4 text-fgSoft overflow-y-auto scrollbox">
        <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
        <ul className="relative columns-2 mt-2 pl-3 font-ibm-plex-mono text-xs md:text-sm list-outside marker-arrow">
          {aboutContent.skills.map((skill: string, index: number) => (
            <li key={index} className="mb-1 break-words text-fgHard">{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
    
};

export default About;