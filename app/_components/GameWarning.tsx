'use client'

interface GameWarningProps {
    selectedGameId: number | null
}

export default function GameWarning({ selectedGameId }: GameWarningProps) {
    if (selectedGameId) return null
    
    return (
        <div className="text-orange-600 bg-orange-50 p-2 rounded-md text-sm">
            ⚠️ Oyun başlatmak için önce puzzle&apos;ı kaydedin!
        </div>
    )
}
