import React from 'react';
import '@/styles/globals.scss';
import { aboutContent } from '@/data/aboutContent';

const About: React.FC = () => {

  return (
    <div id="text-container" className="relative flex flex-col w-full lg:w-kic-width h-auto m-4 lg:m-auto p-4 md:max-lg:p-0 text-fgSoft bg-black/10 rounded-sm overflow-y-auto scrollbox">
      <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
      <ul className="relative columns-2 mt-2 pl-3 font-ibm-plex-mono text-xs md:text-sm list-outside marker-arrow">
        {aboutContent.skills.map((skill: string, index: number) => (
          <li key={index} className="mb-1 break-words text-fgHard">{skill}</li>
        ))}
      </ul>
    </div>
  );
    
};

export default About;