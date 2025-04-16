import React from 'react';
import './Education.css';

function Education() {
  const academicEducation = [
    {
      institution: "Faculdade XYZ",
      degree: "Bacharelado em Ciência da Computação",
      period: "2018 - 2022",
      description: "Formação com ênfase em desenvolvimento de software e arquitetura de sistemas.",
      honors: "Magna Cum Laude (GPA 3.8/4.0)"
    },
    {
      institution: "Escola Técnica ABC",
      degree: "Técnico em Informática",
      period: "2016 - 2017",
      description: "Curso profissionalizante com foco em programação e redes de computadores."
    }
  ];

  const courses = [
    {
      title: "Desenvolvimento Web Full Stack",
      institution: "Digital Innovation One",
      period: "2023 - 120 horas",
      certificate: true
    },
    {
      title: "React Avançado com TypeScript",
      institution: "Alura",
      period: "2022 - 40 horas",
      certificate: true
    },
    {
      title: "UX/UI Design Fundamentals",
      institution: "Coursera",
      period: "2021 - 60 horas",
      certificate: true
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        {/* Seção de Formação Acadêmica */}
        <div className="education-block">
          <h2 className="section-title">Formação Acadêmica</h2>
          <div className="timeline">
            {academicEducation.map((edu, index) => (
              <div key={`academic-${index}`} className="timeline-item">
                <div className="timeline-marker academic"></div>
                <div className="timeline-content">
                  <h3 className="institution">{edu.institution}</h3>
                  <p className="degree">{edu.degree}</p>
                  <span className="period">{edu.period}</span>
                  <p className="description">{edu.description}</p>
                  {edu.honors && <div className="honors-badge">{edu.honors}</div>}
                </div>
              </div>
            ))}
            <div className="timeline-connector"></div>
          </div>
        </div>

        {/* Seção de Cursos Complementares */}
        <div className="education-block">
          <h2 className="section-title">Cursos & Certificações</h2>
          <div className="courses-grid">
            {courses.map((course, index) => (
              <div key={`course-${index}`} className="course-card">
                <div className="course-header">
                  <h3 className="course-title">{course.title}</h3>
                  {course.certificate && (
                    <span className="certificate-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
                      </svg>
                      Certificado
                    </span>
                  )}
                </div>
                <p className="course-institution">{course.institution}</p>
                <span className="course-period">{course.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;