'use client'

import { useState } from 'react'
import { difficultyConfigs, type DifficultyLevel } from '../lib/difficultyConfig'
import SizeSelector from './components/SizeSelector'
import DifficultySelector from './components/DifficultySelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'
import type { Cell, Constraint } from '../lib/types'
import { generatePlayablePuzzle } from '../lib/generator/generatePlayablePuzzle'
import SaveButton from './components/SaveButton'

export default function GeneratorTab() {
	// puzzle ve diğer state'lerde Fruit | null yerine Cell kullanalım
	const [puzzle, setPuzzle] = useState<Cell[][]>([])
	const [constraints, setConstraints] = useState<Constraint[]>([])
	const [gridSize, setGridSize] = useState<number>(6)
	const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')
	const [solution, setSolution] = useState<Cell[][]>([])
	const { blankRatio, constraintRatio } = difficultyConfigs[difficulty]

	function handleGenerate() {
		const { puzzle, constraints, solution } = generatePlayablePuzzle(
			gridSize,
			blankRatio,
			constraintRatio
		)

		setPuzzle(puzzle)
		setConstraints(constraints)
		setSolution(solution)

		const id = Date.now()

		// Parça parça logla
		console.log(`\n Puzzle ID: ${id}\n`)
		console.log(` Grid Size: ${gridSize}x${gridSize}`)
		console.log(`Difficulty: ${difficulty.toUpperCase()}\n`)
		
		console.log(' Puzzle (User View):')
		console.table(puzzle)
		console.log(' Solution (Full Answer):')
		console.table(solution)
		console.log(' Constraints:')
		console.dir(constraints, { depth: null })
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
				<SaveButton puzzle={puzzle} constraints={constraints} solution={solution} gridSize={gridSize} difficulty={difficulty}/>
			</div>
			<PuzzleGrid puzzle={puzzle} constraints={constraints} />
		</div>
	)
}
