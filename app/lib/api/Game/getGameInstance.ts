import api from '../axios'
import type { GameInstanceResponse } from '../../types'

export async function getGameInstance(instanceId: number): Promise<GameInstanceResponse> {
    const { data } = await api.get(`/games/instances/${instanceId}`)
    return data
}
