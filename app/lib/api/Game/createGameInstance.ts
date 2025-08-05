import api from '../axios'
import type { GameInstanceCreate, GameInstanceResponse } from '../../types'

export async function createGameInstance(instance: GameInstanceCreate): Promise<GameInstanceResponse> {
    const { data } = await api.post('/games/instances/', instance)
    return data
}
