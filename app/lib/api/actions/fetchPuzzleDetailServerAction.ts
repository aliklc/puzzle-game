import { cookies } from 'next/headers'
import { fetchPuzzleDetailAction } from '../Puzzle/PuzzleDetail'

export async function fetchPuzzleDetailServerAction(id: string) {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')?.value

    if (!access_token) {
        return { success: false, error: "No access token" }
    }

    const { data, error } = await fetchPuzzleDetailAction(id, access_token)
    return { success: !error, data, error }
}
