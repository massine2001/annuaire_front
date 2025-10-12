import axiosClient from './axiosClient';
import type { Pool, User, PoolStats, File, Access } from '../types/models';

export const fetchAllPools = () =>
  axiosClient.get<Pool[]>('/pool/').then(res => res.data);

export const fetchPoolById = (id: number) =>
  axiosClient.get<Pool>(`/pool/${id}`).then(res => res.data);

export const createPool = (pool: Omit<Pool, 'id' | 'createdAt'>) =>
  axiosClient.post<Pool>('/pool/', pool).then(res => res.data);

export const fetchUsersFromPool = (poolId: number) =>
  axiosClient.get<User[]>(`/pool/users/${poolId}`).then(res => res.data);

export const fetchPoolsByUserId = (userId: number) =>
  axiosClient.get<Pool[]>(`/pool/user/${userId}`).then(res => res.data);

export const fetchPoolStats = (poolId: number) =>
  axiosClient.get<PoolStats>(`/pool/stats/${poolId}`).then(res => res.data);

export const fetchFilesByPoolId = (poolId: number) =>
  axiosClient.get<File[]>(`/pool/files/${poolId}`).then(res => res.data);

// Gestion des membres via Access
export const addMemberToPool = (poolId: number, userId: number, role: string, permission: string = 'READ_WRITE') => {
  const pool = { id: poolId };
  const user = { id: userId };
  return axiosClient.post<Access>('/access/', { pool, user, role, permission });
};

export const removeMemberFromPool = (accessId: number) => {
  return axiosClient.delete(`/access/${accessId}`);
};

export const updateMemberRole = (accessId: number, newRole: string, newPermission?: string) => {
  // Il faut passer l'objet Access complet avec pool et user
  // On va juste passer le role pour le moment, à ajuster selon le backend
  return axiosClient.put(`/access/${accessId}`, { role: newRole, permission: newPermission || 'READ_WRITE' });
};
