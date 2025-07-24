'use client'

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { PuzzleListProps } from '@/app/lib/types'
import { fetchPuzzleDetail } from '@/app/lib/actions'

export default function PuzzleList({ initialData, onSelect }: PuzzleListProps) {
    const [selectedId, setSelectedId] = React.useState('');
    const [isFetching, setIsFetching] = React.useState(false);

    async function handleValueChange(id: string) {
        if (!id || id === 'empty') return;
        
        setSelectedId(id);
        setIsFetching(true);
        try {
            const detail = await fetchPuzzleDetail(id);
            onSelect(detail.puzzle_data, detail.constraints, detail.solution_data);
        } catch (error) {
            console.error("Failed to fetch puzzle detail:", error);
            alert("Bulmaca detayı yüklenemedi.");
        } finally {
            setIsFetching(false);
        }
    }

    const placeholderText = isFetching ? "Yükleniyor..." : "Bulmacalar";

    return (
        <Select value={selectedId} onValueChange={handleValueChange} disabled={isFetching}>
            <SelectTrigger className="w-40">
                <SelectValue placeholder={placeholderText} />
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
    );
}