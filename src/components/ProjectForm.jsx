import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "../styles/ProjectModal.css";
export default function ProjectForm({ onSubmit, current }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    githubUrl: '',
    liveDemoUrl: '',
  });

  useEffect(() => {
    if (current) {
      setForm(current);
    }
  }, [current]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const techs = form.technologies.split(',').map(t => t.trim());
    onSubmit({ ...form, technologies: techs });
    if (!current) {
      setForm({ title: '', description: '', technologies: '', image: '', githubUrl: '', liveDemoUrl: '' });
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const inputHover = {
    borderColor: "var(--roxo-2)",
    boxShadow: "0 0 0 2px rgba(123, 44, 191, 0.2)"
  };

  const buttonHover = {
    backgroundColor: "var(--roxo-3)",
    y: -2
  };

  const buttonTap = {
    scale: 0.98
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="project-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.input 
        name="title" 
        value={form.title} 
        onChange={handleChange} 
        placeholder="Título" 
        required
        whileFocus={inputHover}
      />
      
      <motion.textarea 
        name="description" 
        value={form.description} 
        onChange={handleChange} 
        placeholder="Descrição"
        whileFocus={inputHover}
      />
      
      <motion.input 
        name="technologies" 
        value={form.technologies} 
        onChange={handleChange} 
        placeholder="Techs (separadas por vírgula)"
        whileFocus={inputHover}
      />
      
      <motion.input 
        name="image" 
        value={form.image} 
        onChange={handleChange} 
        placeholder="URL da imagem"
        whileFocus={inputHover}
      />
      
      <motion.input 
        name="githubUrl" 
        value={form.githubUrl} 
        onChange={handleChange} 
        placeholder="Link GitHub"
        whileFocus={inputHover}
      />
      
      <motion.input 
        name="liveDemoUrl" 
        value={form.liveDemoUrl} 
        onChange={handleChange} 
        placeholder="Link Live"
        whileFocus={inputHover}
      />
      
      <motion.button 
        type="submit"
        whileHover={buttonHover}
        whileTap={buttonTap}
      >
        {current ? 'Atualizar' : 'Adicionar'} Projeto
      </motion.button>
    </motion.form>
  );
}