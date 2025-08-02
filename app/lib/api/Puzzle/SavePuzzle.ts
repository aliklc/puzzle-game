// app/lib/api/Puzzle/SavePuzzle.ts
import api from '../axios'

export async function savePuzzleAction(formData: FormData) {
    try {
        const puzzleData = {
            title: formData.get('title') as string,
            puzzle_data: JSON.parse(formData.get('puzzle_data') as string),
            constraints: JSON.parse(formData.get('constraints') as string),
            solution_data: JSON.parse(formData.get('solution_data') as string),
            puzzle_hash: formData.get('puzzle_hash') as string,
        }

        const { data } = await api.post('/puzzles', puzzleData)
        
        
        return { success: true, data }
    } catch (error) {
        console.error('Server-side POST error:', error)
        return { success: false, error: 'Kaydedilemedi' }
    }
}