'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import type { PuzzleDetail, SaveButtonProps } from '@/app/lib/types'
import { useMutation } from '@tanstack/react-query'
import { savePuzzle } from '@/app/lib/actions'

// Helper function
function generateHash(obj: unknown): string {
    const str = JSON.stringify(obj);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString();
}

type SavePuzzleInput = Omit<PuzzleDetail, 'id'>;
type SavePuzzleResult = Awaited<ReturnType<typeof savePuzzle>>;

export default function SaveButton({
    puzzle,
    constraints,
    solution,
    gridSize,
    difficulty,
    onSaved,
}: SaveButtonProps) {
    const mutation = useMutation<SavePuzzleResult, Error, SavePuzzleInput>({
        mutationFn: savePuzzle,
        onSuccess: (result) => {
            if (result.success) {
                console.log('Başarıyla kaydedildi:', result.data);
                if (onSaved) onSaved();
            } else {
                console.error('Kayıt hatası:', result.error);
                alert(`Hata: ${result.error}`);
            }
        },
        onError: (err) => {
            console.error('Mutasyon hatası:', err);
            alert(`Bir hata oluştu: ${err.message}`);
        },
    });

    function handleSave() {
        if (!puzzle || puzzle.length === 0) {
            alert('Kaydedilecek bir bulmaca yok. Lütfen önce bir bulmaca oluşturun.');
            return;
        }

        const puzzleHash = generateHash(puzzle);
        const newPuzzleData: SavePuzzleInput = {
            title: `Puzzle ${gridSize}x${gridSize} - ${difficulty} - ${puzzleHash}`,
            puzzle_data: puzzle,
            constraints,
            solution_data: solution,
            puzzle_hash: puzzleHash,
        };
        mutation.mutate(newPuzzleData);
    }

    return (
        <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
    );
}