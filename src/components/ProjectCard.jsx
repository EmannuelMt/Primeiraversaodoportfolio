import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";


const ProjectCard = ({ 
  title, 
  description, 
  image, 
  tags, 
  githubUrl, 
  liveUrl 
}) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-links">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`Ver código no GitHub - ${title}`}
            >
              <FiGithub size={18} />
            </a>
          )}
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`Ver demonstração - ${title}`}
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;