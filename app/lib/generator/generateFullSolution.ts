import { Fruit } from '../types'
import { isValidPlacement } from './isValidPlacement'
import { shuffleArray } from '../utils/shuffle'

export function generateFullSolution(gridSize: number): Fruit[][] {
	const board: Fruit[][] = Array.from({ length: gridSize }, () =>
		Array(gridSize).fill(null)
	)

	const half = gridSize / 2
	const fruits: Fruit[] = ['🫐', '🍋']

	function generateValidRows(): Fruit[][] {
		const results: Fruit[][] = []

		function backtrack(row: Fruit[] = []) {
			if (row.length === gridSize) {
				const countB = row.filter((f) => f === '🫐').length
				const countL = row.filter((f) => f === '🍋').length
				if (countB === half && countL === half) {
					results.push([...row])
				}
				return
			}

			for (const fruit of fruits) {
				const len = row.length
				if (
					len >= 2 &&
					row[len - 1] === fruit &&
					row[len - 2] === fruit
				)
					continue // 3 aynı meyve arka arkaya olamaz

				row.push(fruit)
				backtrack(row)
				row.pop()
			}
		}

		backtrack()
		return results
	}

	const validRows = generateValidRows()
	shuffleArray(validRows)

	function backtrack(rowIndex: number): boolean {
		if (rowIndex === gridSize) return true

		shuffleArray(validRows)
		for (const candidate of validRows) {
			board[rowIndex] = [...candidate]

			// Sütun kontrolleri
			let isValid = true
			for (let col = 0; col < gridSize; col++) {
				if (!isValidPlacement(board, rowIndex, col)) {
					isValid = false
					break
				}
			}

			if (isValid && backtrack(rowIndex + 1)) {
				return true
			}
		}

		return false
	}

	backtrack(0)
	return board
}
