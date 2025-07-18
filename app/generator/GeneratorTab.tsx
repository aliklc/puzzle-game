'use client'

import { useState } from 'react'
import { generateFullSolution } from '../lib/generator/generateFullSolution'

export default function GeneratorTab() {
	const [grid, setGrid] = useState<string[][]>([])

	function handleGenerate() {
		const newGrid = generateFullSolution(6)
		setGrid(newGrid)
	}

	return (
		<div className="flex flex-col items-center space-y-4">
			<button
				onClick={handleGenerate}
				className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
			>
				Generate Full Solution
			</button>

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
		</div>
	)
}
