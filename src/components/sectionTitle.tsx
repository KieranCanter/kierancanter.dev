import React from 'react';

const SectionTitle: React.FC<{ title: string }> = ({ title} ) => {

  return (
    <div className="flex flex-row w-full md:w-[50dvw] lg:w-[25dvw] justify-between items-center mb-4 pt-2">
      <hr className="w-auto flex-1 border-[0.01rem] border-fgSoft ml-4" />
      <h1 className="w-fit text-fgHard text-[1.5rem] font-semibold mx-4 selection:bg-fgHard">
        {title}
      </h1>
      <hr className="w-auto flex-1 border-[0.05rem] border-fgSoft mr-4" />
    </div>
  );
    
};

export default SectionTitle;