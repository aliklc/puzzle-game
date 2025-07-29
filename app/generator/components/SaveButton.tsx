'use client'

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import type { SaveButtonProps } from '@/app/lib/types'
import { savePuzzleAction } from '@/app/lib/api/Puzzle/SavePuzzle'
import { useRouter } from 'next/navigation'

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
}: SaveButtonProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleSave() {
        if (!puzzle || puzzle.length === 0) {
            alert('There is no puzzle to save. Please create a puzzle first.')
            return
        }

        const puzzleHash = generateHash(puzzle)
        const title = `Puzzle ${gridSize}x${gridSize} - ${difficulty} - ${puzzleHash}`

        startTransition(async () => {
            try {
                const formData = new FormData()
                formData.append('title', title)
                formData.append('puzzle_data', JSON.stringify(puzzle))
                formData.append('constraints', JSON.stringify(constraints))
                formData.append('solution_data', JSON.stringify(solution))
                formData.append('puzzle_hash', puzzleHash)

                const result = await savePuzzleAction(formData)

                if (result.success) {
                    console.log('Başarıyla kaydedildi:', result.data)
                    router.refresh()
                } else {
                    alert(result.error || 'Kayıt sırasında hata oluştu')
                }
            } catch (error) {
                alert('Kayıt isteği başarısız: ' + (error as Error).message)
            }
        })
    }

    return (
        <Button onClick={handleSave} disabled={isPending}>
            {isPending ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
    )
}
