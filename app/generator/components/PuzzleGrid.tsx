'use client'

import React from 'react'
import { Constraint, ConstraintType } from '@/app/lib/types'

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

    // Constraint görselini düzenle
    const formatConstraint = (val: string) => {
        if (val === 'x' || val === 'X') return '×'
        if (val === '=') return '='
        return val
    }

    return (
        <div className="inline-block relative">
            {/* Ana puzzle grid */}
            <div
                className="border-2 border-gray-800"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${size}, 50px)`,
                    gridTemplateRows: `repeat(${size}, 50px)`,
                    gap: '0px',
                }}
            >
                {puzzle.map((row, r) =>
                    row.map((cell, c) => (
                        <div
                            key={`cell-${r}-${c}`}
                            className="w-12 h-12 flex items-center justify-center border border-gray-400 text-xl font-semibold bg-white"
                        >
                            {cell ?? ''}
                        </div>
                    ))
                )}
            </div>

            {/* Constraint overlay - yatay */}
            {Array.from({ length: size }).map((_, r) =>
                Array.from({ length: size - 1 }).map((_, c) => {
                    const constraint = constraintMap.get(`${r}-${c}-${r}-${c + 1}`)
                    if (!constraint) return null
                    
                    return (
                        <div
                            key={`h-constraint-${r}-${c}`}
                            className="absolute flex items-center justify-center text-2xl font-bold text-red-600 bg-white rounded-full border-2 border-white"
                            style={{
                                left: `${(c + 1) * 50 - 10}px`,
                                top: `${r * 50 + 15}px`,
                                width: '20px',
                                height: '20px',
                            }}
                        >
                            {formatConstraint(constraint)}
                        </div>
                    )
                })
            )}

            {/* Constraint overlay - dikey */}
            {Array.from({ length: size - 1 }).map((_, r) =>
                Array.from({ length: size }).map((_, c) => {
                    const constraint = constraintMap.get(`${r}-${c}-${r + 1}-${c}`)
                    if (!constraint) return null
                    
                    return (
                        <div
                            key={`v-constraint-${r}-${c}`}
                            className="absolute flex items-center justify-center text-2xl font-bold text-red-600 bg-white rounded-full border-2 border-white"
                            style={{
                                left: `${c * 50 + 15}px`,
                                top: `${(r + 1) * 50 - 10}px`,
                                width: '20px',
                                height: '20px',
                            }}
                        >
                            {formatConstraint(constraint)}
                        </div>
                    )
                })
            )}
        </div>
    )
}