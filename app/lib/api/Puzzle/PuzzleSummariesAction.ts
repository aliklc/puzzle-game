'use server'

import api from '../axios'
import type {  PuzzleSummary } from '../../types'

export async function fetchPuzzleSummaries(): Promise<PuzzleSummary[]> {
    try {
        const { data } = await api.get('/puzzles')
        return data
    } catch (error) {
        console.error('Failed to fetch puzzle summaries:', error)
        return []
    }
}