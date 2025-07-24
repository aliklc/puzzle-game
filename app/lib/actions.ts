'use server'

import { revalidateTag } from 'next/cache'
import api from './api/axios'
import type { PuzzleDetail, PuzzleSummary } from './types'

export async function fetchPuzzleSummaries(): Promise<PuzzleSummary[]> {
    try {
        const { data } = await api.get('/puzzles')
        return data
    } catch (error) {
        console.error('Failed to fetch puzzle summaries:', error)
        return []
    }
}

export async function fetchPuzzleDetail(id: string): Promise<PuzzleDetail> {
    const { data } = await api.get(`/puzzles/${id}`)
    return data
}

export async function savePuzzle(newPuzzleData: Omit<PuzzleDetail, 'id'>) {
    try {
        const { data } = await api.post('/puzzles', newPuzzleData)
        revalidateTag('puzzle-summaries-tag') 
        return { success: true, data }
    } catch (error) {
        console.error('Server-side POST error:', error)
        return { success: false, error: 'Kaydedilemedi' }
    }
}