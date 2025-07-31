'use server'

import { cookies } from 'next/headers'
import { fetchPuzzleDetailAction } from "../Puzzle/PuzzleDetail"

export async function fetchPuzzleDetailServerAction(id: string) {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')?.value

    return await fetchPuzzleDetailAction(id, access_token)
}
