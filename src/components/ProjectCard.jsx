import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import "../styles/ProjectCard.css";
const ProjectCard = ({ 
  title, 
  description, 
  image, 
  tags, 
  githubUrl, 
  liveUrl 
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "var(--sombra-roxo)",
      transition: { duration: 0.3 }
    }
  };

  const imageHover = {
    scale: 1.05,
    transition: { duration: 0.5 }
  };

  const linkHover = {
    scale: 1.1,
    color: "var(--roxo-claro)",
    transition: { duration: 0.2 }
  };

  const tagHover = {
    scale: 1.05,
    backgroundColor: "var(--roxo-3)",
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      className="project-card"
      variants={cardVariants}
      whileHover="hover"
    >
      <motion.div className="project-image-container">
        <motion.img 
          src={image} 
          alt={title} 
          className="project-image"
          whileHover={imageHover}
        />
        <div className="project-links">
          {githubUrl && (
            <motion.a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`Ver código no GitHub - ${title}`}
              whileHover={linkHover}
            >
              <FiGithub size={18} />
            </motion.a>
          )}
          {liveUrl && (
            <motion.a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`Ver demonstração - ${title}`}
              whileHover={linkHover}
            >
              <FiExternalLink size={18} />
            </motion.a>
          )}
        </div>
      </motion.div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="project-tag"
              whileHover={tagHover}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;