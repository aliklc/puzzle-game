'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'
import { maskPuzzle } from '../lib/generator/maskPuzzle'
import SizeSelector from './components/SizeSelector'
import BlankRatioSelector from './components/BlankRatioSelector'
import GenerateButton from './components/GenerateButton'
import PuzzleGrid from './components/PuzzleGrid'

export default function GeneratorTab() {
    const [puzzle, setPuzzle] = useState<(string | null)[][]>([])
    const [gridSize, setGridSize] = useState<number>(6)
    const [blankRatio, setBlankRatio] = useState<number>(0.5)

    function handleGenerate() {
        const solution = generateFullSolution(gridSize)
        const { puzzle } = maskPuzzle(solution, blankRatio)
        setPuzzle(puzzle)
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
                <SizeSelector value={gridSize} onChange={setGridSize} />
                <BlankRatioSelector value={blankRatio} onChange={setBlankRatio} />
                <GenerateButton onClick={handleGenerate} />
            </div>
            <PuzzleGrid puzzle={puzzle} />
        </div>
    )
}
