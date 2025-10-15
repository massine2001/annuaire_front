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

export const downloadPublicFile = async (fileId: number, fileName: string) => {
  try {
    const response = await axiosClient.get(`/files/download/${fileId}/public`, {
      responseType: 'blob',
      withCredentials: false
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const previewPublicFile = async (fileId: number) => {
  try {
    const response = await axiosClient.get(`/files/preview/${fileId}/public`, {
      responseType: 'blob',
      withCredentials: false
    });

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    return { success: true, url, contentType };
  } catch (error) {
    return { success: false, error };
  }
};
