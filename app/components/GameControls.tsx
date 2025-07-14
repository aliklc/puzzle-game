'use client'
import React from 'react'

interface GameControlsProps {
    onUndo: () => void;
    onClear: () => void;    
    canUndo: boolean;
}

export default function GameControls({ 
    onUndo, 
    onClear, 
    canUndo,
}: GameControlsProps) {
    return (
        <div className="flex flex-col gap-4 mb-6">

            <div className="flex gap-2 justify-center">
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        canUndo 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    ↶ Undo
                </button>
                <button
                    onClick={onClear}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                    🗑️ Clear
                </button>
            </div>
        </div>
    )
}