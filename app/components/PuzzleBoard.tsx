'use client'

export default function PuzzleBoard() {
  const grid = Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 6 }, (_, col) => ({
      row,
      col,
    }))
  )

  return (
    <div className="grid grid-cols-6 gap-1 w-fit mx-auto mt-10">
      {grid.flat().map(cell => (
        <div
          key={`${cell.row}-${cell.col}`}
          className="w-18 h-18 bg-gray-100 border border-gray-300 flex items-center justify-center"
        >

        </div>
      ))}
    </div>
  )
}
