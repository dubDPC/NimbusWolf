export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  code?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  code?: string;
}
