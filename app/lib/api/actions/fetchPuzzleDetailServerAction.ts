'use server'

import { fetchPuzzleDetailAction } from "../Puzzle/PuzzleDetail"

export async function fetchPuzzleDetailServerAction(id: string) {
    return await fetchPuzzleDetailAction(id)
}
