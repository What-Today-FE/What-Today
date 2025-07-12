import axiosInstance from './axiosInstance';

export const login = (email: string, password: string) => axiosInstance.post('auth/login', { email, password });
