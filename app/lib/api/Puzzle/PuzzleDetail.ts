// app/lib/api/puzzle/PuzzleDetails.ts
import api from '../axios'
import type { PuzzleDetail } from '../../types'


export async function fetchPuzzleDetailAction(id: string): Promise<{
    success: boolean
    data?: PuzzleDetail
    error?: string
}> {
    try {
        const { data } = await api.get(`/puzzles/${id}`)
        return { success: true, data }
    } catch (error) {
        console.error('Failed to fetch puzzle detail:', error)
        return { success: false, error: 'Bulmaca detayı yüklenemedi' }
    }
}