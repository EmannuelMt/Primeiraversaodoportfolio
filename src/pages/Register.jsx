import api from "../services/api";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const styles = {
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '3rem',
    backgroundColor: '#ffffff',
    backgroundImage: `
      radial-gradient(at 80% 0%, rgba(224, 231, 255, 1) 0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(245, 158, 11, 0.1) 0px, transparent 50%)
    `,
  },
  registerContainer: {
    width: '100%',
    maxWidth: '500px',
    animation: 'fadeIn 0.6s ease-out',
  },
  registerHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  headerTitle: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
    background: 'linear-gradient(90deg, #4361ee, #f59e0b)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSubtitle: {
    color: '#64748b',
    fontSize: '1.125rem',
  },
  authForm: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '0.75rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  formGroup: {
    marginBottom: '1.5rem',
    position: 'relative',
  },
  formLabel: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#1e293b',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '1.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    zIndex: 2,
  },
  formControl: {
    width: '100%',
    padding: '1rem 1.5rem 1rem calc(1.5rem * 2)',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#f8fafc',
    position: 'relative',
    zIndex: 1,
  },
  formControlFocus: {
    outline: 'none',
    borderColor: '#4361ee',
    boxShadow: '0 0 0 3px rgba(67, 97, 238, 0.2)',
  },
  passwordToggle: {
    position: 'absolute',
    right: '1.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#64748b',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 2,
  },
  passwordToggleHover: {
    color: '#0f172a',
  },
  passwordStrength: {
    marginTop: '1rem',
  },
  passwordStrengthBar: {
    height: '4px',
    backgroundColor: '#e2e8f0',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  passwordStrengthBarInner: {
    height: '100%',
    width: '0%',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  passwordStrengthText: {
    fontSize: '0.75rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  termsCheckbox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    margin: '1.5rem 0',
  },
  termsCheckboxLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    lineHeight: '1.5',
  },
  termsLink: {
    color: '#4361ee',
    fontWeight: '500',
    textDecoration: 'none',
  },
  termsLinkHover: {
    textDecoration: 'underline',
  },
  submitBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4361ee',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  submitBtnHover: {
    backgroundColor: '#3a56d4',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  submitBtnDisabled: {
    backgroundColor: '#64748b',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '1rem',
    height: '1rem',
    border: '2px solid currentColor',
    borderRightColor: 'transparent',
    borderRadius: '9999px',
    animation: 'spin 0.75s linear infinite',
  },
  authDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0',
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  dividerLine: {
    content: '""',
    flex: '1',
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '0 1.5rem',
  },
  socialLogin: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  socialBtnGoogle: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    color: '#0f172a',
  },
  socialBtnGithub: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
  },
  socialBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  authLink: {
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#64748b',
  },
  authLinkAnchor: {
    color: '#4361ee',
    fontWeight: '500',
    textDecoration: 'none',
  },
  authLinkAnchorHover: {
    textDecoration: 'underline',
  },
  authMessage: {
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
  },
  validationMessage: {
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  invalidMessage: {
    color: '#ef4444',
  },
  // Classes para força da senha
  passwordWeak: {
    width: '25%',
    backgroundColor: '#ef4444',
  },
  passwordMedium: {
    width: '50%',
    backgroundColor: '#f59e0b',
  },
  passwordGood: {
    width: '75%',
    backgroundColor: '#f59e0b',
  },
  passwordStrong: {
    width: '100%',
    backgroundColor: '#10b981',
  },
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength++;
      if (/\d/.test(formData.password)) strength++;
      if (/[A-Z]/.test(formData.password)) strength++;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }
    if (!acceptedTerms) {
      newErrors.terms = "Você deve aceitar os termos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setRegisterError("");

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard", { state: { registered: true } });
      }
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 1: return styles.passwordWeak;
      case 2: return styles.passwordMedium;
      case 3: return styles.passwordGood;
      case 4: return styles.passwordStrong;
      default: return { width: '0%', backgroundColor: '#e2e8f0' };
    }
  };

  const getPasswordStrengthLabel = () => {
    switch(passwordStrength) {
      case 1: return "Fraca";
      case 2: return "Moderada";
      case 3: return "Forte";
      case 4: return "Muito forte";
      default: return "";
    }
  };

  return (
    <section style={styles.authContainer}>
      <div style={styles.registerContainer}>
        <div style={styles.registerHeader}>
          <h2 style={styles.headerTitle}>Crie sua conta</h2>
          <p style={styles.headerSubtitle}>Comece sua jornada conosco</p>
        </div>

        {registerError && (
          <div style={{...styles.authMessage, ...styles.errorMessage}}>
            {registerError}
          </div>
        )}

        <form onSubmit={handleRegister} style={styles.authForm}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Nome completo</label>
            <div style={styles.inputWithIcon}>
              <FiUser style={styles.inputIcon} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                style={{
                  ...styles.formControl,
                  ...(errors.name && { borderColor: '#ef4444' })
                }}
              />
            </div>
            {errors.name && (
              <div style={{...styles.validationMessage, ...styles.invalidMessage}}>
                <FiAlertCircle size={14} />
                {errors.name}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>E-mail</label>
            <div style={styles.inputWithIcon}>
              <FiMail style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                style={{
                  ...styles.formControl,
                  ...(errors.email && { borderColor: '#ef4444' })
                }}
              />
            </div>
            {errors.email && (
              <div style={{...styles.validationMessage, ...styles.invalidMessage}}>
                <FiAlertCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Senha</label>
            <div style={styles.inputWithIcon}>
              <FiLock style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crie uma senha segura"
                style={{
                  ...styles.formControl,
                  ...(errors.password && { borderColor: '#ef4444' })
                }}
              />
              <span 
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <div style={styles.passwordStrength}>
              <div style={styles.passwordStrengthBar}>
                <div style={getPasswordStrengthColor()} />
              </div>
              <div style={styles.passwordStrengthText}>
                Força: {getPasswordStrengthLabel()}
                {passwordStrength >= 3 && <FiCheck size={14} />}
              </div>
            </div>
            {errors.password && (
              <div style={{...styles.validationMessage, ...styles.invalidMessage}}>
                <FiAlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Confirme sua senha</label>
            <div style={styles.inputWithIcon}>
              <FiLock style={styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite sua senha novamente"
                style={{
                  ...styles.formControl,
                  ...(errors.confirmPassword && { borderColor: '#ef4444' })
                }}
              />
              <span 
                style={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <div style={{...styles.validationMessage, ...styles.invalidMessage}}>
                <FiAlertCircle size={14} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div style={styles.termsCheckbox}>
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms" style={styles.termsCheckboxLabel}>
              Aceito os <Link to="/terms" style={styles.termsLink}>Termos de Uso</Link>
            </label>
          </div>
          {errors.terms && (
            <div style={{...styles.validationMessage, ...styles.invalidMessage}}>
              <FiAlertCircle size={14} />
              {errors.terms}
            </div>
          )}

          <button 
            type="submit" 
            style={{
              ...styles.submitBtn,
              ...(isSubmitting ? styles.submitBtnDisabled : {}),
              ':hover': !isSubmitting ? styles.submitBtnHover : {}
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span style={styles.loadingSpinner}></span>
                Criando conta...
              </>
            ) : "Cadastrar"}
          </button>

          <div style={styles.authDivider}>
            <div style={styles.dividerLine}></div>
            <span>ou</span>
            <div style={styles.dividerLine}></div>
          </div>

          <div style={styles.socialLogin}>
            <button 
              type="button" 
              style={{
                ...styles.socialBtn,
                ...styles.socialBtnGoogle,
                ':hover': styles.socialBtnHover
              }}
            >
              <FcGoogle size={20} />
              Cadastrar com Google
            </button>
            <button 
              type="button" 
              style={{
                ...styles.socialBtn,
                ...styles.socialBtnGithub,
                ':hover': styles.socialBtnHover
              }}
            >
              <FaGithub size={20} />
              Cadastrar com GitHub
            </button>
          </div>

          <div style={styles.authLink}>
            Já tem uma conta? <Link to="/login" style={styles.authLinkAnchor}>Faça login</Link>
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </section>
  );
}

export default Register;