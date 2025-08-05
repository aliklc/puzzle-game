'use client'

interface GameStatsProps {
    attempts: number
    score: number | null
    completedTime?: number | null
}

export default function GameStats({ 
    attempts, 
    score,
    completedTime
}: GameStatsProps) {
    return (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🎯 Deneme: {attempts}</span>
            {score !== null && (
                <span className="text-lg font-bold text-green-600">
                    🏆 Puan: {score}
                </span>
            )}
            {completedTime !== undefined && completedTime !== null && (
                <span className="text-lg font-bold text-blue-600">
                    ⏱️ Süre: {Math.floor(completedTime / 60)}:{(completedTime % 60).toString().padStart(2, '0')}
                </span>
            )}
        </div>
    )
}
