import React from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/app/components/sectionTitle';
import ProjectCard from '@/app/components/projectCard';
const Experience: React.FC = () => {
  return (
    <div className="flex flex-col w-[calc(100%-4rem)] xl:w-kic-width justify-center items-center">
      <SectionTitle title="Works" />
      <div className="w-full h-full flex flex-col mt-8">
        <ProjectCard title="Project 1" description="Description 1" technologies={["React.js", "Next.js", "TypeScript"]} imageUrl="/images/headshot.jpg" githubUrl="https://github.com/kieran-canter/project1" projectUrl="https://project1.com" />
      </div>
    </div>
  );
};

export default Experience;