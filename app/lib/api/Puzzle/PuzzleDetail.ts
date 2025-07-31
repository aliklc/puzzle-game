import api from '../axios'

export async function fetchPuzzleDetailAction(id: string, access_token?: string) {
    try {
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {}
        const { data } = await api.get(`/puzzles/${id}`, { headers })
        return { success: true, data }
    } catch (error) {
        console.error('Failed to fetch puzzle detail:', error)
        return { success: false, error: 'Bulmaca detayı yüklenemedi' }
    }
}
