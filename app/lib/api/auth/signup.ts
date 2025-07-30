import api from '../axios'

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
        const { data } = await api.post('/auth/signup', { username, email, password })

        return { success: true, data }
    } catch (err: any) {
        return {
            success: false,
            error: err.response?.data?.detail || 'Kayıt başarısız',
        }
    }
}
