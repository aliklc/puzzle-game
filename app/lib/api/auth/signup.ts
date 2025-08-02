import api from '../axios'
import axios from 'axios'

type SignupResponse = {
  id: number
  username: string
  email: string
}

export async function signup(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; data?: SignupResponse; error?: string }> {
  try {
    const { data } = await api.post(
      '/auth/signup',
      { username, email, password },
      { withCredentials: true }
    )

    return { success: true, data }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Kayıt başarısız',
      }
    }
    return { success: false, error: 'Bilinmeyen bir hata oluştu' }
  }
}
