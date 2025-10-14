import axiosClient from './axiosClient';
import type { File } from '../types/models';

export const fetchAllFiles = () =>
  axiosClient.get<File[]>('/files').then(res => res.data);

export const uploadFile = (
  file: globalThis.File, 
  poolId: number,
  description?: string,
  expirationDate?: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('poolId', poolId.toString());
  if (description) formData.append('description', description);
  if (expirationDate) formData.append('expirationDate', expirationDate);
  
  return axiosClient.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateFile = (
  fileId: number, 
  newFile?: globalThis.File,
  name?: string,
  description?: string,
  expirationDate?: string
) => {
  const formData = new FormData();
  if (newFile) formData.append('file', newFile);
  if (name) formData.append('name', name);
  if (description) formData.append('description', description);
  if (expirationDate) formData.append('expirationDate', expirationDate);
  
  return axiosClient.put(`/files/${fileId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteFile = (fileId: number) => {
  return axiosClient.delete(`/files/${fileId}`);
};

export const downloadFile = async (fileId: number, fileName: string) => {
  try {
    const response = await axiosClient.get(`/files/download/${fileId}`, {
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
    return { success: false, error };
  }
};

export const previewFile = async (fileId: number) => {
  try {
    const response = await axiosClient.get(`/files/preview/${fileId}`, {
      responseType: 'blob',
    });

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    return { success: true, url, contentType };
  } catch (error) {
    return { success: false, error };
  }
};
