import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../../components/Toast';
import './style.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast, showError, hideToast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      navigate('/');
    } catch (error: any) {
      const message = error.response?.data || 'Erreur de connexion';
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">🔐 Connexion</h1>
          <p className="login-subtitle">Connectez-vous à votre espace</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="votre@email.com"
              required
              autoFocus
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Pas encore de compte ?{' '}
            <Link to="/register" className="footer-link">
              S'inscrire
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

export default LoginPage;
