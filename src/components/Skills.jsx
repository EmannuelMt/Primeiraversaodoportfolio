import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { FaCode, FaServer, FaTools, FaUserFriends, FaLightbulb } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './Skills.css';

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const background = useMotionTemplate`radial-gradient(circle at 50% ${y}, rgba(123, 44, 191, 0.2), transparent 60%)`;

  const skillCategories = [
    {
      title: "Habilidades Interpessoais",
      icon: <FaUserFriends />,
      skills: [
        { name: "Organização", level: 90, color: "#7b2cbf" },
        { name: "Comunicação", level: 85, color: "#9d4edd" },
        { name: "Observação", level: 95, color: "#c77dff" },
        { name: "Proatividade", level: 90, color: "#7b2cbf" },
        { name: "Aprendizado Rápido", level: 95, color: "#9d4edd" },
        { name: "Trabalho em Equipe", level: 85, color: "#c77dff" }
      ]
    },
    {
      title: "Front-end",
      icon: <FaCode />,
      skills: [
        { name: "HTML5", level: 55, color: "#e34c26" },
        { name: "CSS3", level: 50, color: "#2965f1" },
        { name: "JavaScript", level: 65, color: "#f0db4f" },
        { name: "React", level: 30, color: "#61dbfb" }
      ]
    },
    {
      title: "Back-end",
      icon: <FaServer />,
      skills: [
        { name: "Node.js", level: 20, color: "#68a063", developing: true },
        { name: "Express", level: 10, color: "#000000", developing: true }
      ]
    },
    {
      title: "Ferramentas",
      icon: <FaTools />,
      skills: [
        { name: "Git", level: 20, color: "#f34f29", developing: true },
        { name: "Figma", level: 15, color: "#a259ff", developing: true }
      ]
    }
  ];

  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
      rotateX: -15
    },
    onscreen: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  };

  return (
    <motion.section 
      id="skills"
      className="skills-section"
      ref={containerRef}
      style={{ background }}
    >
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="icon-wrapper"
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLightbulb className="section-icon" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="title-gradient">Minhas Competências</span>
            <span className="title-underline"></span>
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Conhecimentos técnicos e habilidades interpessoais que me destacam
          </motion.p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="skill-category"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="category-header">
                <div className="category-icon-wrapper">
                  {category.icon}
                </div>
                <h3 className="category-title">{category.title}</h3>
                <FiArrowRight className="category-arrow" />
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    className="skill-item"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      {skill.developing && (
                        <span className="developing-badge">Em desenvolvimento</span>
                      )}
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.1 * skillIndex,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </motion.section>
  );
};

export default Skills;