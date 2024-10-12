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
        
        <div className="image-effects relative flex flex-[1] aspect-square min-w-[15rem] w-[17rem] max-w-[19rem] h-auto m-auto md:mt-[0.1rem] md:ml-[0.1rem] justify-center items-center select-none object-cover">
          <Image 
            src="/assets/images/headshot.jpg" 
            alt="Headshot" 
            width= {0}
            height= {0}
            sizes="100vw"
            quality={100}
            className="w-full h-full relative flex" 
          />
        </div>
        

        <div id="text-container" className="relative flex flex-col flex-[2] mt-8 md:mt-0 md:ml-8">
          <p dangerouslySetInnerHTML={{ __html: aboutContent.bio }}></p>
          <ul className="[&_*]:pl-1 relative columns-2 pl-2 font-ibm-plex-mono text-xs md:text-sm text-fgSoft list-outside marker-arrow mt-2">
            {aboutContent.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>             
      </div>
    </div>
  );
    
};

export default About;