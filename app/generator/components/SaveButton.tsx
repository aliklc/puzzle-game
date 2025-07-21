'use client'

import React from 'react'
import type { Cell, Constraint, SavedPuzzle } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { DifficultyLevel } from '@/app/lib/difficultyConfig'

interface SaveButtonProps {
	puzzle: Cell[][]
	constraints: Constraint[]
	solution: Cell[][]
	gridSize: number
	difficulty: DifficultyLevel
}

export default function SaveButton({ puzzle, constraints, solution, gridSize, difficulty }: SaveButtonProps) {
	function handleSave() {
		if (puzzle.length === 0 || solution.length === 0) {
			return
		}

		// Mevcut kayıtları çek
		const existing = localStorage.getItem('tangly_puzzles')
		const puzzleList: SavedPuzzle[] = existing ? JSON.parse(existing) : []


		const id = generatePuzzleId(solution)

		// Daha önce kaydedilmişse engelle
		const alreadySaved = puzzleList.some((p) => p.id === id)
		if (alreadySaved) {
			return
		}

		const newPuzzleData: SavedPuzzle = {
			id,
			puzzle,
			constraints,
			solution,
			gridSize,
			difficulty,
		}

		puzzleList.push(newPuzzleData)
		localStorage.setItem('tangly_puzzles', JSON.stringify(puzzleList))

	}

	function generatePuzzleId(solution: Cell[][]): number {
		const json = JSON.stringify(solution)
		let hash = 0
		for (let i = 0; i < json.length; i++) {
			hash = (hash << 5) - hash + json.charCodeAt(i)
			hash |= 0
		}
		return Math.abs(hash)
	}

	return <Button onClick={handleSave}>Kaydet</Button>
}
