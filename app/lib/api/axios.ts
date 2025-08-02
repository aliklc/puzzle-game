import axios, { type AxiosError } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

// Sadece bir tane refresh isteği olmasını sağlamak için
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(undefined) // Token yenilendi, isteği tekrar denemesi için resolve et
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    // _retry flag'ini kontrol etmeden önce originalRequest'in varlığından emin ol
    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest.hasOwnProperty('_retry')) {
      if (isRefreshing) {
        // Zaten bir yenileme işlemi var, bu isteği kuyruğa al ve bekle
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest)) // Yenileme bitince orijinal isteği tekrar dene
          .catch(err => Promise.reject(err))
      }

      isRefreshing = true

      try {
        // Refresh token ile yeni access token cookie olarak set edilir
        await api.post('/auth/refresh-token')

        // Kuyruktaki bekleyen istekleri işle
        processQueue(null)
        
        // Orijinal isteği tekrar gönder
        return api(originalRequest)
      } catch (refreshError) {
        // Yenileme başarısız olursa, kuyruktaki tüm istekleri reddet
        processQueue(refreshError as AxiosError)
        // Kullanıcıyı login sayfasına yönlendirme gibi işlemler burada yapılabilir
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api