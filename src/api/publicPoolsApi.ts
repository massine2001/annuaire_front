import axiosClient from './axiosClient';
import type { Pool, File } from '../types/models';


export const fetchPublicPools = async (): Promise<Pool[]> => {
  try {
    const response = await axiosClient.get<Pool[]>('/pools/public', {
      withCredentials: false
    });
    

    return response.data;
  } catch (error: any) {
    
    return [];
  }
};

export const fetchPublicPoolById = async (poolId: number): Promise<Pool | null> => {
  try {
    const response = await axiosClient.get<Pool>(`/pools/${poolId}/public`, {
      withCredentials: false
    });
    return response.data;
  } catch (error) {
    return null;
  }
};


export const fetchPublicPoolFiles = async (poolId: number): Promise<File[]> => {
  try {
    const response = await axiosClient.get<File[]>(`/files/pool/${poolId}/public`, {
      withCredentials: false
    });
    return response.data;
  } catch (error) {
    return [];
  }
};
