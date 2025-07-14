'use client'
import React, { useState } from 'react'
import Cell from './Cell'
import { Fruit, fruits } from '../lib/constants'
// YENİ: Puzzle verisini ve tipini import ediyoruz.
import { Puzzle, samplePuzzle } from '../lib/puzzles'

export default function PuzzleBoard() {
    // DEĞİŞİKLİK: State'i artık boş bir dizi yerine puzzle verisinden başlatıyoruz.
    const [board, setBoard] = useState<Fruit[][]>(samplePuzzle.initialBoard);

    // YENİ: Kilitli hücreleri kontrol etmek için puzzle'ın başlangıç durumunu bir değişkende tutuyoruz.
    // Bu, component her render olduğunda puzzle dosyasını tekrar okumamak için iyi bir pratiktir.
    const initialPuzzleState = samplePuzzle.initialBoard;

    // DEĞİŞİKLİK: toggleFruit fonksiyonuna kilitli hücre kontrolü ekliyoruz.
    const toggleFruit = (row: number, col: number) => {
        // Eğer tıkladığımız hücre, başlangıç bulmacasında doluysa, hiçbir şey yapma.
        if (initialPuzzleState[row][col] !== null) {
            return;
        }

        setBoard(prev => {
            const newBoard = prev.map(r => [...r]);
            const current = newBoard[row][col];
            const currentIndex = fruits.indexOf(current);
            const nextIndex = (currentIndex + 1) % fruits.length;
            newBoard[row][col] = fruits[nextIndex];
            return newBoard;
        });
    }

    const isInvalidCell = (board: Fruit[][], row: number, col: number): boolean => {
        const fruit = board[row][col];
        if (!fruit) return false;

        const countInDirection = (dr: number, dc: number) => {
            let r = row + dr;
            let c = col + dc;
            let count = 0;
            while (
                r >= 0 && r < 6 &&
                c >= 0 && c < 6 &&
                board[r][c] === fruit
            ) {
                count++;
                r += dr;
                c += dc;
            }
            return count;
        }

        const horizontalCount = 1 + countInDirection(0, -1) + countInDirection(0, 1);
        const verticalCount = 1 + countInDirection(-1, 0) + countInDirection(1, 0);

        if (horizontalCount >= 3 || verticalCount >= 3) return true;
    
        const rowCount = board[row].filter(f => f === fruit).length;
        const colCount = board.map(r => r[col]).filter(f => f === fruit).length;

        const maxPerType = board.length / 2;
        if (rowCount > maxPerType || colCount > maxPerType) return true;

        return false;
    }

    return (
        <div className="grid grid-cols-6 gap-1 w-fit mx-auto mt-10">
            {board.flatMap((row, rowIndex) =>
                row.map((fruit, colIndex) => {
                    // YENİ: Hücrenin kilitli olup olmadığını kontrol ediyoruz.
                    const isLocked = initialPuzzleState[rowIndex][colIndex] !== null;
                    
                    return (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            fruit={fruit}
                            onClick={() => toggleFruit(rowIndex, colIndex)}
                            invalid={isInvalidCell(board, rowIndex, colIndex)}
                            // YENİ: 'locked' prop'unu Cell bileşenine gönderiyoruz.
                            locked={isLocked}
                        />
                    )
                })
            )}
        </div>
    )
}