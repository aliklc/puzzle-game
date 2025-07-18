'use client'

interface PuzzleGridProps {
    puzzle: (string | null)[][]
}

export default function PuzzleGrid({ puzzle }: PuzzleGridProps) {
    if (puzzle.length === 0) return null

    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${puzzle.length}, 40px)`,
                gap: '2px',
            }}
        >
            {puzzle.map((row, r) =>
                row.map((cell, c) => (
                    <div
                        key={`${r}-${c}`}
                        className="w-10 h-10 flex items-center justify-center border text-xl font-semibold bg-white"
                    >
                        {cell ?? ''}
                    </div>
                ))
            )}
        </div>
    )
}
