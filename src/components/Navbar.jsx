import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaProjectDiagram,
  FaEnvelope,
  FaSignInAlt,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navbarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Configurações de animação 3D
  const containerVariants = {
    hidden: { opacity: 0, rotateX: -90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0, rotateX: -45 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      z: 20,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98, z: 10 }
  };

  const mobileItemVariants = {
    hidden: { x: -30, opacity: 0, rotateY: -45 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.02,
      z: 10
    }
  };

  const logoVariants = {
    normal: { rotateY: 0 },
    hover: { rotateY: 20, scale: 1.05 },
    tap: { rotateY: 0, scale: 0.95 }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Início", icon: <FaHome /> },
    { path: "/experience", label: "Experiência", icon: <FaBriefcase /> },
    { path: "/education", label: "Educação", icon: <FaGraduationCap /> },
    { path: "/projects", label: "Projetos", icon: <FaProjectDiagram /> },
    { path: "/skills", label: "Habilidades", icon: <FaLaptopCode /> },
    { path: "/contact", label: "Contato", icon: <FaEnvelope /> },
    { path: "/login", label: "Login", icon: <FaSignInAlt /> }
  ];

  return (
    <>
      <div className="navbar-spacer" />
      
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef}>
        <div className="navbar-container">
          <motion.div
            variants={logoVariants}
            initial="normal"
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
              <motion.div
                animate={{ rotateY: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaCode className="logo-icon" />
              </motion.div>
              <motion.span 
                className="logo-text"
                initial={{ x: 0 }}
                animate={{ x: isOpen ? 10 : 0 }}
              >Little</motion.span>
              <motion.span 
                className="logo-highlight"
                initial={{ x: 0 }}
                animate={{ x: isOpen ? -10 : 0 }}
              >Dev</motion.span>
            </Link>
          </motion.div>

          <nav className="desktop-nav">
            <motion.ul
              className="desktop-links"
              variants={containerVariants}
              initial="visible"
              animate="visible"
              style={{ perspective: "1000px" }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredItem(link.path)}
                  onHoverEnd={() => setHoveredItem(null)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link to={link.path} className="nav-link">
                    <motion.span
                      className="nav-icon"
                      animate={{
                        color: hoveredItem === link.path || location.pathname === link.path 
                          ? 'var(--roxo-3)' 
                          : 'var(--branco)',
                        transform: hoveredItem === link.path ? 'translateZ(10px)' : 'translateZ(0)'
                      }}
                    >
                      {link.icon}
                    </motion.span>
                    <motion.span 
                      className="nav-label"
                      animate={{
                        transform: hoveredItem === link.path ? 'translateZ(15px)' : 'translateZ(0)'
                      }}
                    >
                      {link.label}
                    </motion.span>
                    {location.pathname === link.path && (
                      <motion.span 
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        animate={{ 
                          width: hoveredItem === link.path ? '100%' : '6px',
                          transform: hoveredItem === link.path ? 'translateZ(5px)' : 'translateZ(0)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: 'var(--roxo-3)',
              rotateY: 20
            }}
            whileTap={{ scale: 0.95, rotateY: 0 }}
            animate={{
              backgroundColor: isOpen ? 'var(--roxo-3)' : 'var(--roxo-2)',
              rotateY: isOpen ? 180 : 0
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>

          <AnimatePresence>
            {isOpen && isMobile && (
              <>
                <motion.nav
                  className="mobile-nav"
                  initial={{ opacity: 0, y: -50, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 45 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    transformOrigin: "top center"
                  }}
                >
                  <motion.ul
                    className="mobile-links"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.path}
                        className={`mobile-item ${location.pathname === link.path ? 'active' : ''}`}
                        variants={mobileItemVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        custom={index}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Link
                          to={link.path}
                          className="mobile-link"
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.span 
                            className="mobile-icon"
                            animate={{
                              transform: 'translateZ(10px)'
                            }}
                          >
                            {link.icon}
                          </motion.span>
                          <motion.span 
                            className="mobile-label"
                            animate={{
                              transform: 'translateZ(15px)'
                            }}
                          >
                            {link.label}
                          </motion.span>
                          {location.pathname === link.path && (
                            <motion.span 
                              className="active-indicator"
                              layoutId="mobileActiveIndicator"
                              initial={false}
                              animate={{ 
                                width: '100%',
                                backgroundColor: 'var(--roxo-3)',
                                transform: 'translateZ(5px)'
                              }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.nav>

                <motion.div
                  className="mobile-overlay"
                  onClick={toggleMenu}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

export default Navbar;