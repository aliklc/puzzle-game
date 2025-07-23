'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import type { PuzzleDetail, SaveButtonProps } from '@/app/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

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
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            const puzzleHash = generateHash(puzzle)
            const newPuzzleData = {
                title: `Puzzle ${gridSize}x${gridSize} - ${difficulty} - ${puzzleHash}`,
                puzzle_data: puzzle,
                constraints,
                solution_data: solution,
                puzzle_hash: puzzleHash,
            }

            const { data } = await axios.post<PuzzleDetail>('/api/puzzles', newPuzzleData)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['puzzle-summaries'] })
            if (onSaved) onSaved()
        },
        onError: (err) => {
            console.error('Kayıt hatası:', err)
        },
    })

    return <Button onClick={() => mutation.mutate()}>Kaydet</Button>
}
