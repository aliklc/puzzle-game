// app/generator/components/SaveButton.tsx
'use client'

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import type { SaveButtonProps } from '@/app/lib/types'
import { createGame } from '@/app/lib/api/Game/createGame'
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
    onSuccess,
    onSave
}: SaveButtonProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleSave() {
        if (!puzzle || puzzle.length === 0) {
            alert('There is no puzzle to save. Please create a puzzle first.')
            return
        }

        const puzzleHash = generateHash(puzzle)
        const name = `Puzzle ${gridSize}x${gridSize} - ${difficulty} - ${puzzleHash}`
        startTransition(async () => {
            try {
                const gameData = {
                    name,
                    type: 'fruit', // veya oyun tipiniz neyse
                    description: `Otomatik oluşturulan puzzle (${difficulty})`,
                    data: {
                        puzzle_data: puzzle,
                        constraints,
                        solution_data: solution,
                        gridSize,
                        difficulty
                    },
                    game_hash: puzzleHash
                }
                const result = await createGame(gameData)
                if (result) {
                    console.log('Başarıyla kaydedildi:', result)
                    onSuccess?.()
                    onSave?.(result.id) // Kaydedilen game ID'sini parent'a gönder
                    router.refresh()
                } else {
                    alert('Kayıt sırasında hata oluştu')
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
