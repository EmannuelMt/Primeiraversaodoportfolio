import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const iconHover = {
    scale: 1.1,
    color: "var(--roxo-claro)",
    transition: { duration: 0.2 }
  };

  const linkHover = {
    color: "var(--roxo-claro)",
    x: 5,
    transition: { duration: 0.2 }
  };

  const contactItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
      label: "Email",
      content: "emannuelmatosdeoliveira@gmail.com",
      href: "emannuelmatosdeoliveira@gmail.com"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: "WhatsApp",
      content: "+55 (62) 984317595",
      href: "https://wa.me/5562984317595"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      label: "GitHub",
      content: "github.com/EmannuelMt",
      href: "https://github.com/EmannuelMt"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 2.24a1.77 1.77 0 00-2.5 0L15.36 4.48a1.77 1.77 0 00-.51 1.24v9.92a1.77 1.77 0 001.77 1.77h9.92a1.77 1.77 0 001.24-.51l2.24-2.24a1.77 1.77 0 000-2.5zM11.89 5.23a6.8 6.8 0 016.8 6.8v.38a.75.75 0 01-1.5 0v-.38a5.3 5.3 0 00-5.3-5.3h-.38a.75.75 0 010-1.5z" />
          <path d="M11.89 8.73a3.3 3.3 0 013.3 3.3v.38a.75.75 0 01-1.5 0v-.38a1.8 1.8 0 00-1.8-1.8h-.38a.75.75 0 010-1.5z" />
        </svg>
      ),
      label: "LinkedIn",
      content: "linkedin.com/in/emannuel-matos",
      href: "https://www.linkedin.com/in/emannuel-matos-a98556261/"
    }
  ];

  return (
    <motion.section 
      id="contact" 
      className="contact-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="contact-container">
        <motion.h2 className="section-title" variants={itemVariants}>
          Entre em Contato
        </motion.h2>
        
        <div className="contact-content">
          <motion.div className="contact-info" variants={containerVariants}>
            {contactItems.map((item, index) => (
              <motion.div 
                key={index}
                className="contact-item"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="contact-icon"
                  whileHover={iconHover}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="contact-label">{item.label}</h3>
                  <motion.a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    whileHover={linkHover}
                  >
                    {item.content}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;