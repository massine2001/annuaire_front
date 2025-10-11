import axiosClient from './axiosClient';
import type { Pool, User, PoolStats, File } from '../types/models';

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
