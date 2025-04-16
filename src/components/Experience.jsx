import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Experience.css';

const experienceData = [
  {
    id: 1,
    company: "Empresa A",
    position: "Desenvolvedor Front-end Sênior",
    period: "2021 - Presente",
    location: "São Paulo, SP",
    description: "Desenvolvimento de aplicações web modernas utilizando React.js, TypeScript e Next.js. Liderança técnica de equipe de 5 desenvolvedores.",
    responsibilities: [
      "Arquitetura e implementação de sistemas front-end",
      "Otimização de performance (redução de 40% no tempo de carregamento)",
      "Mentoria de desenvolvedores júniores",
      "Integração com APIs REST e GraphQL"
    ],
    technologies: ["React", "TypeScript", "Next.js", "Redux", "Styled Components"]
  },
  {
    id: 2,
    company: "Empresa B",
    position: "Desenvolvedor Front-end Pleno",
    period: "2019 - 2021",
    location: "Remoto",
    description: "Desenvolvimento de interfaces de usuário para plataforma SaaS de e-commerce.",
    responsibilities: [
      "Implementação de novos features usando React",
      "Refatoração de código legado",
      "Testes unitários e de integração",
      "Trabalho em equipe ágil (Scrum)"
    ],
    technologies: ["React", "JavaScript", "CSS Modules", "Jest"]
  },
  {
    id: 3,
    company: "Empresa C",
    position: "Desenvolvedor Front-end Júnior",
    period: "2017 - 2019",
    location: "Rio de Janeiro, RJ",
    description: "Primeira experiência profissional como desenvolvedor front-end.",
    responsibilities: [
      "Manutenção de sites corporativos",
      "Implementação de designs responsivos",
      "Integração com back-end PHP"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery"]
  }
];

function Experience() {
  return (
    <section className="experience-section">
      <div className="container">
        <h2 className="section-title">
          <FaBriefcase className="section-icon" />
          Experiência Profissional
        </h2>
        
        <div className="timeline">
          {experienceData.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-content">
                <div className="experience-header">
                  <h3 className="company-name">{exp.company}</h3>
                  <span className="position">{exp.position}</span>
                </div>
                
                <div className="experience-meta">
                  <span className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    {exp.period}
                  </span>
                  <span className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    {exp.location}
                  </span>
                </div>
                
                <p className="experience-description">{exp.description}</p>
                
                <div className="responsibilities">
                  <h4>Principais Responsabilidades:</h4>
                  <ul>
                    {exp.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="technologies">
                  <h4>Tecnologias Utilizadas:</h4>
                  <div className="tech-tags">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;