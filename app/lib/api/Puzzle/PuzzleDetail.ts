import api from '../axios'

export async function fetchPuzzleDetailClient(id: string) {
  try {
    const { data } = await api.get(`/puzzles/${id}`)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch puzzle detail:', error)
    return { success: false, error: 'Bulmaca detayı yüklenemedi' }
  }
}
