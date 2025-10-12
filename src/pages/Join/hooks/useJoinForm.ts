import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";

type FormData = {
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
      // TODO: Appeler l'API backend pour créer le compte et ajouter à la pool
      // const result = await acceptInvitation({
      //   token: token,
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   password: formData.password,
      //   phone: formData.phone || undefined,
      // });

      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Token:", token);
      console.log("Form data:", formData);

      showSuccess("Compte créé avec succès ! Bienvenue dans la pool !");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      showError("Erreur lors de la création du compte");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    handleSubmit,
  };
};
