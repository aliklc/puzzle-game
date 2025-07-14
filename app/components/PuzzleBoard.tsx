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

    // YATAY kontrol
    let horizontal = 1
    if (col > 0 && board[row][col - 1] === fruit) horizontal++
    if (col > 1 && board[row][col - 2] === fruit && board[row][col - 1] === fruit) horizontal = 3
    if (col < 5 && board[row][col + 1] === fruit) horizontal++
    if (col < 4 && board[row][col + 1] === fruit && board[row][col + 2] === fruit) horizontal = 3
    if (horizontal >= 3) return true

    // DİKEY kontrol
    let vertical = 1
    if (row > 0 && board[row - 1][col] === fruit) vertical++
    if (row > 1 && board[row - 2][col] === fruit && board[row - 1][col] === fruit) vertical = 3
    if (row < 5 && board[row + 1][col] === fruit) vertical++
    if (row < 4 && board[row + 1][col] === fruit && board[row + 2][col] === fruit) vertical = 3
    if (vertical >= 3) return true

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
