import axiosClient from './axiosClient';
import type { File } from '../types/models';

export const fetchAllFiles = () =>
  axiosClient.get<File[]>('/files').then(res => res.data);

export const uploadFile = (
  file: globalThis.File, 
  poolId: number,
  description?: string,
  expirationDate?: string,
  onProgress?: (progress: number) => void
) => {
  console.time(`Upload file ${file.name}`);
  console.log(`Starting upload of ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
  const formData = new FormData();
  console.timeLog(`Upload file ${file.name}`, 'FormData created');
  formData.append('file', file);
  formData.append('poolId', poolId.toString());
  if (description) formData.append('description', description);
  if (expirationDate) formData.append('expirationDate', expirationDate);
  console.timeLog(`Upload file ${file.name}`, 'FormData populated');
  
  const startTime = Date.now();
  return axiosClient.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        const elapsed = Date.now() - startTime;
        const speed = progressEvent.loaded / elapsed * 1000; // bytes per second
        console.log(`Upload progress: ${percent}%, speed: ${(speed / 1024).toFixed(2)} KB/s`);
        onProgress(percent);
      }
    }
  }).then(result => {
    const totalTime = Date.now() - startTime;
    console.timeEnd(`Upload file ${file.name}`);
    console.log(`Upload completed in ${totalTime}ms`);
    return result;
  }).catch(error => {
    const totalTime = Date.now() - startTime;
    console.log(`Upload failed after ${totalTime}ms:`, error);
    throw error;
  });
};

export const updateFile = (
  fileId: number, 
  newFile?: globalThis.File,
  name?: string,
  description?: string,
  expirationDate?: string,
  onProgress?: (progress: number) => void
) => {
  const formData = new FormData();
  if (newFile) formData.append('file', newFile);
  if (name) formData.append('name', name);
  if (description) formData.append('description', description);
  if (expirationDate) formData.append('expirationDate', expirationDate);
  
  return axiosClient.put(`/files/${fileId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    }
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
