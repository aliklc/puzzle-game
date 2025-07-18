import { Fruit } from '../types'
import { isValidPlacement } from './isValidPlacement'
import { shuffleArray } from '../utils/shuffle'

export function generateFullSolution(gridSize: number): Fruit[][] {
	const board: Fruit[][] = Array.from({ length: gridSize }, () =>
		Array(gridSize).fill(null)
	)

	function backtrack(row = 0, col = 0): boolean {
		if (row === gridSize) return true
		const nextRow = col === gridSize - 1 ? row + 1 : row
		const nextCol = col === gridSize - 1 ? 0 : col + 1

		const fruits: Fruit[] = ['🫐', '🍋']
		shuffleArray(fruits)

		for (const fruit of fruits) {
			board[row][col] = fruit

			if (isValidPlacement(board, row, col)) {
				if (backtrack(nextRow, nextCol)) return true
			}

			board[row][col] = null
		}

		return false
	}

	backtrack()
	return board
}
