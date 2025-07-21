'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'
import { maskPuzzle } from '../lib/generator/maskPuzzle'
import { difficultyConfigs, type DifficultyLevel } from '../lib/difficultyConfig'
import { hasUniqueSolution } from '../lib/generator/hasUniqueSolution'
import SizeSelector from './components/SizeSelector'
import DifficultySelector from './components/DifficultySelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'
import type { Cell, Constraint } from '../lib/types'
import { solveLogically } from '../lib/generator/solveLogically'

export default function GeneratorTab() {
	// puzzle ve diğer state'lerde Fruit | null yerine Cell kullanalım
	const [puzzle, setPuzzle] = useState<Cell[][]>([])
	const [constraints, setConstraints] = useState<Constraint[]>([])
	const [gridSize, setGridSize] = useState<number>(6)
	const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')

	const { blankRatio, constraintRatio } = difficultyConfigs[difficulty]

	function handleGenerate() {
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

		setPuzzle(masked.puzzle)
		setConstraints(masked.constraints)
	}

	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="flex items-center space-x-4">
				<SizeSelector value={gridSize} onChange={setGridSize} />
				<DifficultySelector
					value={difficulty}
					onChange={(diff) => setDifficulty(diff)}
				/>
				<GenerateButton onClick={handleGenerate} />
			</div>
			<PuzzleGrid puzzle={puzzle} constraints={constraints} />
		</div>
	)
}
