'use client'

import React, { useEffect, useState } from 'react'
import type { PuzzleDetail, PuzzleListProps, PuzzleSummary } from '@/app/lib/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import axios from 'axios'

export default function PuzzleList({ onSelect, refreshKey }: PuzzleListProps) {
    const [puzzleSummaries, setPuzzleSummaries] = useState<PuzzleSummary[]>([])
    const [selectedId, setSelectedId] = useState<string>('')

    useEffect(() => {
        async function fetchPuzzleSummaries() {
            try {
                const { data } = await axios.get<PuzzleSummary[]>('/api/puzzles')
                setPuzzleSummaries(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error('Puzzle özetleri getirilirken hata:', err)
                setPuzzleSummaries([])
            }
        }
        fetchPuzzleSummaries()
    }, [refreshKey])

    async function fetchPuzzleDetail(id: string) {
        try {
            const { data } = await axios.get<PuzzleDetail>(`/api/puzzles/${id}`)
            onSelect(data.puzzle_data, data.constraints, data.solution_data)
        } catch (err) {
            console.error('Puzzle detayları getirilirken hata:', err)
        }
    }

    function handleValueChange(value: string) {
        setSelectedId(value)
        fetchPuzzleDetail(value)
    }

    return (
        <Select value={selectedId} onValueChange={handleValueChange}>
            <SelectTrigger className="w-40">
                <SelectValue placeholder="Bulmacalar" />
            </SelectTrigger>
            <SelectContent>
                {puzzleSummaries.length === 0 ? (
                    <SelectItem value="empty" disabled>
                        Hiç bulmaca yok
                    </SelectItem>
                ) : (
                    puzzleSummaries.map((puzzle) => (
                        <SelectItem key={puzzle.id} value={puzzle.id.toString()}>
                            {puzzle.title || 'İsimsiz Bulmaca'}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    )
}
