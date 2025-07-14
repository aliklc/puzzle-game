'use client'
import React, { useState, useEffect } from 'react'
import Cell from './Cell'
import { Fruit, fruits } from '../lib/constants'
import { samplePuzzle } from '../lib/puzzles'
import { checkPuzzleComplete,isInvalidCell } from '../lib/GameLogic'
import GameControls from './GameControls'


interface Move {
    row: number;
    col: number;
    previousValue: Fruit;
    newValue: Fruit;
}

export default function PuzzleBoard() {
    const [board, setBoard] = useState<Fruit[][]>(samplePuzzle.initialBoard);
    const [isComplete, setIsComplete] = useState(false);
    const [moveHistory, setMoveHistory] = useState<Move[]>([]);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const initialPuzzleState = samplePuzzle.initialBoard;
    const constraints = samplePuzzle.constraints;

    const toggleFruit = (row: number, col: number) => {
        if (initialPuzzleState[row][col] !== null) {
            return;
        }
        if (!timerActive) setTimerActive(true);

        setBoard(prev => {
            const newBoard = prev.map(r => [...r]);
            const current = newBoard[row][col];
            const currentIndex = fruits.indexOf(current);
            const nextIndex = (currentIndex + 1) % fruits.length;
            const newValue = fruits[nextIndex];

            const move: Move = {
                row,
                col,
                previousValue: current,
                newValue: newValue
            };

            setMoveHistory(prevHistory => [...prevHistory, move]);
            
            newBoard[row][col] = newValue;
            return newBoard;
        });
    }

    const handleUndo = () => {
        if (moveHistory.length === 0) return;

        const lastMove = moveHistory[moveHistory.length - 1];
        
        setBoard(prev => {
            const newBoard = prev.map(r => [...r]);
            newBoard[lastMove.row][lastMove.col] = lastMove.previousValue;
            return newBoard;
        });

        setMoveHistory(prev => prev.slice(0, -1));
    }

    const handleClear = () => {
        // Sadece kullanıcının yerleştirdiği meyveleri temizle
        setBoard(prev => {
            const newBoard = prev.map(r => [...r]);
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 6; col++) {
                    if (initialPuzzleState[row][col] === null) {
                        newBoard[row][col] = null;
                    }
                }
            }
            return newBoard;
        });
        setMoveHistory([]);
        setSecondsElapsed(0);
        setTimerActive(false);

    }

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, '0')
        const seconds = (totalSeconds % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    const formattedTime = formatTime(secondsElapsed)


    // Board değiştiğinde tamamlanma kontrolü yap
    useEffect(() => {
        const complete = checkPuzzleComplete(board, constraints);
        setIsComplete(complete);
        if (complete) {
            setTimerActive(false); // süreyi durdur
        }
    }, [board, constraints]);


    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (timerActive) {
            timer = setInterval(() => {
                setSecondsElapsed(prev => prev + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [timerActive]);


    return (
        <div className="w-fit mx-auto mt-5 mb-20 rounded-2xl bg-blue-100 p-4">

            <div className="text-center text-gray-700 text-lg font-semibold mb-5">
                Süre: {formattedTime}
            </div>

            {/* Tamamlanma mesajı */}
            {isComplete && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-green-800">🎉 Tebrikler! 🎉</h2>
                    <p className="text-green-700">
                        Bulmacayı başarıyla tamamladınız! <br />
                        Süreniz: <strong>{formattedTime}</strong>
                    </p>
                </div>
            )}

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
                                    invalid={isInvalidCell(board, rowIndex, colIndex,constraints)}
                                    locked={isLocked}
                                />
                            )
                        })
                    )}
                </div>
                <GameControls
                    onUndo={handleUndo}
                    onClear={handleClear}
                    canUndo={moveHistory.length > 0}
                />
                
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