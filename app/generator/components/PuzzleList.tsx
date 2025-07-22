'use client'

import React, { useEffect, useState } from 'react'
import type { Cell, Constraint } from '@/app/lib/types'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface PuzzleListProps {
	onSelect: (puzzle: Cell[][], constraints: Constraint[], solution: Cell[][]) => void
	refreshKey?: number
}

interface PuzzleRow {
	id: number
	title: string
	puzzle_data: Cell[][]
	solution_data: Cell[][]
	constraints: Constraint[]
}

export default function PuzzleList({ onSelect, refreshKey }: PuzzleListProps) {
	const [savedPuzzles, setSavedPuzzles] = useState<PuzzleRow[]>([])
	const [selectedId, setSelectedId] = useState<string>('')

	useEffect(() => {
		async function fetchPuzzles() {
			try {
				const res = await fetch('/api/list')
				const data: PuzzleRow[] = await res.json()
				setSavedPuzzles(data)
			} catch (err) {
				console.error('Puzzles getirilirken hata:', err)
			}
		}
		fetchPuzzles()
	}, [refreshKey])

	function handleValueChange(value: string) {
		setSelectedId(value)
		const selectedPuzzle = savedPuzzles.find((p) => p.id.toString() === value)
		if (selectedPuzzle) {
			onSelect(selectedPuzzle.puzzle_data, selectedPuzzle.constraints, selectedPuzzle.solution_data)
		}
	}

	return (
		<Select value={selectedId || (savedPuzzles.length === 0 ? 'empty' : undefined)} onValueChange={handleValueChange}>
			<SelectTrigger className="w-40">
				<SelectValue placeholder="Bulmacalar" />
			</SelectTrigger>
			<SelectContent>
				{savedPuzzles.length === 0 ? (
					<SelectItem value="empty" disabled>
						Hiç bulmaca yok
					</SelectItem>
				) : (
					savedPuzzles.map((p) => (
						<SelectItem key={p.id} value={p.id.toString()}>
							{p.title}
						</SelectItem>
					))
				)}
			</SelectContent>
		</Select>
	)
}
