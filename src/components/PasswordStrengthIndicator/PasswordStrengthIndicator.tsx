import { useState, useEffect } from 'react';
import { validatePassword, getPasswordStrengthLabel, getPasswordStrengthColor } from '../../utils/passwordValidation';
import type { PasswordStrength } from '../../utils/passwordValidation';
import './PasswordStrengthIndicator.css';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

const PasswordStrengthIndicator = ({ 
  password, 
  showRequirements = true 
}: PasswordStrengthIndicatorProps) => {
  const [strength, setStrength] = useState<PasswordStrength>({
    isValid: false,
    score: 0,
    errors: [],
    suggestions: [],
  });

  useEffect(() => {
    if (password) {
      setStrength(validatePassword(password));
    } else {
      setStrength({
        isValid: false,
        score: 0,
        errors: [],
        suggestions: [],
      });
    }
  }, [password]);

  if (!password) return null;

  const strengthColor = getPasswordStrengthColor(strength.score);
  const strengthLabel = getPasswordStrengthLabel(strength.score);

  return (
    <div className="password-strength-indicator">
      <div className="strength-bar-container">
        <div 
          className="strength-bar" 
          style={{ 
            width: `${(strength.score / 5) * 100}%`,
            backgroundColor: strengthColor,
          }}
        />
      </div>
      
      <div className="strength-label" style={{ color: strengthColor }}>
        Force : <strong>{strengthLabel}</strong>
      </div>

      {showRequirements && (
        <div className="strength-requirements">
          <div className="requirement-title">Exigences du mot de passe :</div>
          <ul className="requirement-list">
            <li className={password.length >= 12 ? 'valid' : 'invalid'}>
              {password.length >= 12 ? '✓' : '✗'} Au moins 12 caractères
            </li>
            <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
              {/[A-Z]/.test(password) ? '✓' : '✗'} Une lettre majuscule
            </li>
            <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
              {/[a-z]/.test(password) ? '✓' : '✗'} Une lettre minuscule
            </li>
            <li className={/[0-9]/.test(password) ? 'valid' : 'invalid'}>
              {/[0-9]/.test(password) ? '✓' : '✗'} Un chiffre
            </li>
            <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'valid' : 'invalid'}>
              {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✓' : '✗'} Un caractère spécial
            </li>
          </ul>

          {strength.suggestions.length > 0 && (
            <div className="strength-suggestions">
              {strength.suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  💡 {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
