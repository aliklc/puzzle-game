'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function GeneratorTab() {
	const [grid, setGrid] = useState<string[][]>([])
	const [gridSize, setGridSize] = useState(6)

	function handleGenerate() {
		const newGrid = generateFullSolution(gridSize)
		setGrid(newGrid)
	}

	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="flex items-center space-x-4">
				<Select
					value={gridSize.toString()}
					onValueChange={(value) => setGridSize(Number(value))}
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

				<button
					onClick={handleGenerate}
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
				>
					Generate
				</button>
			</div>

			{grid.length > 0 && (
				<div
					className="grid"
					style={{
						gridTemplateColumns: `repeat(${grid.length}, 40px)`,
						gap: '2px',
					}}
				>
					{grid.map((row, rowIndex) =>
						row.map((cell, colIndex) => (
							<div
								key={`${rowIndex}-${colIndex}`}
								className="w-10 h-10 flex items-center justify-center border text-xl font-semibold bg-white"
							>
								{cell}
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}
