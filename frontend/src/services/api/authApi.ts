import apiClient from './axios.config';
import type {
  User,
  RegisterData,
  LoginData,
  AuthResponse,
  RefreshTokenResponse,
} from '../../types/auth.types';
import type { ApiResponse } from '../../types/api.types';

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login a user
   */
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/auth/logout');
    return response.data;
  },

  /**
   * Refresh the access token
   */
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh-token');
    return response.data;
  },

  /**
   * Get the current user's profile
   */
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data;
  },
};

export default authApi;
