import React, { useState, useEffect, useCallback } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { FiSearch, FiPlus, FiX, FiFilter } from "react-icons/fi";
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
  {
    id: 2,
    title: "E-commerce API",
    description: "API RESTful para sistema e-commerce com Node.js, Express e MongoDB, incluindo autenticação JWT e pagamentos.",
    image: "/proj2.png",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Backend",
    createdAt: "2023-09-10",
    updatedAt: "2023-10-05"
  },
  {
    id: 3,
    title: "Task Manager App",
    description: "Aplicativo mobile para gerenciamento de tarefas com React Native e Firebase para sincronização em tempo real.",
    image: "/proj3.png",
    tags: ["React Native", "Firebase", "Mobile"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Mobile",
    createdAt: "2023-08-22",
    updatedAt: "2023-09-15"
  },
  {
    id: 4,
    title: "Blog Fullstack",
    description: "Blog completo com frontend em React e backend em Node.js, com sistema de comentários e autenticação.",
    image: "/proj4.png",
    tags: ["React", "Node.js", "MongoDB", "Fullstack"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Fullstack",
    createdAt: "2023-07-18",
    updatedAt: "2023-08-30"
  }
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
    }),
    hover: {
      y: -5,
      boxShadow: "var(--sombra-roxo)",
      transition: { duration: 0.3 }
    }
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="projects-container">
      {/* Controls Section */}
      <motion.div 
        className="projects-controls"
        initial="hidden"
        animate="visible"
        variants={controlsVariants}
      >
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

          <motion.button 
            className="add-project-btn"
            onClick={openModal}
            whileHover={{ y: -2, backgroundColor: "var(--roxo-3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus /> Adicionar Projeto
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="projects-content">
        <motion.h2 
          className="projects-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Meus Projetos
        </motion.h2>
        
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
                  whileHover="hover"
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
              whileHover={{ y: -2, backgroundColor: "var(--roxo-3)" }}
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