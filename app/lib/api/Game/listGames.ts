import api from '../axios'
import type { GameResponse } from '../../types'

export async function listGames(): Promise<GameResponse[]> {
    const { data } = await api.get('/games/')
    return data
}
