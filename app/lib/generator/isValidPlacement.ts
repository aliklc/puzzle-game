import { Cell } from '../types'

export function isValidPlacement(
	board: Cell[][],
	row: number,
	col: number
): boolean {
	const gridSize = board.length
	const current = board[row][col]
	if (!current) return true

	// 1. Üçlü kuralı kontrolleri - TÜM YÖNLERİ KONTROL ET

	// Yatay üçlü kontrolleri
	// Sol taraftan gelen 2 hücre + current
	if (
		col >= 2 &&
		board[row][col - 1] === current &&
		board[row][col - 2] === current
	)
		return false

	// Sol 1 + current + sağ 1
	if (
		col >= 1 &&
		col < gridSize - 1 &&
		board[row][col - 1] === current &&
		board[row][col + 1] === current
	)
		return false

	// Current + sağdan gelen 2 hücre
	if (
		col < gridSize - 2 &&
		board[row][col + 1] === current &&
		board[row][col + 2] === current
	)
		return false

	// Dikey üçlü kontrolleri
	// Üstten gelen 2 hücre + current
	if (
		row >= 2 &&
		board[row - 1][col] === current &&
		board[row - 2][col] === current
	)
		return false

	// Üst 1 + current + alt 1
	if (
		row >= 1 &&
		row < gridSize - 1 &&
		board[row - 1][col] === current &&
		board[row + 1][col] === current
	)
		return false

	// Current + alttan gelen 2 hücre
	if (
		row < gridSize - 2 &&
		board[row + 1][col] === current &&
		board[row + 2][col] === current
	)
		return false

	// 2. Denge kuralı (satır)
	const rowFruits = board[row].filter(Boolean)
	if (
		rowFruits.filter(f => f === '🫐').length > gridSize / 2 ||
		rowFruits.filter(f => f === '🍋').length > gridSize / 2
	)
		return false

	// 2. Denge kuralı (sütun)
	const colFruits = board.map(r => r[col]).filter(Boolean)
	if (
		colFruits.filter(f => f === '🫐').length > gridSize / 2 ||
		colFruits.filter(f => f === '🍋').length > gridSize / 2
	)
		return false

	return true
}
