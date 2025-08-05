'use client'

import { Button } from '@/components/ui/button'

interface GameControlsProps {
    isGameStarted: boolean
    timer: number
    selectedGameId: number | null
    onStartGame: () => void
    onFinishGame: () => void
}

export default function GameControls({ 
    isGameStarted, 
    timer, 
    selectedGameId, 
    onStartGame, 
    onFinishGame
}: GameControlsProps) {
    return (
        <div className="flex items-center space-x-4">
            {!isGameStarted ? (
                <Button 
                    onClick={onStartGame} 
                    variant="default" 
                    size="lg"
                    disabled={!selectedGameId}
                >
                    🎮 Oyunu Başlat
                </Button>
            ) : (
                <>
                    <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                        ⏱️ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </div>
                    <Button onClick={onFinishGame} variant="destructive" size="lg">
                        ✅ Oyunu Bitir
                    </Button>
                </>
            )}
        </div>
    )
}
