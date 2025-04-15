import { Link } from "react-router-dom";
import { 
  FaCode, 
  FaReact, 
  FaNodeJs, 
  FaDatabase,
  FaArrowRight,
  FaTools,
  FaBook,
  FaChartLine
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import "./Home.css";

// Constantes para dados
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Sistema de Gerenciamento",
    description: "Plataforma completa com dashboard admin, autenticação e relatórios em tempo real.",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "/projects/1"
  },
  {
    id: 2,
    title: "E-commerce Moderno",
    description: "Loja virtual com carrinho, checkout e integração com pagamentos.",
    technologies: ["Next.js", "Stripe", "Tailwind"],
    link: "/projects/2"
  },
  {
    id: 3,
    title: "Aplicativo de Task",
    description: "Gerenciador de tarefas com drag-n-drop, categorias e notificações.",
    technologies: ["React Native", "Firebase", "Redux"],
    link: "/projects/3"
  }
];

const CURRENT_SKILLS = [
  { name: "React", level: 80 },
  { name: "TypeScript", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "GraphQL", level: 65 }
];

const FUTURE_SKILLS = [
  { name: "Rust", reason: "Para desenvolvimento de sistemas performáticos" },
  { name: "WebAssembly", reason: "Para aplicações web de alto desempenho" },
  { name: "Kubernetes", reason: "Para orquestração de containers em escala" },
  { name: "Blockchain", reason: "Para entender tecnologias descentralizadas" }
];

const TECH_STACK = [
  { name: "Frontend", tools: ["React", "Next.js", "TailwindCSS", "Framer Motion"] },
  { name: "Backend", tools: ["Node.js", "Express", "NestJS", "GraphQL"] },
  { name: "Banco de Dados", tools: ["MongoDB", "PostgreSQL", "Redis"] },
  { name: "DevOps", tools: ["Docker", "AWS", "GitHub Actions"] }
];

// Configurações de animação
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const ITEM_VARIANTS = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Seção Hero */}
      <motion.section
        className="highlight-section"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={CONTAINER_VARIANTS}
        aria-labelledby="hero-heading"
        viewport={{ once: true }}
      >
        <div className="highlight-bg" aria-hidden="true"></div>
        
        <div className="container">
          <motion.div className="highlight-content" variants={ITEM_VARIANTS}>
            <motion.figure
              className="highlight-img-container"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <picture>
                <source srcSet="/assets/emmannuel.webp" type="image/webp" />
                <img
                  src="/assets/emmannuel.jpg"
                  alt="Retrato de Emmannuel"
                  className="highlight-img"
                  width={350}
                  height={350}
                  loading="lazy"
                />
              </picture>
            </motion.figure>

            <div className="highlight-text">
              <motion.h1 id="hero-heading" variants={ITEM_VARIANTS}>
                <span className="greeting">Oi, eu sou</span>
                <span className="name-highlight">Emmannuel</span>
              </motion.h1>
              
              <motion.p className="highlight-description" variants={ITEM_VARIANTS}>
                Desenvolvedor Fullstack apaixonado por criar experiências digitais 
                extraordinárias. Especialista em arquitetura de sistemas escaláveis 
                e interfaces intuitivas.
              </motion.p>
              
              <motion.div className="highlight-actions" variants={ITEM_VARIANTS}>
                <Link 
                  to="/projects" 
                  className="cta-button primary"
                  aria-label="Ver projetos"
                >
                  <span>Ver meus projetos</span>
                  <FaArrowRight className="cta-icon" aria-hidden="true" />
                </Link>
                <Link 
                  to="/contact" 
                  className="cta-button secondary"
                  aria-label="Ir para contato"
                >
                  <span>Contato direto</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Seção de Projetos */}
      <section className="featured-projects" aria-labelledby="projects-heading">
        <div className="container">
          <h2 id="projects-heading" className="section-title">
            <FaCode className="title-icon" aria-hidden="true" />
            <span>Projetos em Destaque</span>
          </h2>
          
          <div className="card-grid">
            {FEATURED_PROJECTS.map((project) => (
              <motion.article 
                key={project.id}
                className="project-card"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={ITEM_VARIANTS}
                custom={project.id * 0.1}
                whileHover={{ y: -10 }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="tech-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <Link 
                  to={project.link} 
                  className="card-btn"
                  aria-label={`Ver detalhes do projeto ${project.title}`}
                >
                  <span>Ver detalhes</span>
                  <FaArrowRight className="btn-icon" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Tecnologias */}
      <section className="tech-stack-section" aria-labelledby="tech-stack-heading">
        <div className="container">
          <h2 id="tech-stack-heading" className="section-title">
            <FaTools className="title-icon" aria-hidden="true" />
            <span>Tecnologias Utilizadas</span>
          </h2>
          
          <p className="section-subtitle">
            Este site foi construído com as seguintes tecnologias:
          </p>
          
          <div className="stack-grid">
            {TECH_STACK.map((stack) => (
              <motion.div 
                key={stack.name}
                className="stack-card"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={ITEM_VARIANTS}
              >
                <h3>{stack.name}</h3>
                <ul className="stack-list">
                  {stack.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Habilidades */}
      <section className="skills-section" aria-labelledby="skills-heading">
        <div className="container">
          <h2 id="skills-heading" className="section-title">
            <FaChartLine className="title-icon" aria-hidden="true" />
            <span>Habilidades Atuais</span>
          </h2>
          
          <div className="skills-container">
            {CURRENT_SKILLS.map((skill) => (
              <motion.div 
                key={skill.name}
                className="skill-item"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={ITEM_VARIANTS}
              >
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Futuros Aprendizados */}
      <section className="future-section" aria-labelledby="future-heading">
        <div className="container">
          <h2 id="future-heading" className="section-title">
            <FaBook className="title-icon" aria-hidden="true" />
            <span>Futuros Aprendizados</span>
          </h2>
          
          <div className="future-grid">
            {FUTURE_SKILLS.map((skill) => (
              <motion.div 
                key={skill.name}
                className="future-card"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={ITEM_VARIANTS}
                whileHover={{ scale: 1.03 }}
              >
                <h3>{skill.name}</h3>
                <p>{skill.reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}