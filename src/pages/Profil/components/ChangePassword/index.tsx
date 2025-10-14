import { useState } from "react";
import { useToast } from "../../../../hooks/useToast";
import { changePassword } from "../../../../api/profilPageApi";
import PasswordStrengthIndicator from "../../../../components/PasswordStrengthIndicator/PasswordStrengthIndicator";
import { validatePassword } from "../../../../utils/passwordValidation";
import './style.css';

const ChangePassword = () => {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Le mot de passe actuel est requis";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Le nouveau mot de passe est requis";
      isValid = false;
    } else {
      const passwordValidation = validatePassword(formData.newPassword);
      if (!passwordValidation.isValid) {
        newErrors.newPassword = passwordValidation.errors[0] || "Mot de passe trop faible";
        isValid = false;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "Le nouveau mot de passe doit être différent de l'ancien";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      showSuccess("Mot de passe modifié avec succès !");
      
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrors({
          ...errors,
          currentPassword: "Mot de passe actuel incorrect",
        });
        showError("Mot de passe actuel incorrect");
      } else {
        showError("Erreur lors du changement de mot de passe");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password">
      <h2>Changer le mot de passe</h2>

      <div className="password-info">
        <p>
          <strong>Conseil de sécurité :</strong> Utilisez un mot de passe fort contenant
          au moins 8 caractères, avec des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">
            Mot de passe actuel <span className="required">*</span>
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={errors.currentPassword ? 'error' : ''}
            placeholder="Entrez votre mot de passe actuel"
          />
          {errors.currentPassword && (
            <span className="error-message">{errors.currentPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">
            Nouveau mot de passe <span className="required">*</span>
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={errors.newPassword ? 'error' : ''}
            placeholder="Entrez votre nouveau mot de passe"
          />
          {errors.newPassword && (
            <span className="error-message">{errors.newPassword}</span>
          )}
          <PasswordStrengthIndicator 
            password={formData.newPassword} 
            showRequirements={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirmer le nouveau mot de passe <span className="required">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Confirmez votre nouveau mot de passe"
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? "Modification..." : "🔐 Changer le mot de passe"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
