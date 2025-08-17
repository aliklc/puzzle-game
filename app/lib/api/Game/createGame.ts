import api from '../axios'
import type { GameCreate, GameResponse } from '../../types'

export async function createGame(game: GameCreate): Promise<GameResponse> {
    const { data } = await api.post('/games/', game)
    return data
}
