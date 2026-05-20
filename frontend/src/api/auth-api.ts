import axiosClient from './axiosClient.ts'
import { AxiosError } from 'axios'

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const authAPI = {
  // Register new user
  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await axiosClient.post('/users/register', userData)
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Registration failed'
      }
    }
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await axiosClient.post('/users/login', credentials)
      return { success: true, data: response.data.data }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Login failed'
      }
    }
  },
}
