'use client'

import { useState, useTransition } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { PuzzleListProps } from '@/app/lib/types'
import { fetchPuzzleDetailServerAction } from '../../lib/api/actions/fetchPuzzleDetailServerAction'

export default function PuzzleList({ initialData, onSelect }: PuzzleListProps) {
    const [selectedId, setSelectedId] = useState('')
    const [isPending, startTransition] = useTransition()

    function handleValueChange(id: string) {
        if (!id || id === 'empty') return

        setSelectedId(id)

        startTransition(async () => {
            const result = await fetchPuzzleDetailServerAction(id)

            if (result.success && result.data) {
                onSelect(
                    result.data.puzzle_data,
                    result.data.constraints,
                    result.data.solution_data
                )
            } else {
                alert(result.error || 'Bulmaca detayı yüklenemedi.')
            }
        })
    }

    return (
        <Select value={selectedId} onValueChange={handleValueChange} disabled={isPending}>
            <SelectTrigger className="w-40">
                <SelectValue placeholder={isPending ? 'Yükleniyor...' : 'Bulmacalar'} />
            </SelectTrigger>
            <SelectContent>
                {initialData.length === 0 ? (
                    <SelectItem value="empty" disabled>
                        Hiç bulmaca yok
                    </SelectItem>
                ) : (
                    initialData.map((puzzle) => (
                        <SelectItem key={puzzle.id} value={puzzle.id.toString()}>
                            {puzzle.title || 'İsimsiz Bulmaca'}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    )
}
