'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'
import { maskPuzzle } from '../lib/generator/maskPuzzle'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

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
				<Select
					value={gridSize.toString()}
					onValueChange={(v) => setGridSize(Number(v))}
				>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Grid Size" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="6">6 x 6</SelectItem>
						<SelectItem value="8">8 x 8</SelectItem>
						<SelectItem value="10">10 x 10</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={blankRatio.toString()}
					onValueChange={(v) => setBlankRatio(Number(v))}
				>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Blank Ratio" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0.3">30%</SelectItem>
						<SelectItem value="0.5">50%</SelectItem>
						<SelectItem value="0.7">70%</SelectItem>
					</SelectContent>
				</Select>

				<button
					onClick={handleGenerate}
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
				>
					Generate Puzzle
				</button>
			</div>

			{puzzle.length > 0 && (
				<div
					className="grid"
					style={{
						gridTemplateColumns: `repeat(${puzzle.length}, 40px)`,
						gap: '2px',
					}}
				>
					{puzzle.map((row, r) =>
						row.map((cell, c) => (
							<div
								key={`${r}-${c}`}
								className="w-10 h-10 flex items-center justify-center border text-xl font-semibold bg-white"
							>
								{cell ?? ''}
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}
