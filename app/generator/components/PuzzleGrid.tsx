'use client'

import React, { useEffect, useState } from 'react'
import type { Constraint, ConstraintType, Cell } from '@/app/lib/types'
import ClickableCell from './ClickableCell'

interface PuzzleGridProps {
	puzzle: Cell[][]
	constraints: Constraint[]
}

export default function PuzzleGrid({ puzzle, constraints }: PuzzleGridProps) {
	const size = puzzle.length
	const [currentGrid, setCurrentGrid] = useState<Cell[][]>([])

	// Puzzle değiştiğinde resetle
	useEffect(() => {
		setCurrentGrid(puzzle.map(row => [...row]))
	}, [puzzle])

	const handleCellClick = (r: number, c: number) => {
		const current = currentGrid[r][c]
		const next: Cell = current === null ? '🍋' : current === '🍋' ? '🫐' : null

		const updated = [...currentGrid]
		updated[r] = [...updated[r]]
		updated[r][c] = next
		setCurrentGrid(updated)
	}

	// Constraint'leri kolay erişim için map'e koy
	const constraintMap = new Map<string, ConstraintType>()
	for (const c of constraints) {
		const key1 = `${c.from[0]}-${c.from[1]}-${c.to[0]}-${c.to[1]}`
		const key2 = `${c.to[0]}-${c.to[1]}-${c.from[0]}-${c.from[1]}`
		constraintMap.set(key1, c.type)
		constraintMap.set(key2, c.type)
	}

	const formatConstraint = (val: string) => {
		if (val.toLowerCase() === 'x') return '×'
		if (val === '=') return '='
		return val
	}

	// Eğer puzzle boşsa, hiçbir şey render etme
	if (size === 0 || currentGrid.length === 0) {
		return null
	}

	return (
		<div className="inline-block relative">
			{/* Grid */}
			<div
				className="border-2 border-gray-800"
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${size}, 50px)`,
					gridTemplateRows: `repeat(${size}, 50px)`,
				}}
			>
				{currentGrid.map((row, r) =>
					row.map((cell, c) => (
						<ClickableCell
							key={`cell-${r}-${c}`}
							value={cell}
                            locked={puzzle[r] && puzzle[r][c] !== null}
							onClick={() => handleCellClick(r, c)}
						/>
					))
				)}
			</div>

			{/* Constraints - yatay */}
			{Array.from({ length: size }).map((_, r) =>
				Array.from({ length: size - 1 }).map((_, c) => {
					const constraint = constraintMap.get(`${r}-${c}-${r}-${c + 1}`)
					if (!constraint) return null

					return (
						<div
							key={`h-constraint-${r}-${c}`}
							className="absolute flex items-center justify-center text-2xl font-bold text-red-600 bg-white rounded-full border-2 border-white"
							style={{
								left: `${(c + 1) * 50 - 10}px`,
								top: `${r * 50 + 15}px`,
								width: '20px',
								height: '20px',
								userSelect: 'none',
							}}
						>
							{formatConstraint(constraint)}
						</div>
					)
				})
			)}

			{/* Constraints - dikey */}
			{Array.from({ length: size - 1 }).map((_, r) =>
				Array.from({ length: size }).map((_, c) => {
					const constraint = constraintMap.get(`${r}-${c}-${r + 1}-${c}`)
					if (!constraint) return null

					return (
						<div
							key={`v-constraint-${r}-${c}`}
							className="absolute flex items-center justify-center text-2xl font-bold text-red-600 bg-white rounded-full border-2 border-white"
							style={{
								left: `${c * 50 + 15}px`,
								top: `${(r + 1) * 50 - 10}px`,
								width: '20px',
								height: '20px',
								userSelect: 'none',
							}}
						>
							{formatConstraint(constraint)}
						</div>
					)
				})
			)}
		</div>
	)
}
