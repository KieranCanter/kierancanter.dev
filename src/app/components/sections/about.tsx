import React from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/app/components/sectionTitle';
import Image from 'next/image';

const About: React.FC = () => {

  return (
    <div className="*:outline flex flex-col w-[calc(100%-4rem)] lg:w-kic-width justify-center items-center">
      <SectionTitle title="About" />
      <div className="relative flex flex-col md:flex-row mt-8 w-full h-fit">
        <div className="relative flex flex-[1] w-[17rem] h-[17rem] m-auto md:ml-0 md:mt-0 justify-center items-center transition duration-[250ms] overflow-hidden shadow-black shadow-[0_0.5rem_0.5rem_-0.375rem] hover:shadow-black hover:shadow-[0_0.5rem_0.5rem_-0.125rem] hover:-translate-y-[0.313rem] grayscale-[0.8] hover:grayscale-0 opacity-80 hover:opacity-100">
          <Image 
            src="/assets/images/headshot.jpg" 
            alt="Headshot" 
            width= {0}
            height= {0}
            sizes="100vw"
            className="w-full h-full relative flex select-none object-cover hover:scale-105 transition duration-[250ms]" 
          />
        </div>
        

        <div id="text-container" className="relative flex flex-col flex-[2] mt-8 md:mt-0 md:ml-8">
          <p className="relative font-ibm-plex-sans text-md text-fgSoft break-words whitespace-pre-line">
            {`Lorem ipsum odor amet, consectetuer adipiscing elit. Suspendisse vulputate commodo semper torquent aliquam. Pretium molestie donec hendrerit dui tempor commodo lacus. Condimentum taciti nunc mauris phasellus curabitur gravida. Laoreet molestie amet bibendum rhoncus dolor luctus neque id.

            Ac parturient id facilisi maecenas litora, montes ridiculus mi. At litora sollicitudin praesent commodo non. Quam habitasse pulvinar pretium nulla magnis per magna pharetra gravida. Morbi cras dignissim mattis risus imperdiet accumsan libero semper. Semper auctor elit litora inceptos curae amet.

            Ex adipiscing diam dignissim accumsan dapibus:`}
          </p>

          <ul className="relative columns-2 font-ibm-plex-mono text-sm text-fgSoft list-inside marker-arrow mt-2 ">
            <li>Python</li>
            <li>HTML + SCSS</li>
            <li>JavaScript/TypeScript</li>
            <li>ReactJS/NextJS</li>
            <li>Tailwind CSS</li>
            <li>C/C++</li>
          </ul>
        </div>             
      </div>
    </div>
  );
    
};

export default About;