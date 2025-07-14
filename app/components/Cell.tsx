'use client'
import React from 'react'
import { Fruit } from '../lib/constants'

interface CellProps {
  fruit: Fruit
  onClick: () => void
  invalid?: boolean
}

export default function Cell({ fruit, onClick, invalid }: CellProps) {
  const bgColor = invalid
    ? 'bg-red-500'
    : 'bg-gray-100'

  const emoji =
    fruit === 'lemon' ? '🍋' :
    fruit === 'blueberry' ? '🫐' :
    ''

  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 border border-gray-300 flex items-center justify-center cursor-pointer ${bgColor}`}
    >
      {emoji}
    </div>
  )
}

