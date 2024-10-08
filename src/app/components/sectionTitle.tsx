import React from 'react';

const SectionTitle: React.FC<{ title: string }> = ({ title} ) => {


  return (
    <div className="flex flex-row w-full justify-between items-center">
      <hr className="w-auto flex-1 border-[0.1rem] border-fgSoft" />
      <h1 className="w-fit text-fgSoft text-[1.5rem] font-ibm-plex-sans font-semibold mx-4">
        {title}
      </h1>
      <hr className="w-auto flex-1 border-[0.1rem] border-fgSoft" />
    </div>
  );
    
};

export default SectionTitle;