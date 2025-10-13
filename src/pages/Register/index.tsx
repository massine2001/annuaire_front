import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../../components/Toast';
import './style.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast, showError, hideToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      showError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (error: any) {
      const message = error.response?.data || 'Erreur lors de l\'inscription';
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">✨ Inscription</h1>
          <p className="register-subtitle">Créez votre compte</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <input
                type="text"
                className="form-input"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Jean"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nom</label>
              <input
                type="text"
                className="form-input"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Dupont"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="votre@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
              minLength={6}
              disabled={loading}
            />
            <span className="form-helper">Au moins 6 caractères</span>
          </div>

          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Création du compte...
              </>
            ) : (
              'Créer mon compte'
            )}
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            Déjà un compte ?{' '}
            <Link to="/login" className="footer-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default RegisterPage;
