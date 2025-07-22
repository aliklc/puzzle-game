'use client'

import React from 'react'
import type { Cell, Constraint } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { DifficultyLevel } from '@/app/lib/difficultyConfig'

interface SaveButtonProps {
	puzzle: Cell[][]
	constraints: Constraint[]
	solution: Cell[][]
	gridSize: number
	difficulty: DifficultyLevel
	onSaved?: () => void
}

export default function SaveButton({ puzzle, constraints, solution, gridSize, difficulty,onSaved }: SaveButtonProps) {
	async function handleSave() {
		if (puzzle.length === 0 || solution.length === 0) return

		const id = generatePuzzleId(solution)

		const newPuzzleData = {
			id,
			puzzle,
			constraints,
			solution,
			gridSize,
			difficulty,
		}

		// ✅ veritabanına gönder
		const res = await fetch('/api/save', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newPuzzleData),
		})

		if (res.ok) {
			if (onSaved) onSaved()
		} else {
			console.error('Veritabanına kaydedilemedi.')
		}
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
