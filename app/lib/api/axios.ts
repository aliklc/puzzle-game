import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

// Token yenileme sırasında bekleyen isteklerin resolve/reject'lerini tutuyoruz
type FailedRequest = {
  resolve: (value?: unknown) => void
  reject: (error?: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: AxiosError | null, token?: string) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (!originalRequest) {
      return Promise.reject(error)
    }

    // Network hataları için özel mesaj
    if (!error.response) {
      const networkError = new Error('Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.')
      networkError.name = 'NetworkError'
      return Promise.reject(networkError)
    }

    // 401 veya 403 hatalarında token refresh dene
    const shouldRefresh = (error.response?.status === 401 || error.response?.status === 403) && 
      !originalRequest._retry

    if (shouldRefresh) {

      
      if (isRefreshing) {
        // Yenileme zaten yapılıyor, isteği kuyruğa al
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            // Token ile Authorization header'ını güncelle
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Refresh token ile access token yenileme isteği
        const refreshResponse = await api.post('/auth/refresh-token')
        
        // Backend'den dönen yeni access token'ı al
        const newAccessToken = refreshResponse.data.access_token
        

        // Orijinal isteğe Authorization header'ını ekle
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        }

        processQueue(null, newAccessToken)

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
