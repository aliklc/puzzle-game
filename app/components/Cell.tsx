'use client'
import React from 'react'
import { Fruit } from '../lib/constants'

interface CellProps {
  fruit: Fruit
  onClick: () => void
}

export default function Cell({ fruit, onClick }: CellProps) {
  const bgColor =
    fruit === 'lemon' ? 'bg-yellow-300' :
    fruit === 'blueberry' ? 'bg-blue-600' :
    'bg-gray-100'

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
