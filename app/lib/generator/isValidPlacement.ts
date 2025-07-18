import { Fruit } from '../types'

export function isValidPlacement(
	board: (Fruit | null)[][],
	row: number,
	col: number
): boolean {
	const gridSize = board.length
	const current = board[row][col]
	if (!current) return true

	// 1. Üçlü kuralı (yatay)
	if (
		col >= 2 &&
		board[row][col - 1] === current &&
		board[row][col - 2] === current
	)
		return false

	// 1. Üçlü kuralı (dikey)
	if (
		row >= 2 &&
		board[row - 1][col] === current &&
		board[row - 2][col] === current
	)
		return false

	// 2. Denge kuralı (satır)
	const rowFruits = board[row].filter(Boolean)
	if (
		rowFruits.filter((f) => f === '🫐').length > gridSize / 2 ||
		rowFruits.filter((f) => f === '🍋').length > gridSize / 2
	)
		return false

	// 2. Denge kuralı (sütun)
	const colFruits = board.map((r) => r[col]).filter(Boolean)
	if (
		colFruits.filter((f) => f === '🫐').length > gridSize / 2 ||
		colFruits.filter((f) => f === '🍋').length > gridSize / 2
	)
		return false


	return true
}
