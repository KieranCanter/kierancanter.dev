import React from 'react';
import '@/styles/globals.scss';
import { experienceContent } from '@/data/experienceContent';

const Experience: React.FC = () => {

  return (
    <div id="text-container" className="relative flex flex-col gap-4 w-full lg:w-kic-width h-auto m-4 lg:m-auto overflow-y-auto scrollbox">
      <div className="relative flex flex-col justify-between gap-2 w-full h-fit p-4 bg-black/10 rounded-sm">
        <h4 className="font-ibm-plex-sans text-base text-fgContrast font-semibold" dangerouslySetInnerHTML={{ __html: experienceContent[0].position}}></h4>
        <div className="flex flex-row justify-between items-end">
          <h5 className="text-fgSoft text-sm font-ibm-plex-sans font-light" dangerouslySetInnerHTML={{ __html: experienceContent[0].company}}></h5>
          <h6 className="text-fgSoft text-xs font-ibm-plex-mono font-semibold" dangerouslySetInnerHTML={{ __html: experienceContent[0].period}}></h6>
        </div>
      </div>
      <div className="relative flex flex-col justify-between gap-2 w-full h-fit p-4 bg-black/10 rounded-sm">
      <h4 className="font-ibm-plex-sans text-base text-fgContrast font-semibold" dangerouslySetInnerHTML={{ __html: experienceContent[1].position}}></h4>
        <div className="flex flex-row justify-between items-end">
          <h5 className="text-fgSoft text-sm font-ibm-plex-sans font-light" dangerouslySetInnerHTML={{ __html: experienceContent[1].company}}></h5>
          <h6 className="text-fgSoft text-xs font-ibm-plex-mono font-semibold" dangerouslySetInnerHTML={{ __html: experienceContent[1].period}}></h6>
        </div>
      </div>
    </div>
  );
    
};

export default Experience;