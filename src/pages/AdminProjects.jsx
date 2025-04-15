import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data);
  };

  const createOrUpdateProject = async (data) => {
    if (editing) {
      await api.put(`/projects/${editing._id}`, data);
      setEditing(null);
    } else {
      await api.post('/projects', data);
    }
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  const editProject = (project) => {
    setEditing(project);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Painel de Projetos</h1>
      <ProjectForm onSubmit={createOrUpdateProject} current={editing} />
      <hr />
      {projects.map(p => (
        <ProjectCard
          key={p._id}
          project={p}
          onEdit={editProject}
          onDelete={deleteProject}
        />
      ))}
    </div>
  );
}
