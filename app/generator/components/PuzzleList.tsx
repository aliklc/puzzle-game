'use client'

import React, { useEffect, useState } from 'react'
import type { Cell, Constraint, SavedPuzzle } from '@/app/lib/types'
import { Button } from '@/components/ui/button'

interface PuzzleListProps {
	onSelect: (puzzle: Cell[][], constraints: Constraint[], solution: Cell[][]) => void
}

export default function PuzzleList({ onSelect }: PuzzleListProps) {
	const [savedPuzzles, setSavedPuzzles] = useState<SavedPuzzle[]>([])

	useEffect(() => {
		const saved = localStorage.getItem('tangly_puzzles')
		if (saved) {
			setSavedPuzzles(JSON.parse(saved))
		}
	}, [])

	return (
		<div className="w-full max-w-xs space-y-2 border rounded-lg p-4 bg-white shadow">
			<h2 className="text-lg font-bold mb-2">📁 Kayıtlı Bulmacalar</h2>
			{savedPuzzles.length === 0 ? (
				<p className="text-sm">Hiç bulmaca kaydedilmemiş.</p>
			) : (
				savedPuzzles.map((p) => (
					<Button
						key={p.id}
						variant="outline"
						className="w-full justify-start text-left"
						onClick={() => onSelect(p.puzzle, p.constraints, p.solution)}
					>
						{p.gridSize}x{p.gridSize} - {p.difficulty}
					</Button>
				))
			)}
		</div>
	)
}
