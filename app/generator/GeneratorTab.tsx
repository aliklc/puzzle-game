'use client'

import { useState } from 'react'
import { difficultyConfigs, type DifficultyLevel } from '../lib/difficultyConfig'
import SizeSelector from './components/SizeSelector'
import DifficultySelector from './components/DifficultySelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'
import SaveButton from './components/SaveButton'
import PuzzleList from './components/PuzzleList'

import type { Cell, Constraint } from '../lib/types'
import { generatePlayablePuzzle } from '../lib/generator/generatePlayablePuzzle'

export default function GeneratorTab() {
    const [puzzle, setPuzzle] = useState<Cell[][]>([])
    const [constraints, setConstraints] = useState<Constraint[]>([])
    const [solution, setSolution] = useState<Cell[][]>([])
    const [gridSize, setGridSize] = useState<number>(6)
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')
    const [refreshKey, setRefreshKey] = useState(0)

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

        console.log(`Grid Size: ${gridSize}x${gridSize}`)
        console.log(`Difficulty: ${difficulty.toUpperCase()}`)
        console.log('Puzzle (User View):')
        console.table(puzzle)
        console.log('Solution (Full Answer):')
        console.table(solution)
        console.log('Constraints:')
        console.dir(constraints, { depth: null })
		
    }

    function handlePuzzleSaved() {
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
                <PuzzleList
                    onSelect={(puzzle, constraints, solution) => {
                        setPuzzle(puzzle)
                        setConstraints(constraints)
                        setSolution(solution)
                    }}
                    refreshKey={refreshKey}
                />
                <SizeSelector value={gridSize} onChange={setGridSize} />
                <DifficultySelector value={difficulty} onChange={setDifficulty} />
                <GenerateButton onClick={handleGenerate} />
                <SaveButton
                    puzzle={puzzle}
                    constraints={constraints}
                    solution={solution}
                    gridSize={gridSize}
                    difficulty={difficulty}
                    onSaved={handlePuzzleSaved}
                />
            </div>
            <PuzzleGrid puzzle={puzzle} constraints={constraints} />
        </div>
    )
}
