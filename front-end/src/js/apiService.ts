import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
// Base URL cho API
const API_BASE_URL = 'http://localhost:5000/api';
type JwtPayload = {
    id: string;
    email: string;
    name: string;
    roles: string[];
    exp: number;
};

export const apiService: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export interface LoginResponse {
    token: string;
}

export interface User {
    id: number;
    username: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await apiService.post<LoginResponse>('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);

        const decoded: JwtPayload = jwtDecode(response.data.token);
        const userData = {
            token: response.data.token,
            roles: decoded.roles,
            name: decoded.name,
            email: decoded.email,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to login');
    }
};

export const getUsers = async (token: string): Promise<User[]> => {
    try {
        const response = await apiService.get<User[]>('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
}