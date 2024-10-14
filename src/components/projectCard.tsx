'use client';

import React, { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '@/context/themeContext';

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
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div 
      className={`relative w-full min-w-64 h-full lg:aspect-video lg:max-w-[40rem] lg:h-auto m-auto rounded-sm group overflow-hidden shadow-black transition duration-[250ms] ${isHovered ? 'shadow-[0_0.5rem_0.5rem_-0.375rem] -translate-y-1' : 'shadow-[0_0.5rem_0.5rem_-0.5rem]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover transition-all duration-[250ms] ${isHovered ? 'scale-110 blur-sm' : ''}`}
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-bg to-transparent transition-opacity duration-[250ms] ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

      {/* Title */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[250ms] ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-2xl font-bold text-fgContrast px-4 py-2 text-center drop-shadow-[0_0.15rem_0.08rem_rgba(0,0,0,0.5)]">
          {title}
        </h1>
      </div>

      {/* Hover content */}
      <div className={`relative flex flex-col w-full h-full z-10  p-3 md:p-5 transition-opacity duration-[250ms] ${isHovered ? 'opacity-100' : 'opacity-0'} ${theme === 'plush' || theme === 'brilliant' ? 'bg-gray-200/10' : 'bg-black/70'}`}>
        <h1 className="text-2xl font-bold text-fgContrast mb-4 selection:bg-fgContrast">{title}</h1>
        <p className="text-fgHard text-sm mb-4 overflow-y-auto flex-grow selection:bg-fgHard" dangerouslySetInnerHTML={{ __html: description }} />

        <div className="flex flex-row justify-between mt-auto">
          <div className="flex flex-wrap gap-2 ">
            {technologies.map((tech, index) => (
              <h6 key={index} className="text-xs font-semibold bg-fgContrast text-bg px-2 py-1 rounded selection:bg-bg selection:text-fgContrast">
                {tech}
              </h6>
            ))}
          </div>
          <div className="flex items-end gap-4">
            {githubUrl && (
              <Link 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-fgHard hover:text-fgContrast transition-colors duration-[250ms]"
                onClick={(e) => !isHovered && e.preventDefault()}
                aria-label="GitHub Repository"
              >
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </Link>
            )}
            {projectUrl && (
              <Link 
                href={projectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-fgHard hover:text-fgContrast transition-colors duration-[250ms]"
                onClick={(e) => !isHovered && e.preventDefault()}
                aria-label="Project Link"
              >
                <FontAwesomeIcon icon={faUpRightFromSquare} className="text-xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
