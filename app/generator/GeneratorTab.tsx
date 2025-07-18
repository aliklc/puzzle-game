'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'
import { maskPuzzle } from '../lib/generator/maskPuzzle'
import { difficultyConfigs, type DifficultyLevel } from '../lib/difficultyConfig'
import SizeSelector from './components/SizeSelector'
import DifficultySelector from './components/DifficultySelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'
import type { Fruit, Constraint } from '../lib/types'

export default function GeneratorTab() {
	const [puzzle, setPuzzle] = useState<(Fruit | null)[][]>([])
	const [constraints, setConstraints] = useState<Constraint[]>([])
	const [gridSize, setGridSize] = useState<number>(6)
	const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')

	// Direkt difficultyConfigs'den değerleri al
	const { blankRatio, constraintRatio } = difficultyConfigs[difficulty]

	function handleGenerate() {
		const solution = generateFullSolution(gridSize)
		const { puzzle, constraints } = maskPuzzle(solution, blankRatio, constraintRatio)
		setPuzzle(puzzle)
		setConstraints(constraints)
	}

	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="flex items-center space-x-4">
				<SizeSelector value={gridSize} onChange={setGridSize} />
				<DifficultySelector
					value={difficulty}
					onChange={(difficulty) => {
						setDifficulty(difficulty)
						// useEffect zaten güncelleme yapacağı için burada manuel güncelleme yapmıyoruz
					}}
				/>
				<GenerateButton onClick={handleGenerate} />
			</div>
			<PuzzleGrid puzzle={puzzle} constraints={constraints} />
		</div>
	)
}