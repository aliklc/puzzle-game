import { Cell, Fruit, Constraint } from '../types'
import { isValidPlacement } from './isValidPlacement'
import { FRUITS } from '../constants' 

export function solveLogically(
	puzzle: Cell[][],
	constraints: Constraint[]
): Cell[][] | null {
	const size = puzzle.length
	const board: Cell[][] = puzzle.map(row => [...row]) // Deep copy

	let changed = true

	while (changed) {
		changed = false

		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				if (board[row][col] !== null) continue

				const possible: Fruit[] = []

				for (const fruit of FRUITS) {
					board[row][col] = fruit
					if (
						isValidPlacement(board, row, col) &&
						isConstraintSatisfied(board, constraints)
					) {
						possible.push(fruit)
					}
					board[row][col] = null
				}

				if (possible.length === 1) {
					board[row][col] = possible[0]
					changed = true
				}
			}
		}
	}

	const isFullySolved = board.every(row => row.every(cell => cell !== null))
	return isFullySolved ? board : null
}

function isConstraintSatisfied(board: Cell[][], constraints: Constraint[]): boolean {
	for (const { from, to, type } of constraints) {
		const [r1, c1] = from
		const [r2, c2] = to
		const f1 = board[r1][c1]
		const f2 = board[r2][c2]

		if (f1 && f2) {
			if (type === '=' && f1 !== f2) return false
			if (type === '×' && f1 === f2) return false
		}
	}
	return true
}
