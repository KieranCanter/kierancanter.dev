import React from 'react';
import '@/styles/globals.scss';
import { experienceContent } from '@/data/experienceContent';

const Experience: React.FC = () => {

  return (
    <div id="text-container" className="relative flex flex-col gap-4 w-full lg:w-kic-width h-fit overflow-y-auto scrollbox pointer-events-none [&_*]:pointer-events-auto">
      <div className="relative flex flex-col justify-between gap-2 w-full p-4 bg-black/10 rounded-sm transition-colors duration-[250ms] lg:hover:bg-black/20">
        
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h4 className="relative w-fit font-ibm-plex-sans text-base lg:text-lg text-fgContrast font-semibold selection:bg-fgContrast" dangerouslySetInnerHTML={{ __html: experienceContent[0].position}}></h4>
          <div className="relative flex rounded-full w-2.5 h-2.5 lg:w-3 lg:h-3 bg-fgContrast" />
        </div>
        <div className="w-full h-fit flex flex-row justify-between items-end">
          <h5 className="text-fgSoft text-sm lg:text-base font-ibm-plex-sans font-light" dangerouslySetInnerHTML={{ __html: experienceContent[0].company}}></h5>
          <h6 className="text-fgSoft text-xs lg:text-sm font-ibm-plex-mono font-semibold" dangerouslySetInnerHTML={{ __html: experienceContent[0].period}}></h6>
        </div>

      </div>
      <div className="relative flex flex-col justify-between gap-2 w-full p-4 bg-black/10 rounded-sm transition-colors duration-[250ms] lg:hover:bg-black/20">
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h4 className="relative w-fit font-ibm-plex-sans text-base lg:text-lg text-fgContrast font-semibold selection:bg-fgContrast" dangerouslySetInnerHTML={{ __html: experienceContent[1].position}}></h4>
          <div className="relative flex rounded-full w-2.5 h-2.5 lg:w-3 lg:h-3 bg-fgContrast" />
        </div>
        <div className="w-full h-fit flex flex-row justify-between items-end">
          <h5 className="text-fgSoft text-sm lg:text-base font-ibm-plex-sans font-light" dangerouslySetInnerHTML={{ __html: experienceContent[1].company}}></h5>
          <h6 className="text-fgSoft text-xs lg:text-sm font-ibm-plex-mono font-semibold" dangerouslySetInnerHTML={{ __html: experienceContent[1].period}}></h6>
        </div>
        
      </div>
    </div>
  );
    
};

export default Experience;
