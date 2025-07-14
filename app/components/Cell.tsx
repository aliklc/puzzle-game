'use client'
import React from 'react'
import { Fruit } from '../lib/constants'

interface CellProps {
    fruit: Fruit
    onClick: () => void
    invalid?: boolean
    locked?: boolean // YENİ: Kilitli hücreler için prop eklendi.
}

export default function Cell({ fruit, onClick, invalid, locked }: CellProps) {
    // DEĞİŞİKLİK: Arka plan rengini ve imleci 'locked' durumuna göre ayarlıyoruz.
    const bgColor = invalid
        ? 'bg-red-500'
        : 'bg-gray-100 hover:bg-gray-200'; // Normal, üzerine gelince değişen renk

    const cursor = locked ? 'cursor-not-allowed' : 'cursor-pointer';

    const emoji =
        fruit === 'lemon' ? '🍋' :
        fruit === 'blueberry' ? '🫐' :
        '';

    return (
        <div
            onClick={onClick}
            // DEĞİŞİKLİK: className'e yeni stilleri ekliyoruz.
            className={`w-16 h-16 border border-gray-400 flex items-center justify-center text-3xl ${bgColor} ${cursor}`}
        >
            {emoji}
        </div>
    )
}