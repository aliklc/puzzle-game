// app/lib/api/Puzzle/PuzzleSummaries.ts
import { PuzzleSummary } from '../../types'
import api from '../axios'
import { cookies } from 'next/headers'  // Next.js 13 App Router'da cookie okumak için

export async function fetchPuzzleSummaries(): Promise<PuzzleSummary[]> {
    try {
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access_token')?.value

        if (!access_token) {
          throw new Error('Access token not found in cookies')
        }

        const { data } = await api.get('/puzzles/', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })


        console.log("Puzzle summaries from API:", data)
        return data
    } catch (error) {
        console.error('Failed to fetch puzzle summaries:', error)
        return []
    }
}
