import { Fruit } from '../types'
import { shuffleArray } from '../utils/shuffle'

export function maskPuzzle(
	solution: Fruit[][],
	blankRatio: number = 0.5
): { puzzle: (Fruit | null)[][] } {
	const size = solution.length
	const puzzle: (Fruit | null)[][] = solution.map((row) => [...row])

	const allCells: [number, number][] = []
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			allCells.push([r, c])
		}
	}

	shuffleArray(allCells)

	const maxBlanks = Math.floor(size * size * blankRatio)
	let blanks = 0

	for (const [r, c] of allCells) {
		if (blanks >= maxBlanks) break
		puzzle[r][c] = null
		blanks++
	}

	return { puzzle }
}
