'use client'

import { useState } from 'react'

type CellValue = 'blueberry' | 'lemon' | null

type Cell = {
  row: number
  col: number
  value: CellValue
}

export default function PuzzleBoard() {
const [grid, setGrid] = useState<Cell[][]>(
  Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 6 }, (_, col) => ({ row, col, value: null }))
  )
  
)
 
  const toggleCellValue = (row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({ ...c })))
      const cell = newGrid[row][col]
      if (cell.value === null) cell.value = 'blueberry'
      else if (cell.value === 'blueberry') cell.value = 'lemon'
      else cell.value = null
      return newGrid
    })
  }

  return (
    <div className="grid grid-cols-6 gap-1 w-fit mx-auto mt-10">
      {grid.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center text-2xl cursor-pointer select-none"
            onClick={() => toggleCellValue(rowIndex, colIndex)}
          >
            {cell.value === 'blueberry' ? '🫐' : cell.value === 'lemon' ? '🍋' : ''}
          </div>
        ))
      )}
    </div>
  )
}
