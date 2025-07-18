'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'
import { maskPuzzle } from '../lib/generator/maskPuzzle'
import SizeSelector from './components/SizeSelector'
import BlankRatioSelector from './components/BlankRatioSelector'
import ConstraintRatioSelector from './components/ConstraintRatioSelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'
import type { Fruit, Constraint } from '../lib/types'

export default function GeneratorTab() {
    const [puzzle, setPuzzle] = useState<(Fruit | null)[][]>([])
    const [constraints, setConstraints] = useState<Constraint[]>([])
    const [gridSize, setGridSize] = useState<number>(6)
    const [blankRatio, setBlankRatio] = useState<number>(0.5)
    const [constraintRatio, setConstraintRatio] = useState<number>(0.3)

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
                <BlankRatioSelector value={blankRatio} onChange={setBlankRatio} />
                <ConstraintRatioSelector value={constraintRatio} onChange={setConstraintRatio} />
                <GenerateButton onClick={handleGenerate} />
            </div>
            <PuzzleGrid puzzle={puzzle} constraints={constraints} />
        </div>
    )
}
