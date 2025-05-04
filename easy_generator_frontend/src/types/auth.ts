export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface SignupPayload {
    email: string;
    name: string;
    password: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    user: User;
  }