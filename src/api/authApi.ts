import axiosClient from './axiosClient';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/models';


export const login = (credentials: LoginRequest) =>
  axiosClient.post<AuthResponse>('/auth/login', credentials).then(res => res.data);

export const register = (data: RegisterRequest) =>
  axiosClient.post<AuthResponse>('/auth/register', data).then(res => res.data);

export const getCurrentUser = () =>
  axiosClient.get<User>('/auth/me').then(res => res.data);
