import api from '../axios'
import type { PuzzleSummary } from '../../types'

export async function fetchPuzzleSummariesClient(): Promise<PuzzleSummary[]> {
  try {
    const { data } = await api.get('/puzzles/') // withCredentials olduğu için cookie gönderilir
    return data
  } catch (error) {
    console.error('Failed to fetch puzzle summaries:', error)
    return []
  }
}
