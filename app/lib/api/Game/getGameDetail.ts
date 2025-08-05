import api from '../axios'
import type { GameResponse } from '../../types'

export async function getGameDetail(gameId: number): Promise<GameResponse> {
    const { data } = await api.get(`/games/${gameId}`)
    return data
}
