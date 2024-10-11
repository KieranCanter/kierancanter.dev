import React from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/app/components/sectionTitle';
import Image from 'next/image';

const About: React.FC = () => {

  return (
    <div className="flex flex-col w-[calc(100%-4rem)] lg:w-kic-width justify-center items-center">
      <SectionTitle title="About" />
      <div className="relative flex flex-col md:flex-row mt-8 w-full h-fit justify-center items-center">
        
        <div className="image-effects relative flex flex-[1] aspect-square min-w-[15rem] w-[17rem] h-auto m-auto md:mt-[0.1rem] md:ml-[0.1rem] justify-center items-center select-none object-cover">
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
          <p className="relative font-ibm-plex-sans text-sm md:text-base text-fgSoft break-words whitespace-pre-line">
            {`Lorem ipsum odor amet, consectetuer adipiscing elit. Suspendisse vulputate commodo semper torquent aliquam. Pretium molestie donec hendrerit dui tempor commodo lacus. Condimentum taciti nunc mauris phasellus curabitur gravida. Laoreet molestie amet bibendum rhoncus dolor luctus neque id.

            Ac parturient id facilisi maecenas litora, montes ridiculus mi. At litora sollicitudin praesent commodo non. Quam habitasse pulvinar pretium nulla magnis per magna pharetra gravida. Morbi cras dignissim mattis risus imperdiet accumsan libero semper. Semper auctor elit litora inceptos curae amet.

            Ex adipiscing diam dignissim accumsan dapibus:`}
          </p>

          <ul className="[&_*]:pl-1 relative columns-2 pl-4 font-ibm-plex-mono text-xs md:text-sm text-fgSoft list-outside marker-arrow mt-2">
            <li>Python</li>
            <li>HTML + SCSS</li>
            <li>C/C++</li>
            <li>JavaScript/TypeScript</li>
            <li>ReactJS/NextJS</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>             
      </div>
    </div>
  );
    
};

export default About;