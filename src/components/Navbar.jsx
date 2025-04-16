import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaProjectDiagram, 
  FaEnvelope, 
  FaSignInAlt,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const navLinks = [
    { path: "/", label: "Início", icon: <FaHome /> },
    { path: "/experience", label: "Experiência", icon: <FaBriefcase /> },
    { path: "/education", label: "Educação", icon: <FaGraduationCap /> },
    { path: "/projects", label: "Projetos", icon: <FaProjectDiagram /> },
    { path: "/skills", label: "Habilidades", icon: <FaLaptopCode /> },
    { path: "/contact", label: "Contato", icon: <FaEnvelope /> },
    { path: "/login", label: "Login", icon: <FaSignInAlt /> }
  ];

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 150
      }
    }),
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.header 
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="navbar-glass-effect"></div>
      
      <div className="navbar-container">
        <motion.div 
          className="logo-wrapper"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <Link to="/" className="logo">
            <FaCode className="logo-icon" />
            <span className="logo-text">Little</span>
            <span className="logo-highlight">Dev</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="nav-menu">
          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.path}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-text">{link.label}</span>
                  <AnimatePresence>
                    {location.pathname === link.path && (
                      <motion.span 
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${mobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.ul
              className="mobile-nav-links"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={`mobile-${link.path}`}
                  variants={navItemVariants}
                  custom={index}
                >
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${location.pathname === link.path ? "active" : ""}`}
                    onClick={toggleMobileMenu}
                  >
                    <span className="mobile-nav-icon">{link.icon}</span>
                    <span className="mobile-nav-text">{link.label}</span>
                    {location.pathname === link.path && (
                      <motion.span 
                        className="mobile-active-indicator"
                        layoutId="mobileActiveIndicator"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="navbar-bottom-border"></div>
    </motion.header>
  );
}

export default Navbar;