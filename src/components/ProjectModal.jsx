import React, { useState } from 'react';
import { FiX, FiLink, FiGithub, FiLock, FiUser } from 'react-icons/fi';

const ProjectModal = ({ onClose, onAddProject }) => {
  // Estado do formulário de projeto
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

  // Estado de autenticação
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Credenciais válidas (em produção, substitua por autenticação real)
  const validCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Handlers de autenticação
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

  // Handlers do formulário de projeto
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>

        {!isAuthenticated ? (
          <div className="auth-container">
            <h2 className="modal-title">Acesso Restrito</h2>
            <form className="modal-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">
                  <FiUser /> Usuário
                </label>
                <input
                  type="text"
                  name="username"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FiLock /> Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="form-input"
                  required
                />
              </div>
              
              {authError && <div className="error-message">{authError}</div>}
              
              <button type="submit" className="modal-submit-btn">
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div className="project-form-container">
            <button onClick={handleLogout} className="logout-btn">
              Sair
            </button>
            <h2 className="modal-title">Adicionar Novo Projeto</h2>
            
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Título do Projeto</label>
                <input
                  type="text"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  className="form-textarea"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">URL da Imagem</label>
                <input
                  type="text"
                  name="image"
                  value={projectForm.image}
                  onChange={handleProjectChange}
                  className="form-input"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Tags</label>
                <div className="tag-input-container">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="form-input tag-input"
                    placeholder="Nova tag"
                  />
                  <button 
                    type="button" 
                    className="add-tag-btn"
                    onClick={handleAddTag}
                  >
                    Adicionar
                  </button>
                </div>
                
                <div className="tags-list">
                  {projectForm.tags.map(tag => (
                    <span key={tag} className="tag-item">
                      {tag}
                      <button 
                        type="button" 
                        className="remove-tag-btn"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select
                  name="category"
                  value={projectForm.category}
                  onChange={handleProjectChange}
                  className="form-select"
                >
                  <option value="Web">Web</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Backend">Backend</option>
                  <option value="Fullstack">Fullstack</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FiGithub /> URL do GitHub
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={projectForm.githubUrl}
                  onChange={handleProjectChange}
                  className="form-input"
                  placeholder="https://github.com/usuario/projeto"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FiLink /> URL ao Vivo
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={projectForm.liveUrl}
                  onChange={handleProjectChange}
                  className="form-input"
                  placeholder="https://meuprojeto.com"
                />
              </div>
              
              <button type="submit" className="modal-submit-btn">
                Adicionar Projeto
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;