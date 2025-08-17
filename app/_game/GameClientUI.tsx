
'use client'

import { useState, useEffect } from 'react'
import PuzzleList from '../_components/PuzzleList'
import PuzzleGrid from '../_components/PuzzleGrid'
import GameControls from '../_components/GameControls'
import GameStats from '../_components/GameStats'
import useGameLogic from '../_components/useGameLogic'

import { listGames } from '../lib/api/Game/listGames'
import type { Cell, Constraint, GameResponse } from '../lib/types'
import { logout } from '../lib/api/auth/logout'
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button'
import { fetchCurrentUser } from '../lib/api/auth/me'

export default function GameClientUI() {
    const [initialSummaries, setInitialSummaries] = useState<GameResponse[]>([])
    const [puzzle, setPuzzle] = useState<Cell[][]>([])
    const [originalPuzzle, setOriginalPuzzle] = useState<Cell[][]>([])
    const [constraints, setConstraints] = useState<Constraint[]>([])
    const [solution, setSolution] = useState<Cell[][]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string | null>(null)
    const [isUser, setIsUser] = useState<boolean | null>(null)
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null)

    // Game logic hook
    const gameLogic = useGameLogic({ 
        puzzle, 
        solution, 
        selectedGameId,
        onResetPuzzle: () => {
            setPuzzle(originalPuzzle.map(row => [...row]))
        }
    })

    async function loadSummaries() {
        try {
            const data = await listGames()
            setInitialSummaries(data)
        } catch (error) {
            console.error('Oyun listesi yüklenemedi:', error)
            setLoadingError('Oyun listesi yüklenemedi')
        }
    }

    useEffect(() => {
        loadSummaries()
    }, [])


    async function loadUserRole() {
        try {
            setIsLoading(true)
            const user = await fetchCurrentUser()
            // Normal kullanıcılar için sadece giriş yapmış olması yeterli
            setIsUser(!!user) // user varsa true, yoksa false
        } catch (error) {
            console.error('Kullanıcı bilgisi yüklenemedi:', error)
            setLoadingError('Lütfen giriş yapın')
            setIsUser(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadUserRole()
    }, [])


    async function handleLogout() {
        try {
            await logout();
        } catch (e: unknown) {
            let message = 'Çıkış yapılamadı.';
            if (e instanceof AxiosError) {
                message = (e.response?.data as { message?: string })?.message || 'Çıkış yapılamadı.';
            } else if (e instanceof Error) {
                message = e.message;
            }
            alert(message);
        }
    }

    if (isUser === null || isLoading) {
        return <div className="text-center text-gray-600">Yükleniyor...</div>;
    }
    if (!isUser) {
        return (
            <div className="text-center text-red-600">
                <p>Bu sayfayı görüntülemek için giriş yapmanız gerekiyor.</p>
                <p>Lütfen giriş yapın.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-4 relative w-full">
            <div className="fixed top-4 right-4 z-50">
                <Button variant="destructive" onClick={handleLogout}>
                    Çıkış Yap
                </Button>
            </div>
            
            {loadingError && (
                <div className="text-center text-red-600 bg-red-50 p-3 rounded-md">
                    {loadingError}
                </div>
            )}
            
            <div className="flex items-center space-x-4">
                <PuzzleList
                    initialData={initialSummaries}
                    selectedGameId={selectedGameId}
                    onSelect={(puzzle, constraints, solution, gameId) => {
                        setPuzzle(puzzle);
                        setOriginalPuzzle(puzzle.map(row => [...row]));
                        setConstraints(constraints);
                        setSolution(solution ?? []);
                        setSelectedGameId(gameId);
                        gameLogic.resetGameState();
                    }}
                />
            </div>

            {/* Oyun Kontrolleri */}
            {puzzle.length > 0 && (
                <div className="flex flex-col items-center space-y-4">
                    <GameControls
                        isGameStarted={gameLogic.isGameStarted}
                        timer={gameLogic.timer}
                        selectedGameId={selectedGameId}
                        onStartGame={gameLogic.startGame}
                        onFinishGame={gameLogic.finishGame}
                        onResetPuzzle={gameLogic.resetPuzzle}
                    />
                    
                    <GameStats
                        attempts={gameLogic.attempts}
                        score={gameLogic.score}
                        completedTime={gameLogic.completedTime}
                    />
                </div>
            )}
            
            <PuzzleGrid 
                puzzle={puzzle} 
                constraints={constraints} 
                onGridChange={gameLogic.setUserSolution}
            />
        </div>
    )
}
