'use client'

import {useState, useTransition } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { PuzzleListProps } from '@/app/lib/types'
import { fetchPuzzleDetailAction } from '@/app/lib/api/Puzzle/PuzzleDetailAction'



export default function PuzzleList({ initialData, onSelect }: PuzzleListProps) {
    const [selectedId, setSelectedId] = useState('');
    const [isPending, startTransition] = useTransition();

    function handleValueChange(id: string) {
        if (!id || id === 'empty') return;
        
        setSelectedId(id);
        //düşük öncelikli iş yapmak için
        startTransition(async () => {
            const result = await fetchPuzzleDetailAction(id);
            
            if (result.success && result.data) {
                onSelect(
                    result.data.puzzle_data, 
                    result.data.constraints, 
                    result.data.solution_data
                );
            } else {
                alert(result.error || "Bulmaca detayı yüklenemedi.");
            }
        });
    }

    const placeholderText = isPending ? "Yükleniyor..." : "Bulmacalar";

    return (
        <Select value={selectedId} onValueChange={handleValueChange} disabled={isPending}>
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