import React, { useState } from 'react';
import { FiX, FiLink, FiGithub, FiLock, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/ProjectModal.css";
const ProjectModal = ({ onClose, onAddProject }) => {
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    githubUrl: '',
    liveUrl: '',
    category: 'Web'
  });
  const [newTag, setNewTag] = useState('');

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const validCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, y: 20 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
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

  const tagHover = {
    scale: 1.05,
    backgroundColor: "var(--roxo-3)"
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === validCredentials.username && 
        loginForm.password === validCredentials.password) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Credenciais inválidas');
      setLoginForm(prev => ({ ...prev, password: '' }));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !projectForm.tags.includes(newTag.trim())) {
      setProjectForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProjectForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject({
      ...projectForm,
      id: Date.now()
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button 
            className="modal-close-btn" 
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>

          {!isAuthenticated ? (
            <div className="auth-container">
              <h2 className="modal-title">Acesso Restrito</h2>
              <form className="modal-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">
                    <FiUser /> Usuário
                  </label>
                  <motion.input
                    type="text"
                    name="username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
                    className="form-input"
                    required
                    whileFocus={inputHover}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <FiLock /> Senha
                  </label>
                  <motion.input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    className="form-input"
                    required
                    whileFocus={inputHover}
                  />
                </div>
                
                {authError && (
                  <motion.div 
                    className="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {authError}
                  </motion.div>
                )}
                
                <motion.button 
                  type="submit" 
                  className="modal-submit-btn"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  Entrar
                </motion.button>
              </form>
            </div>
          ) : (
            <div className="project-form-container">
              <motion.button 
                onClick={handleLogout} 
                className="logout-btn"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Sair
              </motion.button>
              <h2 className="modal-title">Adicionar Novo Projeto</h2>
              
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Título do Projeto</label>
                  <motion.input
                    type="text"
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectChange}
                    className="form-input"
                    required
                    whileFocus={inputHover}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Descrição</label>
                  <motion.textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectChange}
                    className="form-textarea"
                    required
                    whileFocus={inputHover}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">URL da Imagem</label>
                  <motion.input
                    type="text"
                    name="image"
                    value={projectForm.image}
                    onChange={handleProjectChange}
                    className="form-input"
                    placeholder="https://exemplo.com/imagem.jpg"
                    whileFocus={inputHover}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Tags</label>
                  <div className="tag-input-container">
                    <motion.input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="form-input tag-input"
                      placeholder="Nova tag"
                      whileFocus={inputHover}
                    />
                    <motion.button 
                      type="button" 
                      className="add-tag-btn"
                      onClick={handleAddTag}
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      Adicionar
                    </motion.button>
                  </div>
                  
                  <div className="tags-list">
                    {projectForm.tags.map(tag => (
                      <motion.span 
                        key={tag} 
                        className="tag-item"
                        whileHover={tagHover}
                        layout
                      >
                        {tag}
                        <motion.button 
                          type="button" 
                          className="remove-tag-btn"
                          onClick={() => handleRemoveTag(tag)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiX size={12} />
                        </motion.button>
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Categoria</label>
                  <motion.select
                    name="category"
                    value={projectForm.category}
                    onChange={handleProjectChange}
                    className="form-select"
                    whileFocus={inputHover}
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Backend">Backend</option>
                    <option value="Fullstack">Fullstack</option>
                  </motion.select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <FiGithub /> URL do GitHub
                  </label>
                  <motion.input
                    type="url"
                    name="githubUrl"
                    value={projectForm.githubUrl}
                    onChange={handleProjectChange}
                    className="form-input"
                    placeholder="https://github.com/usuario/projeto"
                    whileFocus={inputHover}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <FiLink /> URL ao Vivo
                  </label>
                  <motion.input
                    type="url"
                    name="liveUrl"
                    value={projectForm.liveUrl}
                    onChange={handleProjectChange}
                    className="form-input"
                    placeholder="https://meuprojeto.com"
                    whileFocus={inputHover}
                  />
                </div>
                
                <motion.button 
                  type="submit" 
                  className="modal-submit-btn"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  Adicionar Projeto
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;