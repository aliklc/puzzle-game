'use client'

import { useState, useEffect } from 'react'
import PuzzleList from '../_components/PuzzleList'
import SizeSelector from '../_components/SizeSelector'
import DifficultySelector from '../_components/DifficultySelector'
import GenerateButton from '../_components/GenerateButton'
import PuzzleGrid from '../_components/PuzzleGrid'
import SaveButton from '../_components/SaveButton'
import GameControls from '../_components/GameControls'
import GameStats from '../_components/GameStats'
import GameWarning from '../_components/GameWarning'
import useGameLogic from '../_components/useGameLogic'

import { difficultyConfigs, type DifficultyLevel } from '../lib/difficultyConfig'
import { generatePlayablePuzzle } from '../lib/generator/generatePlayablePuzzle'
import { listGames } from '../lib/api/Game/listGames'
import type { Cell, Constraint, GameResponse } from '../lib/types'
import { fetchCurrentUser } from '../lib/api/auth/me'
import { logout } from '../lib/api/auth/logout'
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button'

export default function GeneratorClientUI() {
    const [initialSummaries, setInitialSummaries] = useState<GameResponse[]>([])
    const [puzzle, setPuzzle] = useState<Cell[][]>([])
    const [constraints, setConstraints] = useState<Constraint[]>([])
    const [solution, setSolution] = useState<Cell[][]>([])
    const [gridSize, setGridSize] = useState<number>(6)
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium')
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string | null>(null)
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null)

    // Game logic hook
    const gameLogic = useGameLogic({ 
        puzzle, 
        solution, 
        selectedGameId
    })

    const { blankRatio, constraintRatio } = difficultyConfigs[difficulty]

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
            setIsAdmin(user?.roles?.includes('admin') ?? false)
        } catch (error) {
            console.error('Kullanıcı bilgisi yüklenemedi:', error)
            setLoadingError('Kullanıcı bilgisi yüklenemedi')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadUserRole()
    }, [])

    function handleGenerate() {
        const { puzzle, constraints, solution } = generatePlayablePuzzle(
            gridSize,
            blankRatio,
            constraintRatio
        )
        setPuzzle(puzzle)
        setConstraints(constraints)
        setSolution(solution)
        
        // Yeni puzzle oluşturulduğunda selectedGameId'yi null yap
        setSelectedGameId(null)
        
        // Oyun state'lerini sıfırla
        gameLogic.resetGameState()
    }

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

    if (isAdmin === null || isLoading) {
        return <div className="text-center text-gray-600">Yükleniyor...</div>;
    }
    if (!isAdmin) {
        return null;
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
                        setConstraints(constraints);
                        setSolution(solution ?? []);
                        setSelectedGameId(gameId);
                        gameLogic.resetGameState();
                    }}
                />
                <SizeSelector value={gridSize} onChange={setGridSize} />
                <DifficultySelector value={difficulty} onChange={setDifficulty} />
                <GenerateButton onClick={handleGenerate} />
                <SaveButton
                    puzzle={puzzle}
                    constraints={constraints}
                    solution={solution}
                    gridSize={gridSize}
                    difficulty={difficulty}
                    onSuccess={loadSummaries}
                    onSave={(gameId) => setSelectedGameId(gameId)}
                />
            </div>
            
            {/* Timer ve Oyun Kontrolleri */}
            {puzzle.length > 0 && (
                <div className="flex flex-col items-center space-y-4">
                    <GameWarning selectedGameId={selectedGameId} />
                    
                    <GameControls
                        isGameStarted={gameLogic.isGameStarted}
                        timer={gameLogic.timer}
                        selectedGameId={selectedGameId}
                        onStartGame={gameLogic.startGame}
                        onFinishGame={gameLogic.finishGame}
                    />
                    
                    <GameStats
                        attempts={gameLogic.attempts}
                        score={gameLogic.score}
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
