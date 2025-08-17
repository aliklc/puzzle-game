// @/app/lib/api/auth/signup.ts

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
        const { data } = await api.post('/auth/signup', {
            username,
            email,
            password,
        })

        return { success: true, data }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const detail = error.response?.data?.detail

            if (Array.isArray(detail) && detail.length > 0) {
                const errorMessage = detail
                    .map((err) => err.msg || 'Geçersiz alan')
                    .join(' ')
                return {
                    success: false,
                    error: errorMessage,
                }
            }

            if (typeof detail === 'string') {
                return { success: false, error: detail }
            }

            return {
                success: false,
                error: 'Kayıt sırasında bilinmeyen bir hata oluştu.',
            }
        }
        return { success: false, error: 'Bilinmeyen bir hata oluştu' }
    }
}