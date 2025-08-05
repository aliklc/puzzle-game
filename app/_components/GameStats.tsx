'use client'

interface GameStatsProps {
    attempts: number
    score: number | null
}

export default function GameStats({ 
    attempts, 
    score
}: GameStatsProps) {
    return (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🎯 Deneme: {attempts}</span>
            {score !== null && (
                <span className="text-lg font-bold text-green-600">
                    🏆 Puan: {score}
                </span>
            )}
        </div>
    )
}
