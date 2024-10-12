import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  projectUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  projectUrl
  }) => {
  return (
    <div className="relative aspect-video w-full max-w-[30rem] h-auto mx-auto overflow-hidden rounded-sm shadow-lg group">
      <Image
        src={imageUrl}
        alt={title}
        width={1920}
        height={1080}
        className="w-full h-full object-cover transition-all duration-[250ms]] group-hover:blur-sm group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-opacity-50 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]] flex flex-col text-white p-2">
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-sm">{description}</p>
        
        <div className="flex flex-row w-full h-fit mt-auto items-center justify-between">
          <div className="flex flex-row justify-between gap-2">
            {technologies.map((tech, index) => (
              <p key={index} className="font-ibm-plex-mono font-semibold text-fgContrast rounded-sm text-xs">
                {tech}
              </p>
            ))}
          </div>
          
          <div className="flex flex-row gap-2">
            {githubUrl && (
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300">
                GH
              </Link>
            )}
            {projectUrl && (
              <Link href={projectUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:text-green-300">
                PL
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

