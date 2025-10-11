import axiosClient from './axiosClient';
import type { File } from '../types/models';

export const fetchAllFiles = () =>
  axiosClient.get<File[]>('/file/').then(res => res.data);

export const uploadFile = (file: globalThis.File, poolId: number, userId: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('poolId', poolId.toString());
  formData.append('userId', userId.toString());
  
  return axiosClient.post('/file/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const downloadFile = async (fileId: number, fileName: string) => {
  try {
    const response = await axiosClient.get(`/file/download/${fileId}`, {
      responseType: 'blob',
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
    console.error('Erreur lors du téléchargement:', error);
    return { success: false, error };
  }
};

export const previewFile = async (fileId: number) => {
  try {
    
    const response = await axiosClient.get(`/file/preview/${fileId}`, {
      responseType: 'blob',
    });

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    return { success: true, url, contentType };
  } catch (error) {
    console.error('Erreur lors de la prévisualisation:', error);
    return { success: false, error };
  }
};
