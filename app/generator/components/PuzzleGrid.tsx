'use client'

import React from 'react'
import { Constraint,ConstraintType } from '@/app/lib/types'

interface PuzzleGridProps {
    puzzle: (string | null)[][]
    constraints: Constraint[]
}

export default function PuzzleGrid({ puzzle, constraints }: PuzzleGridProps) {
    if (puzzle.length === 0) return null

    const size = puzzle.length

    // constraints için kolay erişim Map
    const constraintMap = new Map<string, ConstraintType>()
    for (const c of constraints) {
        const key1 = `${c.from[0]}-${c.from[1]}-${c.to[0]}-${c.to[1]}`
        const key2 = `${c.to[0]}-${c.to[1]}-${c.from[0]}-${c.from[1]}`
        constraintMap.set(key1, c.type)
        constraintMap.set(key2, c.type)
    }

    const gridSize = size * 2 - 1

    return (
        <div
            className="inline-block"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 40px)`,
                gridTemplateRows: `repeat(${gridSize}, 40px)`,
                gap: '2px',
            }}
        >
            {Array.from({ length: gridSize }).map((_, gridRow) =>
                Array.from({ length: gridSize }).map((_, gridCol) => {
                    const isCellRow = gridRow % 2 === 0
                    const isCellCol = gridCol % 2 === 0

                    if (isCellRow && isCellCol) {
                        const r = gridRow / 2
                        const c = gridCol / 2
                        return (
                            <div
                                key={`cell-${r}-${c}`}
                                className="w-10 h-10 flex items-center justify-center border text-xl font-semibold bg-white"
                            >
                                {puzzle[r][c] ?? ''}
                            </div>
                        )
                    } else if (isCellRow && !isCellCol) {
                        const r = gridRow / 2
                        const c1 = (gridCol - 1) / 2
                        const c2 = c1 + 1
                        const val = constraintMap.get(`${r}-${c1}-${r}-${c2}`) ?? ''
                        return (
                            <div
                                key={`h-constraint-${r}-${c1}-${c2}`}
                                className="w-6 h-10 flex items-center justify-center text-lg font-bold"
                            >
                                {val}
                            </div>
                        )
                    } else if (!isCellRow && isCellCol) {
                        const r1 = (gridRow - 1) / 2
                        const r2 = r1 + 1
                        const c = gridCol / 2
                        const val = constraintMap.get(`${r1}-${c}-${r2}-${c}`) ?? ''
                        return (
                            <div
                                key={`v-constraint-${r1}-${r2}-${c}`}
                                className="w-10 h-6 flex items-center justify-center text-lg font-bold"
                            >
                                {val}
                            </div>
                        )
                    } else {
                        return <div key={`empty-${gridRow}-${gridCol}`} />
                    }
                })
            )}
        </div>
    )
}
