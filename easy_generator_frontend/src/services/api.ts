import axios from 'axios'
import store from '@/store'
import router from '@/router'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/token']
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('auth/logout')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api