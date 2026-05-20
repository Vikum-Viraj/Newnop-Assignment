import axios from 'axios'
import { getAuthToken } from '../utils/authUtils'
import { store } from '../store/store.ts'
import { logout } from '../store/authSlice.ts'

// create an axios client instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// axios interceptor to add token
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
