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

  return (
    <div className="grid grid-cols-6 gap-1 w-fit mx-auto mt-10">
      {board.flatMap((row, rowIndex) =>
        row.map((fruit, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            fruit={fruit}
            onClick={() => toggleFruit(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}
