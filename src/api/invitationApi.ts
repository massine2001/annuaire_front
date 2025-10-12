import axiosClient from "./axiosClient";

// Types
export type InvitationData = {
  email: string;
  poolId: number;
  message: string;
  invitationLink: string;
};

export type InvitationResponse = {
  success: boolean;
  message: string;
};

/**
 * Envoyer une invitation par email
 * TODO: À implémenter côté backend
 * Pour l'instant, cette fonction est un placeholder
 */
export const sendInvitation = async (data: InvitationData): Promise<InvitationResponse> => {
  try {
    const response = await axiosClient.post("/api/invitations/send", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'invitation:", error);
    throw error;
  }
};

/**
 * Envoyer plusieurs invitations
 * TODO: À implémenter côté backend
 */
export const sendBulkInvitations = async (invitations: InvitationData[]): Promise<InvitationResponse> => {
  try {
    const response = await axiosClient.post("/api/invitations/send-bulk", { invitations });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi des invitations:", error);
    throw error;
  }
};

/**
 * Valider un token d'invitation et récupérer les informations
 * TODO: À implémenter côté backend
 */
export const validateInvitationToken = async (token: string): Promise<{
  valid: boolean;
  poolId?: number;
  poolName?: string;
  email?: string;
}> => {
  try {
    const response = await axiosClient.get(`/api/invitations/validate/${token}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la validation du token:", error);
    throw error;
  }
};

/**
 * Accepter une invitation et créer un compte utilisateur
 * TODO: À implémenter côté backend
 */
export const acceptInvitation = async (data: {
  token: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
}): Promise<{
  success: boolean;
  user?: any;
  message: string;
}> => {
  try {
    const response = await axiosClient.post("/api/invitations/accept", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'acceptation de l'invitation:", error);
    throw error;
  }
};

/**
 * Obtenir la liste des invitations envoyées pour une pool
 * TODO: À implémenter côté backend
 */
export const getPoolInvitations = async (poolId: number): Promise<{
  email: string;
  sentAt: string;
  status: "pending" | "accepted" | "expired";
}[]> => {
  try {
    const response = await axiosClient.get(`/api/invitations/pool/${poolId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des invitations:", error);
    throw error;
  }
};
