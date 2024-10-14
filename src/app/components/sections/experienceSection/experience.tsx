import React, { useState, useRef, useEffect } from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/app/components/sectionTitle';
import { experienceContent } from '@/data/experienceContent';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const tabs = experienceContent.map(content => ({
    id: content.id,
    label: content.company,
    content: (
      <div>
        <div className="flex justify-between text-lg mb-2 leading-tight">
          <h4 className="text-fgHard font-bold text-left selection:bg-fgHard">{content.position}</h4>
          <h5 className="text-fgContrast font-base text-right selection:bg-fgContrast">{content.company}</h5>
        </div>
        <h6 className="text-xs text-fgHard font-semibold mb-6 selection:bg-fgHard">{content.period}</h6>
        <ul className="text-sm md:text-base text-fgSoft font-ibm-plex-sans marker-arrow list-outside pl-2">
          {content.bullets.map((bullet, index) => (
            <li key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: bullet }}></li>
          ))}
        </ul>
      </div>
    ),
  }));

  useEffect(() => {
    const updateIndicatorStyle = () => {
      const activeTabElement = tabRefs.current[tabs.findIndex(tab => tab.id === activeTab)];
      const containerElement = tabRefs.current[0];
      const indicator = indicatorRef.current;
      
      if (activeTabElement && containerElement && indicator) {
        const containerRect = containerElement.parentElement?.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        
        if (containerRect) {
          indicator.style.width = `${activeTabRect.width / 16}rem`;
          indicator.style.transform = `translateX(${(activeTabRect.left - containerRect.left) / 16}rem)`;
          indicator.style.transition = 'all 0.25s ease';
        }
      }
    };

    updateIndicatorStyle();

    window.addEventListener('resize', updateIndicatorStyle);

    return () => {
      window.removeEventListener('resize', updateIndicatorStyle);
    };
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  }

  return (
    <div className="flex flex-col w-[calc(100%-4rem)] xl:w-kic-width justify-center items-center">
      <SectionTitle title="Experience" />
      <div className="w-full h-full flex flex-col mt-8">
        <div className="relative flex w-max h-fit justify-start whitespace-nowrap">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el: HTMLButtonElement | null) => { tabRefs.current[index] = el }}
              className={`py-2 px-2 md:px-4 text-sm md:text-base border-b-2 border-fgSoft font-semibold bg-bg ${
                activeTab === tab.id
                  ? 'text-fgContrast hover:opacity-75 selection:bg-fgContrast'
                  : 'text-fgSoft hover:text-fgHard hover:border-fgHard'
              } transition duration-[250ms]`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 left-0 bg-transparent border-b-2 hover:border-opacity-75 border-fgContrast transition duration-[250ms]"
          />
        </div>
        <div className="bg-bg py-4 mt-6 transition duration-[250ms]">
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;