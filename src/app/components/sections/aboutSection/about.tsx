import React from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/app/components/sectionTitle';
import Image from 'next/image';
import { aboutContent } from '@/data/aboutContent';

const About: React.FC = () => {

  return (
    <div className="flex flex-col w-[calc(100%-4rem)] xl:w-kic-width justify-center items-center">
      <SectionTitle title="About" />
      <div className="relative flex flex-col md:flex-row mt-8 w-full h-fit justify-center items-center">
        <div id="text-container" className="relative flex flex-col flex-[2] max-w-full mt-8 md:mt-0 md:ml-8">
          <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
          <ul className="relative columns-2 mt-2 pl-3 font-ibm-plex-mono text-xs md:text-sm text-fgSoft list-outside marker-arrow">
            {aboutContent.skills.map((skill: string, index: number) => (
              <li key={index} className="mb-1 break-words">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
    
};

export default About;