// app/lib/api/Puzzle/fetchPuzzleSummariesClient.ts
import api from '../axios'
import type { PuzzleSummary } from '../../types'

export async function fetchPuzzleSummariesClient(): Promise<PuzzleSummary[]> {
    try {
        const { data } = await api.get<PuzzleSummary[]>('/puzzles/')
        return data
    } catch (error) {
        console.error('Failed to fetch puzzle summaries:', error)
        return []
    }
}