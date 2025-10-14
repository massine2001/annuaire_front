import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { acceptInvitation } from "../../../api/poolPageApi";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export const useJoinForm = (token: string) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);

    try {
      const result = await acceptInvitation({
        token,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        phone: formData.phone || undefined,
      });

      if (result.success) {
        showSuccess(result.message || "Compte créé avec succès ! Bienvenue !");
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        showError(result.message || "Erreur lors de la création du compte");
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erreur lors de la création du compte";
      showError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    handleSubmit,
  };
};
