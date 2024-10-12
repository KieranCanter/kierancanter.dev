import React from 'react';

const SectionTitle: React.FC<{ title: string }> = ({ title} ) => {

  return (
    <div className="flex flex-row w-full lg:w-1/2 justify-between items-center">
      <hr className="w-auto flex-1 border-[0.01rem] border-fgSoft" />
      <h1 className="w-fit text-fgHard text-[1.5rem] font-semibold mx-4">
        {title}
      </h1>
      <hr className="w-auto flex-1 border-[0.05rem] border-fgSoft" />
    </div>
  );
    
};

export default SectionTitle;