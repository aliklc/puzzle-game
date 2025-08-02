import api from '../axios'
import axios from 'axios'

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    await api.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    })

    return { success: true }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Giriş başarısız',
      }
    }
    return { success: false, error: 'Bilinmeyen bir hata oluştu' }
  }
}
