import { AuthState, SignupPayload, LoginPayload } from '@/types/auth'
import { AuthService } from '@/services/auth.service'
import { Module } from 'vuex'

// Initial state
const initialState: AuthState = {
  token: localStorage.getItem('auth_token') || null,
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  loading: false,
  error: null
}

const auth: Module<AuthState, any> = {
  namespaced: true,
  state: initialState,
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token
    },
    token(state): string | null {
      return state.token
    },
    user(state) {
      return state.user
    },
    loading(state): boolean {
      return state.loading
    },
    error(state): string | null {
      return state.error
    }
  },
  mutations: {
    authRequest(state) {
      state.loading = true
      state.error = null
    },
    authSuccess(state, { token, user }) {
      state.token = token
      state.user = user
      state.loading = false
      state.error = null
    },
    authError(state, error) {
      state.loading = false
      state.error = error
    },
    logout(state) {
      state.token = null
      state.user = null
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async login({ commit }, payload: LoginPayload) {
      try {
        commit('authRequest')
        const response = await AuthService.login(payload)
        
        localStorage.setItem('auth_token', response.access_token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
        
        commit('authSuccess', {
          token: response.access_token,
          user: response.user
        })
        
        return response
      } catch (error: any) {
        commit('authError', error.response?.data?.message || 'Login failed')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        throw error
      }
    },
    
    async signup({ commit }, payload: SignupPayload) {
      try {
        commit('authRequest')
        const response = await AuthService.signup(payload)
        
        localStorage.setItem('auth_token', response.access_token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
        
        commit('authSuccess', {
          token: response.access_token,
          user: response.user
        })
        
        return response
      } catch (error: any) {
        commit('authError', error.response?.data?.message || 'Signup failed')
        throw error
      }
    },
    
    logout({ commit }) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      commit('logout')
    },
    
    clearError({ commit }) {
      commit('clearError')
    }
  }
}

export default auth