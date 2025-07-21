import { generateFullSolution } from './generateFullSolution'
import { maskPuzzle } from './maskPuzzle'
import { hasUniqueSolution } from './hasUniqueSolution'
import { solveLogically } from './solveLogically'
import type { Cell, Constraint } from '../types'

export function generatePlayablePuzzle(
	gridSize: number,
	blankRatio: number,
	constraintRatio: number
): { puzzle: Cell[][]; constraints: Constraint[]; solution: Cell[][] } {
	let solution: Cell[][]
	let masked: ReturnType<typeof maskPuzzle>
	let logicalSolution: Cell[][] | null

	do {
		solution = generateFullSolution(gridSize)
		masked = maskPuzzle(solution, blankRatio, constraintRatio)
		logicalSolution = solveLogically(masked.puzzle, masked.constraints)
	} while (
		!hasUniqueSolution(masked.puzzle, masked.constraints) ||
		logicalSolution === null
	)

	return {
		puzzle: masked.puzzle,
		constraints: masked.constraints,
		solution,
	}
}
