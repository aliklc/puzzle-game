'use client'

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { PuzzleDetail, PuzzleListProps, PuzzleSummary } from '@/app/lib/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function fetchPuzzleSummaries(): Promise<PuzzleSummary[]> {
    const { data } = await axios.get('/api/puzzles')
    return data
}

async function fetchPuzzleDetail(id: string): Promise<PuzzleDetail> {
    const { data } = await axios.get(`/api/puzzles/${id}`)
    return data
}

export default function PuzzleList({ onSelect, refreshKey }: PuzzleListProps) {
    const [selectedId, setSelectedId] = React.useState('')

    const { data: summaries = [], isLoading } = useQuery({
        queryKey: ['puzzle-summaries', refreshKey],
        queryFn: fetchPuzzleSummaries,
    })

    async function handleValueChange(id: string) {
        setSelectedId(id)
        const detail = await fetchPuzzleDetail(id)
        onSelect(detail.puzzle_data, detail.constraints, detail.solution_data)
    }

    return (
        <Select value={selectedId} onValueChange={handleValueChange}>
            <SelectTrigger className="w-40">
                <SelectValue placeholder={isLoading ? "Yükleniyor..." : "Bulmacalar"} />
            </SelectTrigger>
            <SelectContent>
                {summaries.length === 0 ? (
                    <SelectItem value="empty" disabled>
                        Hiç bulmaca yok
                    </SelectItem>
                ) : (
                    summaries.map((puzzle) => (
                        <SelectItem key={puzzle.id} value={puzzle.id.toString()}>
                            {puzzle.title || 'İsimsiz Bulmaca'}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    )
}
