import React, { useState, useEffect } from 'react';

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
    setForm({ title: '', description: '', technologies: '', image: '', githubUrl: '', liveDemoUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" />
      <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="Techs (separadas por vírgula)" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="URL da imagem" />
      <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="Link GitHub" />
      <input name="liveDemoUrl" value={form.liveDemoUrl} onChange={handleChange} placeholder="Link Live" />
      <button type="submit">{current ? 'Atualizar' : 'Adicionar'} Projeto</button>
    </form>
  );
}
