import React from 'react';
import { 
  FaBriefcase, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaIndustry, 
  FaTruck, 
  FaBoxes,
  FaUtensils,
  FaStore
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

const experienceData = [
  {
    id: 1,
    company: "Come Em Pé",
    position: "Auxiliar de Salgadeiro e Balconista",
    period: "Jan 2024 - Fev 2024",
    location: "Presencial",
    description: "Atuei na produção de salgados e atendimento ao público, desenvolvendo habilidades rápidas em ambiente dinâmico de alimentação.",
    responsibilities: [
      "Preparo de diversos tipos de salgados",
      "Atendimento ao cliente no balcão",
      "Manutenção da limpeza e organização do estabelecimento",
    ],
    skills: ["Atendimento ao cliente", "Trabalho sob pressão", "Habilidade manual", "Agilidade"],
    icon: <FaUtensils className="experience-icon" />
  },
  {
    id: 2,
    company: "Brainfarma",
    position: "Jovem Aprendiz - Auxiliar de Produção",
    period: "Maio 2023 - Dez 2023",
    location: "Presencial",
    description: "Atuei como auxiliar de produção e movimentador de carga, desempenhando atividades essenciais para garantir a qualidade e eficiência dos processos.",
    responsibilities: [
      "Inspeção de paletes, assegurando integridade e qualidade dos produtos",
      "Controle de matéria-prima secundária",
      "Montagem de paletes",
      "Suporte ao operador na linha de produção",
      "Manutenção de ambiente produtivo eficiente"
    ],
    skills: ["Organização", "Controle de qualidade", "Trabalho em equipe", "Proatividade"],
    icon: <FaIndustry className="experience-icon" />
  },
  {
    id: 3,
    company: "Freelance",
    position: "Ajudante de Motorista",
    period: "Junho 2019 - Setembro 2019",
    location: "Presencial",
    description: "Atuei como ajudante de motorista, auxiliando nas entregas e garantindo a organização e segurança das cargas transportadas.",
    responsibilities: [
      "Carregamento e descarregamento de mercadorias",
      "Planejamento de rotas para otimização de tempo",
      "Conferência de documentos e notas fiscais",
      "Atendimento ao cliente durante entregas"
    ],
    skills: ["Logística", "Atendimento", "Organização", "Trabalho sob pressão"],
    icon: <FaTruck className="experience-icon" />
  },
  {
    id: 4,
    company: "Freelance",
    position: "Auxiliar de Carga e Descarga",
    period: "Março 2018 - Outubro 2018",
    location: "Presencial",
    description: "Experiência prática em carga e descarga de mercadorias, com foco no manuseio seguro e organização eficiente.",
    responsibilities: [
      "Movimentação e organização de mercadorias",
      "Otimização de espaço de armazenamento",
      "Manuseio seguro de cargas",
      "Cumprimento rigoroso de prazos"
    ],
    skills: ["Força física", "Eficiência", "Comprometimento", "Agilidade"],
    icon: <FaBoxes className="experience-icon" />
  }
];

// Configurações de animação melhoradas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      duration: 0.7
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.97, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 130,
      damping: 10,
      mass: 0.5
    }
  },
  hover: {
    y: -8,
    boxShadow: "0 12px 28px rgba(123, 44, 191, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
};

const iconVariants = {
  hover: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.8
    }
  }
};

function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  });

  return (
    <motion.section 
      className="experience-section" 
      id="experiencia"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      ref={ref}
    >
      <div className="container">
        <motion.div
          className="section-header"
          variants={itemVariants}
        >
          <motion.h2 
            className="section-title"
            whileHover={{
              color: "#9d4edd",
              transition: { duration: 0.3 }
            }}
          >
            <motion.span
              animate={{
                rotate: [0, 15, -15, 0],
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
            >
              <FaBriefcase className="section-icon" />
            </motion.span>
            <span className="title-text">Jornada Profissional</span>
            <motion.span 
              className="title-decoration"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1.2,
                ease: "anticipate"
              }}
            />
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Minhas experiências profissionais que moldaram minha carreira
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
        >
          {experienceData.map((exp) => (
            <motion.div 
              key={exp.id} 
              className="experience-card"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="card-header">
                <motion.div 
                  className="company-icon-container"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <div className="company-icon-background"></div>
                  {exp.icon}
                </motion.div>
                <div className="company-info">
                  <motion.h3 
                    className="company-name"
                    whileHover={{ 
                      color: "#9d4edd",
                      x: 5
                    }}
                  >
                    {exp.company}
                  </motion.h3>
                  <motion.span 
                    className="position"
                    whileHover={{ color: "#9d4edd" }}
                  >
                    {exp.position}
                  </motion.span>
                </div>
              </div>
              
              <div className="experience-meta">
                <motion.span 
                  className="meta-item"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#9d4edd"
                  }}
                >
                  <FaCalendarAlt className="meta-icon" />
                  <span>{exp.period}</span>
                </motion.span>
                <motion.span 
                  className="meta-item"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#9d4edd"
                  }}
                >
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{exp.location}</span>
                </motion.span>
              </div>
              
              <motion.p 
                className="experience-description"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {exp.description}
              </motion.p>
              
              <div className="card-section">
                <motion.h4 
                  className="section-subtitle"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <span>Principais Atividades</span>
                </motion.h4>
                <ul className="responsibilities-list">
                  {exp.responsibilities.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="responsibility-item"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 + 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <motion.span 
                        className="bullet"
                        whileHover={{ scale: 1.5 }}
                      ></motion.span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="card-section">
                <motion.h4 
                  className="section-subtitle"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <span>Competências Desenvolvidas</span>
                </motion.h4>
                <motion.div 
                  className="skills-tags"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {exp.skills.map((skill) => (
                    <motion.span 
                      key={skill} 
                      className="skill-tag"
                      whileHover={{ 
                        scale: 1.15,
                        backgroundColor: "#7b2cbf",
                        color: "white"
                      }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Experience;