import { Cell, Fruit } from '../types'
import { shuffleArray } from '../utils/shuffle'
import { FRUITS } from '../constants' // veya './constants' ya da uygun yol


export function generateFullSolution(gridSize: number): Cell[][] {
	const board: Cell[][] = Array.from({ length: gridSize }, () =>
		Array(gridSize).fill(null)
	)

	const half = gridSize / 2

	function isValidPosition(row: number, col: number, fruit: Fruit): boolean {
		board[row][col] = fruit

		// Yatay üçlü kontrolleri
		for (let c = Math.max(0, col - 2); c <= Math.min(gridSize - 3, col); c++) {
			if (
				board[row][c] &&
				board[row][c + 1] &&
				board[row][c + 2] &&
				board[row][c] === board[row][c + 1] &&
				board[row][c + 1] === board[row][c + 2]
			) {
				board[row][col] = null
				return false
			}
		}

		// Dikey üçlü kontrolleri
		for (let r = Math.max(0, row - 2); r <= Math.min(gridSize - 3, row); r++) {
			if (
				board[r][col] &&
				board[r + 1][col] &&
				board[r + 2][col] &&
				board[r][col] === board[r + 1][col] &&
				board[r + 1][col] === board[r + 2][col]
			) {
				board[row][col] = null
				return false
			}
		}

		// Satır denge kontrolü
		const rowFruits = board[row].filter(Boolean) as Fruit[]
		const rowBlueberries = rowFruits.filter(f => f === '🫐').length
		const rowLemons = rowFruits.filter(f => f === '🍋').length
		if (rowBlueberries > half || rowLemons > half) {
			board[row][col] = null
			return false
		}

		// Sütun denge kontrolü
		const colFruits = board.map(r => r[col]).filter(Boolean) as Fruit[]
		const colBlueberries = colFruits.filter(f => f === '🫐').length
		const colLemons = colFruits.filter(f => f === '🍋').length
		if (colBlueberries > half || colLemons > half) {
			board[row][col] = null
			return false
		}

		board[row][col] = null
		return true
	}

	function backtrack(row = 0, col = 0): boolean {
		if (row === gridSize) return true

		const nextRow = col === gridSize - 1 ? row + 1 : row
		const nextCol = col === gridSize - 1 ? 0 : col + 1

		const shuffledFruits = [...FRUITS]
		shuffleArray(shuffledFruits)

		for (const fruit of shuffledFruits) {
			if (isValidPosition(row, col, fruit)) {
				board[row][col] = fruit

				if (backtrack(nextRow, nextCol)) {
					return true
				}

				board[row][col] = null
			}
		}

		return false
	}

	for (let r = 0; r < gridSize; r++) {
		for (let c = 0; c < gridSize; c++) {
			board[r][c] = null
		}
	}

	if (backtrack(0, 0)) {
		return board
	}

	return generateFullSolution(gridSize)
}
