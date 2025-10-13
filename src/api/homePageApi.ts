import axiosClient from './axiosClient';

export const fetchPoolsCount = () => axiosClient.get('/pool/count').then(res => res.data);
export const fetchUsersCount = () => axiosClient.get('/users/count').then(res => res.data);
export const fetchFilesCount = () => axiosClient.get('/files/count').then(res => res.data);

export const fetchAccessById = (id: number) =>
  axiosClient.get(`/access/${id}`).then(res => res.data);

