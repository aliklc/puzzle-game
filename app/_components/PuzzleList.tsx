'use client'

import { useState, useTransition, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { GameResponse, Cell, Constraint } from '@/app/lib/types'
import { getGameDetail } from '@/app/lib/api/Game/getGameDetail'

type Props = {
    initialData: GameResponse[];
    onSelect: (puzzle: Cell[][], constraints: Constraint[], solution: Cell[][] | undefined, gameId: number) => void;
    selectedGameId?: number | null;
};

export default function PuzzleList({ initialData, onSelect, selectedGameId }: Props) {
    const [selectedId, setSelectedId] = useState('')
    const [isPending, startTransition] = useTransition()

    // selectedGameId prop'una göre selectedId'yi güncelle
    useEffect(() => {
        setSelectedId(selectedGameId ? selectedGameId.toString() : '')
    }, [selectedGameId])

    function handleValueChange(id: string) {
        if (!id || id === 'empty') return

        setSelectedId(id)

        startTransition(async () => {
            try {
                const data = await getGameDetail(Number(id))
                if (data && data.data) {
                    // data.data: { puzzle_data, constraints, solution_data, ... }
                    onSelect(
                        data.data.puzzle_data,
                        data.data.constraints,
                        data.data.solution_data,
                        Number(id)
                    )
                } else {
                    alert('Oyun detayı yüklenemedi.')
                }
            } catch {
                alert('Oyun detayı yüklenemedi.')
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
                    initialData.map((game) => (
                        <SelectItem key={game.id} value={game.id.toString()}>
                            {game.name || 'İsimsiz Oyun'}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    )
}
