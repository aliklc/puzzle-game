'use client'
import React, { useState } from 'react'
import Cell from './Cell'
import { Fruit, fruits } from '../lib/constants'

export default function PuzzleBoard() {
    const [board, setBoard] = useState<Fruit[][]>(
        Array.from({ length: 6 }, () => Array(6).fill(null))
    )

    const toggleFruit = (row: number, col: number) => {
        setBoard(prev => {
        const newBoard = prev.map(r => [...r])
        const current = newBoard[row][col]
        const currentIndex = fruits.indexOf(current)
        const nextIndex = (currentIndex + 1) % fruits.length
        newBoard[row][col] = fruits[nextIndex]
        return newBoard
        })
    }

    const isInvalidCell = (board: Fruit[][], row: number, col: number): boolean => {
        const fruit = board[row][col]
        if (!fruit) return false

        // ✅ 1. Kural: 3 ardışık aynı meyve (yatay-dikey)
        const countInDirection = (dr: number, dc: number) => {
            let r = row + dr
            let c = col + dc
            let count = 0
            while (
            r >= 0 && r < 6 &&
            c >= 0 && c < 6 &&
            board[r][c] === fruit
            ) {
            count++
            r += dr
            c += dc
            }
            return count
        }

        const horizontalCount = 1 + countInDirection(0, -1) + countInDirection(0, 1)
        const verticalCount = 1 + countInDirection(-1, 0) + countInDirection(1, 0)

        if (horizontalCount >= 3 || verticalCount >= 3) return true

        return false
    }

  return (
    <div className="grid grid-cols-6 gap-1 w-fit mx-auto mt-10">
      {board.flatMap((row, rowIndex) =>
        row.map((fruit, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            fruit={fruit}
            onClick={() => toggleFruit(rowIndex, colIndex)}
            invalid={isInvalidCell(board, rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}
