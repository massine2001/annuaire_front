export interface PasswordStrength {
  isValid: boolean;
  score: number; 
  errors: string[];
  suggestions: string[];
}

export const validatePassword = (password: string): PasswordStrength => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  if (password.length < 12) {
    errors.push('Le mot de passe doit contenir au moins 12 caractères');
  } else if (password.length >= 12) {
    score++;
    if (password.length >= 16) score++; 
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Au moins une lettre majuscule requise (A-Z)');
  } else {
    score++;
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Au moins une lettre minuscule requise (a-z)');
  } else {
    score++;
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Au moins un chiffre requis (0-9)');
  } else {
    score++;
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score = Math.max(0, score - 1);
    suggestions.push('Ajouter un caractère spécial améliore la sécurité (!@#$%^&*...)');
  } else {
    score++;
  }

  if (score < 3) {
    suggestions.push('Mot de passe très faible');
    suggestions.push('Ajoutez plus de types de caractères différents');
  } else if (score < 4) {
    suggestions.push('Mot de passe moyen');
    suggestions.push('Ajoutez des caractères spéciaux ou allongez le mot de passe');
  }

  if (password.length > 0) {
    const commonSequences = ['123', 'abc', 'qwerty', 'password', 'admin'];
    const lowerPassword = password.toLowerCase();
    
    for (const seq of commonSequences) {
      if (lowerPassword.includes(seq)) {
        suggestions.push(`Évitez les séquences communes comme "${seq}"`);
        score = Math.max(0, score - 1);
      }
    }

    if (/(.)\1{2,}/.test(password)) {
      suggestions.push('Évitez de répéter le même caractère plusieurs fois');
      score = Math.max(0, score - 1);
    }
  }

  return {
    isValid: errors.length === 0 && score >= 4,
    score,
    errors,
    suggestions,
  };
};

export const getPasswordStrengthLabel = (score: number): string => {
  if (score === 0) return 'Très faible';
  if (score === 1) return 'Faible';
  if (score === 2) return 'Moyen';
  if (score === 3) return 'Bon';
  if (score === 4) return 'Fort';
  return 'Très fort';
};

export const getPasswordStrengthColor = (score: number): string => {
  if (score <= 1) return '#ef4444'; 
  if (score === 2) return '#f59e0b'; 
  if (score === 3) return '#eab308'; 
  if (score === 4) return '#84cc16'; 
  return '#22c55e'; 
};
