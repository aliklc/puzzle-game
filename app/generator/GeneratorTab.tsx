'use client'

import { useState } from 'react'
import { difficultyConfigs, type DifficultyLevel } from '../lib/difficultyConfig'
import SizeSelector from './components/SizeSelector'
import DifficultySelector from './components/DifficultySelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'
import type { Cell, Constraint } from '../lib/types'
import { generatePlayablePuzzle } from '../lib/generator/generatePlayablePuzzle'

export default function GeneratorTab() {
	// puzzle ve diğer state'lerde Fruit | null yerine Cell kullanalım
	const [puzzle, setPuzzle] = useState<Cell[][]>([])
	const [constraints, setConstraints] = useState<Constraint[]>([])
	const [gridSize, setGridSize] = useState<number>(6)
	const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')

	const { blankRatio, constraintRatio } = difficultyConfigs[difficulty]

	function handleGenerate() {
		const { puzzle, constraints } = generatePlayablePuzzle(
			gridSize,
			blankRatio,
			constraintRatio
		)

		setPuzzle(puzzle)
		setConstraints(constraints)
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
