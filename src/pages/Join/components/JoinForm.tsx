import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

type Props = {
  poolName: string;
  email: string;
  onSubmit: (data: FormData) => Promise<void>;
  submitting: boolean;
};

const JoinForm = ({ poolName, email, onSubmit, submitting }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Le nom est requis";
    }

    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <div className="join-page__container">
      <div className="join-page__header">
        <h1 className="join-page__title">🎉 Bienvenue !</h1>
        <p className="join-page__subtitle">
          Vous avez été invité à rejoindre <strong>{poolName}</strong>
        </p>
        <p className="join-page__email">
          Invitation envoyée à : <span>{email}</span>
        </p>
      </div>

      <form className="join-page__form" onSubmit={handleSubmit}>
        <h3 className="join-page__form-title">Créez votre compte</h3>

        <div className="join-page__form-row">
          <div className="join-page__form-group">
            <label className="join-page__label">
              Prénom <span className="join-page__required">*</span>
            </label>
            <input
              type="text"
              className={`join-page__input ${formErrors.firstName ? 'join-page__input--error' : ''}`}
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Votre prénom"
            />
            {formErrors.firstName && (
              <span className="join-page__error-message">{formErrors.firstName}</span>
            )}
          </div>

          <div className="join-page__form-group">
            <label className="join-page__label">
              Nom <span className="join-page__required">*</span>
            </label>
            <input
              type="text"
              className={`join-page__input ${formErrors.lastName ? 'join-page__input--error' : ''}`}
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Votre nom"
            />
            {formErrors.lastName && (
              <span className="join-page__error-message">{formErrors.lastName}</span>
            )}
          </div>
        </div>

        <div className="join-page__form-group">
          <label className="join-page__label">Email</label>
          <input
            type="email"
            className="join-page__input"
            value={email}
            disabled
          />
        </div>

        <div className="join-page__form-group">
          <label className="join-page__label">Téléphone (optionnel)</label>
          <input
            type="tel"
            className="join-page__input"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div className="join-page__form-row">
          <div className="join-page__form-group">
            <label className="join-page__label">
              Mot de passe <span className="join-page__required">*</span>
            </label>
            <input
              type="password"
              className={`join-page__input ${formErrors.password ? 'join-page__input--error' : ''}`}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Au moins 6 caractères"
            />
            {formErrors.password && (
              <span className="join-page__error-message">{formErrors.password}</span>
            )}
          </div>

          <div className="join-page__form-group">
            <label className="join-page__label">
              Confirmer le mot de passe <span className="join-page__required">*</span>
            </label>
            <input
              type="password"
              className={`join-page__input ${formErrors.confirmPassword ? 'join-page__input--error' : ''}`}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="Confirmez votre mot de passe"
            />
            {formErrors.confirmPassword && (
              <span className="join-page__error-message">{formErrors.confirmPassword}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="join-page__submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="join-page__spinner" />
              Création en cours...
            </>
          ) : (
            "Créer mon compte et rejoindre la pool"
          )}
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
