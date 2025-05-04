import api from './api'
import { SignupPayload, LoginPayload, AuthResponse } from '@/types/auth'

export const AuthService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', payload)
    return response.data
  },

  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', payload)
    return response.data
  }
}