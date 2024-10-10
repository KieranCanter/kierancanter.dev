import React, { useState, useRef } from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/app/components/sectionTitle';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { 
      id: 'tab1', 
      title: 'White Ferrari',
      content: 'Baby you are not the same in my dreams'
    },
    { 
      id: 'tab2', 
      title: 'Kay & Cee',
      content: 'If not for anything, for anything'
    },
    { 
      id: 'tab3', 
      title: 'CEIL', 
      content: 'I mean'
    },
  ];


  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  }
  

  return (
    <div className="flex flex-col w-[calc(100%-4rem)] xl:w-kic-width justify-center items-center">
      <SectionTitle title="Experience" />
      <div className="w-full h-full flex flex-col mt-8">
        <div className="relative flex h-fit justify-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 text-sm font-medium bg-bg border-b-2 border-fgSoft ${activeTab === tab.id ? 'text-fgContrast hover:opacity-75' : 'text-fgSoft hover:text-fgHard hover:border-fgHard'} transition duration-[250ms]`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="bg-bg py-4">
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
              <p>{tab.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
    
};

export default Experience;