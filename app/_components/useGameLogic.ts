'use client'

import { useState, useEffect } from 'react'
import { createGameInstance } from '../lib/api/Game/createGameInstance'
import { finishGameInstance } from '../lib/api/Game/finishGameInstance'
import { updateGameProgress } from '../lib/api/Game/updateGameProgress'
import type { Cell, GameInstanceResponse } from '../lib/types'

interface UseGameLogicProps {
    puzzle: Cell[][]
    solution: Cell[][]
    selectedGameId: number | null
    onGameComplete?: () => void
}

export default function useGameLogic({ puzzle, solution, selectedGameId, onGameComplete }: UseGameLogicProps) {
    const [timer, setTimer] = useState<number>(0)
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
    const [score, setScore] = useState<number | null>(null)
    const [gameInstance, setGameInstance] = useState<GameInstanceResponse | null>(null)
    const [attempts, setAttempts] = useState<number>(0)
    const [userSolution, setUserSolution] = useState<Cell[][]>([])

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [intervalId])

    function resetGameState() {
        setTimer(0)
        setIsGameStarted(false)
        setScore(null)
        setGameInstance(null)
        setAttempts(0)
        setUserSolution([])
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
        }
    }

    async function startGame() {
        if (puzzle.length === 0) {
            alert('Önce bir puzzle seçin!')
            return
        }

        if (!selectedGameId) {
            alert('Oyun başlatmak için önce bir puzzle seçin!')
            return
        }

        try {
            const instance = await createGameInstance({
                game_id: selectedGameId,
                user_data: {
                    attempts: 1
                }
            })
            setGameInstance(instance)
            
            setIsGameStarted(true)
            setTimer(0)
            setAttempts(1)
            
            if (intervalId) clearInterval(intervalId)
            const id = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
            setIntervalId(id)
        } catch (error) {
            console.error('Oyun başlatılamadı:', error)
            alert('Oyun başlatılamadı!')
        }
    }

    function stopGame() {
        setIsGameStarted(false)
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
        }
    }

    async function finishGame() {
        if (!gameInstance) {
            alert('Oyun instance bulunamadı!')
            return
        }

        if (userSolution.length === 0) {
            alert('Oyunu bitirmek için puzzle\'ı çözmeye başlayın!')
            return
        }

        try {
            const userSolutionData: Record<string, unknown> = {
                solution_data: userSolution
            }

            const result = await finishGameInstance(gameInstance.id, userSolutionData, timer)
            
            if (result.status === 'completed') {
                stopGame() // Sadece başarılı olduğunda oyunu durdur
                setScore(result.score)
                alert(`Tebrikler! Oyunu başarıyla tamamladınız! 🎉\nPuanınız: ${result.score}`)
                // Oyun tamamlandığında callback çağır
                onGameComplete?.()
            } else {
                // Başarısız olduğunda önce backend'e güncel attempts'i gönder
                const newAttempts = attempts + 1
                setAttempts(newAttempts)
                
                // Backend'e güncel attempts'i updateGameProgress ile gönder
                try {
                    await updateGameProgress(
                        gameInstance.id,
                        { attempts: newAttempts },
                        timer
                    )
                    
                    // Local state'i de güncelle
                    setGameInstance(prev => prev ? {
                        ...prev,
                        user_data: {
                            ...prev.user_data,
                            attempts: newAttempts
                        }
                    } : prev)
                } catch (updateError) {
                    console.error('User data güncellenemedi:', updateError)
                }
                
                alert(`Çözümünüz doğru değil. Tekrar deneyin!\nDeneme: ${newAttempts}`)
                console.log('Expected solution:', solution)
                console.log('User solution:', userSolution)
                console.log('Sent to backend:', userSolutionData)
            }
        } catch (error) {
            console.error('Oyun tamamlanamadı:', error)
            alert('Oyun tamamlanamadı!')
        }
    }

    return {
        // States
        timer,
        isGameStarted,
        score,
        gameInstance,
        attempts,
        userSolution,
        
        // Functions
        resetGameState,
        startGame,
        stopGame,
        finishGame,
        setUserSolution
    }
}
