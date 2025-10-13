import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../../components/Toast";
import ProfileInfo from "./components/ProfileInfo";
import ProfileStats from "./components/ProfileStats";
import ChangePassword from "./components/ChangePassword";
import './style.css';

const ProfilPage = () => {
  const { user } = useAuth();
  const { toast, hideToast } = useToast();
  const [activeTab, setActiveTab] = useState<'info' | 'stats' | 'password'>('info');

  if (!user) {
    return (
      <div className="profil-page">
        <div className="profil-loading">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="profil-page">
      <div className="profil-container">
        <div className="profil-header">
          <div className="profil-avatar">
            <div className="avatar-circle">
              {user.firstName[0]}{user.lastName[0]}
            </div>
          </div>
          <div className="profil-header-info">
            <h1 className="profil-name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="profil-email">{user.email}</p>
            <span className="profil-role">{user.role}</span>
          </div>
        </div>

        <div className="profil-tabs">
          <button
            className={`profil-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            📋 Informations
          </button>
          <button
            className={`profil-tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Statistiques
          </button>
          <button
            className={`profil-tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            🔐 Sécurité
          </button>
        </div>

        <div className="profil-content">
          {activeTab === 'info' && <ProfileInfo user={user} />}
          {activeTab === 'stats' && <ProfileStats userId={user.id} />}
          {activeTab === 'password' && <ChangePassword />}
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

export default ProfilPage;
