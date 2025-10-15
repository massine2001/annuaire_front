import axiosClient from "./axiosClient";

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

export const sendInvitation = async (data: InvitationData): Promise<InvitationResponse> => {
  try {
    const response = await axiosClient.post("/api/invitations/send", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const sendBulkInvitations = async (invitations: InvitationData[]): Promise<InvitationResponse> => {
  try {
    const response = await axiosClient.post("/api/invitations/send-bulk", { invitations });
    return response.data;
  } catch (error) {
    throw error;
  }
};


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
    throw error;
  }
};


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
    throw error;
  }
};


// Note: Cette fonction n'a pas d'équivalent backend car il n'y a pas de table invitation
// export const getPoolInvitations = async (poolId: number): Promise<{
//   email: string;
//   sentAt: string;
//   status: "pending" | "accepted" | "expired";
// }[]> => {
//   try {
//     const response = await axiosClient.get(`/api/invitations/pool/${poolId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
