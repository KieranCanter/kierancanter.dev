import React from 'react';
import '@/styles/globals.scss';
import SectionTitle from '@/components/sectionTitle';
import ProjectCard from '@/components/projectCard';

const Experience: React.FC = () => {
  return (
    <div className="flex flex-col w-[calc(100%-4rem)] lg:w-kic-width justify-center items-center">
      <SectionTitle title="Works" />
      <div className="w-full h-full flex flex-col mt-8">
        <ProjectCard 
          title="kierancanter.dev" 
          description="Hardware: The parts of a computer system that can be kicked. (Jeff Pesis) I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.(Oktal)<br><br>Optimism is an occupational hazard of programming; feedback is the treatment. (Kent Beck)<br><br>There are only two industries that refer to their customers as ‘users’. (Edward Tufte)<br><br>There are only two industries that refer to their customers as ‘users’. (Edward Tufte)"
          technologies={["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"]} 
          imageUrl="/images/projectcard-kcdev2.png"
          githubUrl="https://github.com/KieranCanter/kierancanter.dev" 
          projectUrl="https://kierancanter.dev"
        />
      </div>
    </div>
  );
};

export default Experience;