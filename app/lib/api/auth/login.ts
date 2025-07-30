import api from '../axios'

type LoginResponse = {
    access_token: string
    refresh_token: string
    token_type: string
}

export async function login(
    username: string,
    password: string
): Promise<{ success: boolean; data?: LoginResponse; error?: string }> {
    try {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        const { data } = await api.post('/auth/login', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        return { success: true, data }
    } catch (err: any) {
        return {
            success: false,
            error: err.response?.data?.detail || 'Giriş başarısız',
        }
    }
}
