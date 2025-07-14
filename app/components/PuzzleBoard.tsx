'use client'
import React, { useState } from 'react'
import Cell from './Cell'
import { Fruit, fruits } from '../lib/constants'
import { samplePuzzle } from '../lib/puzzles'

export default function PuzzleBoard() {
    const [board, setBoard] = useState<Fruit[][]>(samplePuzzle.initialBoard);
    const initialPuzzleState = samplePuzzle.initialBoard;
    const constraints = samplePuzzle.constraints;

    const toggleFruit = (row: number, col: number) => {
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

        // Ardışık 3 veya daha fazla aynı meyve kontrolü
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
    
        // Satır/sütun maksimum sayı kontrolü
        const rowCount = board[row].filter(f => f === fruit).length;
        const colCount = board.map(r => r[col]).filter(f => f === fruit).length;

        const maxPerType = board.length / 2;
        if (rowCount > maxPerType || colCount > maxPerType) return true;

        // Constraint ihlali kontrolü
        for (const constraint of constraints) {
            const { type, cell1, cell2 } = constraint;
            
            if ((cell1.row === row && cell1.col === col) || (cell2.row === row && cell2.col === col)) {
                const fruit1 = board[cell1.row][cell1.col];
                const fruit2 = board[cell2.row][cell2.col];
                
                if (fruit1 && fruit2) {
                    if (type === 'equal' && fruit1 !== fruit2) return true;
                    if (type === 'different' && fruit1 === fruit2) return true;
                }
            }
        }

        return false;
    }



    return (
        <div className="w-fit mx-auto mt-10">
            <div className="relative">
                {/* Ana grid - hücreler */}
                <div className="grid grid-cols-6 gap-2 p-4">
                    {board.flatMap((row, rowIndex) =>
                        row.map((fruit, colIndex) => {
                            const isLocked = initialPuzzleState[rowIndex][colIndex] !== null;
                            
                            return (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    fruit={fruit}
                                    onClick={() => toggleFruit(rowIndex, colIndex)}
                                    invalid={isInvalidCell(board, rowIndex, colIndex)}
                                    locked={isLocked}
                                />
                            )
                        })
                    )}
                </div>
                
                {/* Constraint'ler için overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    {constraints.map((constraint, index) => {
                        const { cell1, cell2 } = constraint;
                        
                        // Hücre pozisyonlarını hesapla (16px padding + 64px cell + 8px gap)
                        const cellSize = 64;
                        const gap = 8;
                        const padding = 16;
                        
                        const x1 = padding + cell1.col * (cellSize + gap) + cellSize / 2;
                        const y1 = padding + cell1.row * (cellSize + gap) + cellSize / 2;
                        const x2 = padding + cell2.col * (cellSize + gap) + cellSize / 2;
                        const y2 = padding + cell2.row * (cellSize + gap) + cellSize / 2;
                        
                        // Orta nokta
                        const midX = (x1 + x2) / 2;
                        const midY = (y1 + y2) / 2;
                        
                        return (
                            <div
                                key={index}
                                className="absolute bg-white border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                                style={{
                                    left: `${midX - 12}px`,
                                    top: `${midY - 12}px`,
                                }}
                            >
                                {constraint.type === 'equal' ? '=' : '×'}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}