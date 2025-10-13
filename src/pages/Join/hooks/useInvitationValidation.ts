import { useState, useEffect } from "react";
import { useToast } from "../../../hooks/useToast";

type InvitationData = {
  poolName: string;
  email: string;
};

export const useInvitationValidation = (token: string | null) => {
  const { showError } = useToast();
  const [validating, setValidating] = useState(true);
  const [invitationValid, setInvitationValid] = useState(false);
  const [invitationData, setInvitationData] = useState<InvitationData>({
    poolName: "",
    email: "",
  });

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setInvitationValid(false);
        setValidating(false);
        return;
      }

      try {
        // TODO: Remplacer par l'appel API apres
        // const result = await validateInvitationToken(token);
        
        // Pour l'instant décder le token en base64
        const decoded = atob(token);
        const [poolId, invitedEmail] = decoded.split(":");
        
        setInvitationValid(true);
        setInvitationData({
          poolName: `Pool #${poolId}`, // TODO: Récupérer le vrai nom de la pool
          email: invitedEmail,
        });
      } catch (error) {
        setInvitationValid(false);
        showError("Lien d'invitation invalide ou expiré");
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token, showError]);

  return {
    validating,
    invitationValid,
    poolName: invitationData.poolName,
    email: invitationData.email,
  };
};
