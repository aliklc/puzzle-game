import { Fruit, Constraint } from '../types'
import { isValidPlacement } from './isValidPlacement'

export function hasUniqueSolution(
	board: (Fruit | null)[][],
	constraints: Constraint[],
	maxSolutions = 2
): boolean {
	const size = board.length
	let solutionCount = 0

	function backtrack(row = 0, col = 0): boolean {
		if (solutionCount >= maxSolutions) return false
		if (row === size) {
			solutionCount++
			return false
		}

		const nextRow = col === size - 1 ? row + 1 : row
		const nextCol = col === size - 1 ? 0 : col + 1

		if (board[row][col] !== null) {
			return backtrack(nextRow, nextCol)
		}

		const fruits: Fruit[] = ['🫐', '🍋']
		for (const fruit of fruits) {
			board[row][col] = fruit

			if (isValidPlacement(board, row, col)) {
				backtrack(nextRow, nextCol)
			}

			board[row][col] = null
		}

		return false
	}

	const puzzleCopy = board.map(row => [...row])
	backtrack()

	return solutionCount === 1
}
