'use client'

import React from 'react'
import type { PuzzleDetail, SaveButtonProps } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import axios from '@/app/lib/api/axios'

function generateHash(obj: unknown): string {
    const str = JSON.stringify(obj)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i)
        hash |= 0
    }
    return Math.abs(hash).toString()
}

export default function SaveButton({
    puzzle,
    constraints,
    solution,
    gridSize,
    difficulty,
    onSaved,
}: SaveButtonProps) {
    async function handleSave() {
        if (puzzle.length === 0 || solution.length === 0) return

        const puzzleHash = generateHash(puzzle)
        const newPuzzleData = {
            title: `Puzzle ${gridSize}x${gridSize} - ${difficulty} - ${puzzleHash}`,
            puzzle_data: puzzle,
            constraints,
            solution_data: solution,
            puzzle_hash: puzzleHash,
        }

        try {
            const { data } = await axios.post<PuzzleDetail>('/puzzles', newPuzzleData)
            console.log(data)

            if (onSaved) onSaved()
        } catch (error) {
            console.error('Kayıt işlemi sırasında hata:', error)
        }
    }

    return <Button onClick={handleSave}>Kaydet</Button>
}
