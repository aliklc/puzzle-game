// app/lib/api/auth/me.ts

import api from '../axios'

export async function fetchCurrentUser(): Promise<{ id: number; username: string; roles: string[] } | null> {
    try {
        const { data } = await api.get('/auth/me')
        return data
    } catch (error) {
        console.error('Kullanıcı bilgisi alınamadı:', error)
        return null
    }
}
