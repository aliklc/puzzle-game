import { Cell, Constraint } from '../types'
import { FRUITS } from '../constants' 

export function hasUniqueSolution(
	board: Cell[][],
	constraints: Constraint[],
	maxSolutions = 2
): boolean {
	const size = board.length
	let solutionCount = 0

	// Constraint doğrulama fonksiyonu
	function isConstraintValid(): boolean {
		for (const constraint of constraints) {
			const [fromRow, fromCol] = constraint.from
			const [toRow, toCol] = constraint.to
			const fromValue = board[fromRow][fromCol]
			const toValue = board[toRow][toCol]

			// Her iki hücre de dolduysa constraint'i kontrol et
			if (fromValue && toValue) {
				const areSame = fromValue === toValue
				if (constraint.type === '=' && !areSame) return false
				if (constraint.type === '×' && areSame) return false
			}
		}
		return true
	}

	// Tam doğrulama fonksiyonu (generateFullSolution'daki ile aynı)
	function isValidPosition(row: number, col: number, fruit: Cell): boolean {
		const originalValue = board[row][col]
		board[row][col] = fruit

		// Yatay üçlü kontrolleri
		for (let c = Math.max(0, col - 2); c <= Math.min(size - 3, col); c++) {
			if (
				board[row][c] &&
				board[row][c + 1] &&
				board[row][c + 2] &&
				board[row][c] === board[row][c + 1] &&
				board[row][c + 1] === board[row][c + 2]
			) {
				board[row][col] = originalValue
				return false
			}
		}

		// Dikey üçlü kontrolleri
		for (let r = Math.max(0, row - 2); r <= Math.min(size - 3, row); r++) {
			if (
				board[r][col] &&
				board[r + 1][col] &&
				board[r + 2][col] &&
				board[r][col] === board[r + 1][col] &&
				board[r + 1][col] === board[r + 2][col]
			) {
				board[row][col] = originalValue
				return false
			}
		}

		// Satır denge kontrolü
		const rowFruits = board[row].filter(Boolean)
		const rowBlueberries = rowFruits.filter(f => f === '🫐').length
		const rowLemons = rowFruits.filter(f => f === '🍋').length
		if (rowBlueberries > size / 2 || rowLemons > size / 2) {
			board[row][col] = originalValue
			return false
		}

		// Sütun denge kontrolü
		const colFruits = board.map(r => r[col]).filter(Boolean)
		const colBlueberries = colFruits.filter(f => f === '🫐').length
		const colLemons = colFruits.filter(f => f === '🍋').length
		if (colBlueberries > size / 2 || colLemons > size / 2) {
			board[row][col] = originalValue
			return false
		}

		board[row][col] = originalValue
		return true
	}

	function backtrack(row = 0, col = 0): boolean {
		if (solutionCount >= maxSolutions) return false

		if (row === size) {
			if (isConstraintValid()) {
				solutionCount++
			}
			return false
		}

		const nextRow = col === size - 1 ? row + 1 : row
		const nextCol = col === size - 1 ? 0 : col + 1

		if (board[row][col] !== null) {
			return backtrack(nextRow, nextCol)
		}

		for (const fruit of FRUITS) {
			if (isValidPosition(row, col, fruit)) {
				board[row][col] = fruit

				if (isConstraintValid()) {
					backtrack(nextRow, nextCol)
				}

				board[row][col] = null
			}
		}

		return false
	}

	const puzzleCopy = board.map(row => [...row])
	backtrack()

	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			board[r][c] = puzzleCopy[r][c]
		}
	}

	return solutionCount === 1
}
