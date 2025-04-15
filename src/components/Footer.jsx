import { Link } from "react-router-dom";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, 
  FaCode, FaPaintBrush, FaUserLock, FaRocket 
} from "react-icons/fa";
import { RiFlutterFill } from "react-icons/ri";
import { motion } from "framer-motion";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navigationLinks = [
    { path: "/", label: "Início", icon: <FaPaintBrush />, delay: 0.1 },
    { path: "/projects", label: "Projetos", icon: <FaCode />, delay: 0.2 },
    { path: "/contact", label: "Contato", icon: <FaEnvelope />, delay: 0.3 },
    { path: "/login", label: "Área Restrita", icon: <FaUserLock />, delay: 0.4 }
  ];

  const socialLinks = [
    { 
      url: "https://github.com/seuusuario", 
      icon: <FaGithub className="social-icon" />, 
      label: "GitHub",
      color: "#6e5494"
    },
    { 
      url: "https://linkedin.com/in/seuusuario", 
      icon: <FaLinkedin className="social-icon" />, 
      label: "LinkedIn",
      color: "#0077b5"
    }
  ];

  const techStack = [
    { icon: <RiFlutterFill />, name: "Flutter", delay: 0.2 },
    { icon: <FaRocket />, name: "React", delay: 0.4 }
  ];

  const contactInfo = [
    { 
      icon: <FaEnvelope className="contact-icon" />, 
      text: "contato@meuportfolio.com",
      delay: 0.1
    },
    { 
      icon: <FaMapMarkerAlt className="contact-icon" />, 
      text: "São Paulo, Brasil",
      delay: 0.3
    }
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer 
      className="footer-ultra"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerVariants}
    >
      <div className="footer-liquid-effect"></div>
      
      <div className="footer-container">
        {/* Coluna Sobre */}
        <motion.div className="footer-section" variants={itemVariants}>
          <div className="footer-logo">
            <span className="logo-gradient">Dev</span>
            <span className="logo-white">Lux</span>
            <div className="logo-badge">PRO</div>
          </div>
          <p className="footer-description">
            Crafting digital excellence with cutting-edge design and 
            flawless code execution since 2018.
          </p>
          
          <div className="tech-stack">
            <h4 className="stack-title">Tech Stack</h4>
            <div className="stack-items">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={index}
                  className="stack-item"
                  variants={itemVariants}
                  custom={tech.delay}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stack-icon">{tech.icon}</span>
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Coluna Links */}
        <motion.div className="footer-section" variants={itemVariants}>
          <h4 className="footer-title">
            <span className="title-underline">Navegação</span>
          </h4>
          <ul className="footer-links">
            {navigationLinks.map((link, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                custom={link.delay}
                whileHover={{ x: 5 }}
              >
                <Link 
                  to={link.path} 
                  className="footer-link"
                  aria-label={`Ir para ${link.label}`}
                >
                  <span className="link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                  <span className="link-hover"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Coluna Contato */}
        <motion.div className="footer-section" variants={itemVariants}>
          <h4 className="footer-title">
            <span className="title-underline">Contato</span>
          </h4>
          <ul className="contact-list">
            {contactInfo.map((item, index) => (
              <motion.li 
                key={index}
                className="contact-item"
                variants={itemVariants}
                custom={item.delay}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
          
          <div className="social-container">
            <h4 className="footer-title">
              <span className="title-underline">Redes Sociais</span>
            </h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                  aria-label={`Visitar perfil no ${social.label}`}
                  variants={itemVariants}
                  custom={index * 0.2}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="social-text">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="footer-border"></div>
        <p className="copyright">
          &copy; {currentYear} <span className="highlight">DevLux</span>. Todos os direitos reservados.
          <span className="watermark">v3.1.0</span>
        </p>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;