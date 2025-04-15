import React, { useState, useEffect, useCallback } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { FiSearch, FiPlus, FiX, FiFilter, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Projects.css";

const mockProjects = [
  {
    id: 1,
    title: "Portfólio Pessoal",
    description: "Site para apresentar projetos e habilidades usando React, Node.js e MongoDB com design responsivo e animações modernas.",
    image: "/proj1.png",
    tags: ["React", "CSS3", "Responsivo", "Framer Motion"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Web",
    createdAt: "2023-10-15",
    updatedAt: "2023-11-20"
  },
  // ... (keep your other mock projects data)
];

const categories = ["Todos", "Web", "Backend", "Fullstack", "Mobile"];
const sortOptions = [
  { value: "newest", label: "Mais Recentes" },
  { value: "oldest", label: "Mais Antigos" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" }
];

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState(mockProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const sortProjects = useCallback((projectsToSort, method) => {
    return [...projectsToSort].sort((a, b) => {
      switch (method) {
        case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
        case "az": return a.title.localeCompare(b.title);
        case "za": return b.title.localeCompare(a.title);
        default: return 0;
      }
    });
  }, []);

  const filterProjects = useCallback((term, category, sortMethod) => {
    let filtered = [...projects];
    
    if (term) {
      const searchTerm = term.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (category !== "Todos") {
      filtered = filtered.filter(project => project.category === category);
    }
    
    filtered = sortProjects(filtered, sortMethod);
    setFilteredProjects(filtered);
  }, [projects, sortProjects]);

  useEffect(() => {
    filterProjects(searchTerm, selectedCategory, sortBy);
  }, [searchTerm, selectedCategory, sortBy, filterProjects]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddProject = (newProject) => {
    const updatedProjects = [...projects, {
      ...newProject,
      id: Math.max(...projects.map(p => p.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];
    setProjects(updatedProjects);
    setFilteredProjects(sortProjects(updatedProjects, sortBy));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todos");
    setSortBy("newest");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className="projects-container">
      {/* Navbar Superior */}
      <header className="projects-navbar">
        <div className="navbar-left">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
              aria-label="Buscar projetos"
            />
            {searchTerm && (
              <motion.button 
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </motion.button>
            )}
          </div>
        </div>

        <nav className="navbar-center">
          <ul className="nav-links">
            <li className={`nav-item ${window.location.pathname === "/" ? "active" : ""}`}>
              <a href="/">Início</a>
            </li>
            <li className={`nav-item ${window.location.pathname === "/projects" ? "active" : ""}`}>
              <a href="/projects">Projetos</a>
            </li>
            <li className="nav-item">
              <a href="/contact">Contato</a>
            </li>
          </ul>
        </nav>

        <div className="navbar-right">
          <div className="user-profile">
            <span className="username">PequenoDesenvolvedor</span>
            <div className="user-avatar">
              <FiUser />
            </div>
          </div>
          
          <div className="quick-filters">
            <button 
              className={`filter-btn ${selectedCategory === "Todos" ? "active" : ""}`}
              onClick={() => handleCategoryChange("Todos")}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${sortBy === "newest" ? "active" : ""}`}
              onClick={() => setSortBy("newest")}
            >
              Recentes
            </button>
          </div>

          <motion.button 
            className="add-project-btn"
            onClick={openModal}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus /> Adicionar Projeto
          </motion.button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="projects-content">
        <div className="projects-header">
          <motion.h2 
            className="projects-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meus Projetos
          </motion.h2>
          
          <div className="projects-controls">
            <div className="filter-group">
              <div className="filter-dropdown">
                <FiFilter className="filter-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="category-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="filter-dropdown">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="category-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="loading-projects">
            <div className="loading-spinner"></div>
            <p>Carregando projetos...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div 
            className="projects-grid"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } }}}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  layout
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>Nenhum projeto encontrado {searchTerm && `para "${searchTerm}"`}</p>
            <motion.button 
              className="clear-filters-btn"
              onClick={clearFilters}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Limpar todos os filtros
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal 
            onClose={closeModal} 
            onAddProject={handleAddProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;