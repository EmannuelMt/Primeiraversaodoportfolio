import { Link } from "react-router-dom";
import {
  FaCode,
  FaArrowRight,
  FaTools,
  FaBook,
  FaChartLine
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Home.css";

// Dados dos projetos em destaque
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

// Habilidades atuais
const CURRENT_SKILLS = [
  { name: "React", level: 30 },
  { name: "JavaScript", level: 65 },
  { name: "HTML", level: 50 },
  { name: "CSS", level: 50 }
];

// Futuros aprendizados
const FUTURE_SKILLS = [
  { name: "Rust", reason: "Para desenvolvimento de sistemas performáticos" },
  { name: "WebAssembly", reason: "Para aplicações web de alto desempenho" },
  { name: "Kubernetes", reason: "Para orquestração de containers em escala" },
  { name: "Blockchain", reason: "Para entender tecnologias descentralizadas" }
];

// Stack tecnológico
const TECH_STACK = [
  { name: "Frontend", tools: ["React", "Next.js", "TailwindCSS", "Framer Motion"] },
  { name: "Backend", tools: ["Node.js", "Express", "NestJS", "GraphQL"] },
  { name: "Banco de Dados", tools: ["MongoDB", "PostgreSQL", "Redis"] },
  { name: "DevOps", tools: ["Docker", "AWS", "GitHub Actions"] }
];

// Configurações de animação
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
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8
    }
  },
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400 }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  },
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(123, 44, 191, 0.3)"
  }
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 }
  }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="home-page">
      {/* Seção Hero */}
      <motion.section
        className="highlight-section"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="highlight-bg"></div>

        <div className="container">
          <motion.div 
            className="highlight-content"
            variants={containerVariants}
          >
            <motion.figure
              className="highlight-img-container"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
            >
              <picture>
                <source srcSet="/assets/emmannuel.webp" type="image/webp" />
                <img
                  src="/assets/emmannuel.jpg"
                  alt="Retrato de Emannuel"
                  className="highlight-img"
                  width={350}
                  height={350}
                  loading="lazy"
                />
              </picture>
            </motion.figure>

            <motion.div 
              className="highlight-text"
              variants={containerVariants}
            >
              <motion.h1 variants={textVariants}>
                <motion.span 
                  className="greeting"
                  variants={textVariants}
                >
                  Oi, eu sou
                </motion.span>
                <motion.span 
                  className="name-highlight"
                  variants={textVariants}
                  animate={{
                    textShadow: ["0 0 10px rgba(157, 78, 221, 0.3)", "0 0 15px rgba(157, 78, 221, 0.7)", "0 0 10px rgba(157, 78, 221, 0.3)"],
                    transition: { 
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut"
                    }
                  }}
                >
                  Emannuel
                </motion.span>
              </motion.h1>

              <motion.p 
                className="highlight-description"
                variants={textVariants}
                transition={{ delay: 0.2 }}
              >
                Prazer, me chamo Emannuel. Tenho 20 anos e sou uma mistura de extrovertido com introvertido.
                Atualmente trabalho como auxiliar de produção na área industrial, setor onde ganhei bastante experiência ao longo do tempo. Já atuei em outras áreas, mas foi na indústria que fiquei por mais tempo.

                Agora estou em transição para a área de desenvolvimento web, onde venho estudando e construindo projetos próprios. Tenho planos de cursar Engenharia de Software e me aprofundar ainda mais nesse universo da tecnologia.

                Neste portfólio, você vai encontrar minhas experiências profissionais e alguns dos projetos de programação que desenvolvi até agora.
              </motion.p>

              <motion.div 
                className="highlight-actions"
                variants={containerVariants}
              >
                <Link
                  to="/projects"
                  className="cta-button primary"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(123, 44, 191, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Ver meus projetos</span>
                  <motion.span
                    animate={{ 
                      x: [0, 5, 0],
                      transition: { 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
                <Link
                  to="/contact"
                  className="cta-button secondary"
                  whileHover={{ 
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Contato direto</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Seção de Projetos */}
      <motion.section
        className="featured-projects"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            <motion.span
              animate={{ 
                rotate: [0, 360],
                transition: { 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }
              }}
            >
              <FaCode />
            </motion.span>
            <span>Projetos em Destaque</span>
          </motion.h2>

          <motion.div 
            className="card-grid"
            variants={containerVariants}
          >
            {FEATURED_PROJECTS.map((project) => (
              <motion.article
                key={project.id}
                className="project-card"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <motion.div 
                  className="tech-tags"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {project.technologies.map((tech) => (
                    <motion.span 
                      key={tech} 
                      className="tech-tag"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <Link
                  to={project.link}
                  className="card-btn"
                  whileHover={{ 
                    backgroundColor: "var(--roxo-3)"
                  }}
                >
                  <span>Ver detalhes</span>
                  <motion.span
                    animate={{ 
                      x: [0, 5, 0],
                      transition: { 
                        repeat: Infinity, 
                        duration: 1.5 
                      }
                    }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Seção de Tecnologias */}
      <motion.section
        className="tech-stack-section"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { 
                  repeat: Infinity, 
                  duration: 3 
                }
              }}
            >
              <FaTools />
            </motion.span>
            <span>Tecnologias Utilizadas</span>
          </motion.h2>

          <motion.div 
            className="stack-grid"
            variants={containerVariants}
          >
            {TECH_STACK.map((stack) => (
              <motion.div
                key={stack.name}
                className="stack-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 15px 30px rgba(123, 44, 191, 0.3)"
                }}
              >
                <motion.h3
                  whileHover={{ color: "var(--roxo-3)" }}
                >
                  {stack.name}
                </motion.h3>
                <motion.ul 
                  className="stack-list"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {stack.tools.map((tool) => (
                    <motion.li 
                      key={tool}
                      whileHover={{ 
                        scale: 1.05,
                        color: "var(--roxo-3)"
                      }}
                    >
                      {tool}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Seção de Habilidades */}
      <motion.section
        className="skills-section"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            <motion.span
              animate={{ 
                rotate: [0, 360],
                transition: { 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "linear" 
                }
              }}
            >
              <FaChartLine />
            </motion.span>
            <span>Habilidades Atuais</span>
          </motion.h2>

          <motion.div 
            className="skills-container"
            variants={containerVariants}
          >
            {CURRENT_SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="skill-header">
                  <motion.span
                    whileHover={{ color: "var(--roxo-3)" }}
                  >
                    {skill.name}
                  </motion.span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${skill.level}%`,
                      transition: { duration: 1.5 }
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Seção de Futuros Aprendizados */}
      <motion.section
        className="future-section"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            <motion.span
              animate={{ 
                y: [0, -5, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 3 
                }
              }}
            >
              <FaBook />
            </motion.span>
            <span>Futuros Aprendizados</span>
          </motion.h2>

          <motion.div 
            className="future-grid"
            variants={containerVariants}
          >
            {FUTURE_SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                className="future-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(123, 44, 191, 0.3)"
                }}
              >
                <motion.h3
                  whileHover={{ color: "var(--roxo-3)" }}
                >
                  {skill.name}
                </motion.h3>
                <motion.p
                  whileHover={{ scale: 1.02 }}
                >
                  {skill.reason}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}