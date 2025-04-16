import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaBook, FaAward, FaRegCheckCircle, FaArrowRight } from 'react-icons/fa';
import './Education.css';

const Education = () => {
  // Dados de educação
  const educationData = {
    academic: [
      {
        id: 1,
        institution: "Faculdade Roberto Menage / SENAI",
        degree: "Fundamentos de Logística",
        period: "2022",
        duration: "14 horas",
        description: "Curso sobre princípios básicos de logística e cadeia de suprimentos.",
        certified: true
      }
    ],
    currentCourses: [
      { id: 1, name: "JavaScript", platform: "Curso em Vídeo", progress: 55 },
      { id: 2, name: "HTML & CSS", platform: "Curso em Vídeo", progress: 50 },
      { id: 3, name: "React", platform: "Curso em Vídeo", progress: 50 },
      { id: 4, name: "Python", platform: "Curso em Vídeo", progress: 50 },
      { id: 5, name: "Santander Bootcamp 2025", platform: "Santander Open Academy", progress: 15 }
    ],
    certifications: [
      {
        id: 1,
        title: "Fundamentos de Logística",
        institution: "Faculdade Roberto Menage / SENAI",
        year: "2022",
        duration: "14 horas"
      },
      {
        id: 2,
        title: "Marketing Digital",
        institution: "CIEE",
        year: "2022",
        duration: "3 horas"
      }
    ]
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardHover = {
    y: -5,
    scale: 1.03,
    boxShadow: "var(--sombra-roxo)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  };

  const pulseShadow = {
    initial: { textShadow: "0 0 8px rgba(123, 44, 191, 0.5)" },
    animate: {
      textShadow: [
        "0 0 8px var(--roxo-claro)",
        "0 0 12px var(--roxo-2)",
        "0 0 8px var(--roxo-claro)"
      ],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const arrowAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, 5, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const tagHover = {
    scale: 1.1,
    backgroundColor: "var(--roxo-3)",
    transition: { duration: 0.2 }
  };

  const iconAnimation = {
    hover: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.6 }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      id="education"
      className="education-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container">
        {/* Seção de Título com brilho pulsante */}
        <motion.div className="section-header" variants={itemVariants}>
          <motion.div 
            className="section-icon"
            animate="animate"
            variants={floatingAnimation}
          >
            <FaGraduationCap />
          </motion.div>
          <motion.h2
            initial="initial"
            animate="animate"
            variants={pulseShadow}
          >
            Educação & Certificações
          </motion.h2>
          <div className="divider"></div>
        </motion.div>

        {/* Formação Acadêmica */}
        <motion.div className="education-block" variants={containerVariants}>
          <motion.h3 variants={itemVariants}>
            <motion.span 
              className="icon"
              whileHover="hover"
              variants={iconAnimation}
            >
              <FaAward />
            </motion.span>
            Formação Acadêmica
          </motion.h3>
          
          <div className="timeline">
            {educationData.academic.map((item, index) => (
              <motion.div 
                key={`academic-${item.id}`}
                className="timeline-card"
                variants={itemVariants}
                whileHover={cardHover}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{item.institution}</h4>
                    <motion.span 
                      className="period"
                      whileHover={{ color: "var(--roxo-2)" }}
                    >
                      {item.period}
                    </motion.span>
                  </div>
                  <h5>{item.degree}</h5>
                  <p>{item.description}</p>
                  {item.certified && (
                    <motion.div 
                      className="certified-badge"
                      whileHover={tagHover}
                    >
                      <FaCertificate />
                      <span>Certificado - {item.duration}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cursos em Andamento */}
        <motion.div className="education-block" variants={containerVariants}>
          <motion.h3 variants={itemVariants}>
            <motion.span 
              className="icon"
              whileHover="hover"
              variants={iconAnimation}
            >
              <FaBook />
            </motion.span>
            Cursos em Progresso
          </motion.h3>
          
          <div className="courses-grid">
            {educationData.currentCourses.map((course, index) => (
              <motion.div 
                key={`course-${course.id}`}
                className="course-card"
                variants={itemVariants}
                whileHover={cardHover}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                transition={{ delay: index * 0.15 }}
              >
                <div className="course-header">
                  <h4>{course.name}</h4>
                  <motion.span 
                    className="platform"
                    whileHover={{ color: "var(--roxo-2)" }}
                  >
                    {course.platform}
                  </motion.span>
                </div>
                <div className="progress-container">
                  <motion.div 
                    className="progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${course.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                  <span className="progress-text">{course.progress}%</span>
                </div>
                <motion.div
                  className="course-link"
                  whileHover={{ color: "var(--roxo-2)" }}
                >
                  Continuar
                  <motion.span
                    variants={arrowAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificações */}
        <motion.div className="education-block" variants={containerVariants}>
          <motion.h3 variants={itemVariants}>
            <motion.span 
              className="icon"
              whileHover="hover"
              variants={iconAnimation}
            >
              <FaCertificate />
            </motion.span>
            Certificados Concluídos
          </motion.h3>
          
          <div className="certificates-grid">
            {educationData.certifications.map((cert, index) => (
              <motion.div 
                key={`cert-${cert.id}`}
                className="certificate-card"
                variants={itemVariants}
                whileHover={cardHover}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className="certificate-header">
                  <h4>{cert.title}</h4>
                  <motion.span 
                    className="duration"
                    whileHover={{ color: "var(--roxo-2)" }}
                  >
                    {cert.duration}
                  </motion.span>
                </div>
                <p className="institution">{cert.institution}</p>
                <div className="certificate-footer">
                  <motion.span 
                    className="year"
                    whileHover={{ color: "var(--roxo-2)" }}
                  >
                    {cert.year}
                  </motion.span>
                  <motion.div 
                    className="verified"
                    whileHover={tagHover}
                  >
                    <FaRegCheckCircle />
                    <span>Verificado</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;