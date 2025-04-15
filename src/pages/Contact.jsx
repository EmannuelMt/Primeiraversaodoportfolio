import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import './Contact.css';

export default function Contact() {
  return (
    <main className="contact-page">
      <header className="contact-header">
        <h1 className="contact-title">Entre em Contato</h1>
        <p className="contact-subtitle">Estou sempre aberto a novas oportunidades e colaborações. Envie-me uma mensagem e responderei o mais breve possível.</p>
      </header>

      <section className="contact-container">
        <article className="contact-info">
          <h2 className="contact-info-title"><FaMapMarkerAlt className="icon-spacing" /> Informações de Contato</h2>
          
          <div className="contact-info-item">
            <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
            <div className="contact-details">
              <h3 className="contact-detail-title">Localização</h3>
              <p className="contact-detail-text">São Paulo, Brasil</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <FaPhone className="contact-icon" aria-hidden="true" />
            <div className="contact-details">
              <h3 className="contact-detail-title">Telefone</h3>
              <p className="contact-detail-text">
                <a href="tel:+5511999999999" className="contact-link">+55 11 99999-9999</a>
              </p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <FaEnvelope className="contact-icon" aria-hidden="true" />
            <div className="contact-details">
              <h3 className="contact-detail-title">Email</h3>
              <p className="contact-detail-text">
                <a href="mailto:contato@exemplo.com" className="contact-link">contato@exemplo.com</a>
              </p>
            </div>
          </div>

          <div className="social-links">
            <h3 className="social-links-title">Redes Sociais</h3>
            <div className="social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedin className="social-icon" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <FaGithub className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <FaTwitter className="social-icon" />
              </a>
            </div>
          </div>
        </article>

        <form className="contact-form" name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="form-group">
            <label htmlFor="name" className="form-label required">
              Nome
              <span className="sr-only"> (obrigatório)</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name"
              className="form-control" 
              required 
              placeholder="Seu nome completo"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label required">
              Email
              <span className="sr-only"> (obrigatório)</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="form-control" 
              required 
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject" className="form-label">Assunto</label>
            <input 
              type="text" 
              id="subject" 
              name="subject"
              className="form-control" 
              placeholder="Sobre o que deseja falar?"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label required">
              Mensagem
              <span className="sr-only"> (obrigatório)</span>
            </label>
            <textarea 
              id="message" 
              name="message"
              className="form-control" 
              required
              rows="6"
              placeholder="Escreva sua mensagem aqui..."
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            <FaPaperPlane className="btn-icon" /> Enviar Mensagem
          </button>
        </form>
      </section>

      <section className="contact-map" aria-label="Mapa de localização">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975844558826!2d-46.65867598502231!3d-23.561346184682936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1633023226781!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="450"
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Mapa de Localização"
          aria-hidden="true"
        ></iframe>
      </section>
    </main>
  );
}