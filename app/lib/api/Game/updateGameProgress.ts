import api from '../axios'
import type { GameInstanceResponse, GameInstanceUpdate } from '../../types'

export async function updateGameProgress(
    instanceId: number, 
    userData: Record<string, unknown>, 
    timeSpent: number
): Promise<GameInstanceResponse> {
    const updateData: GameInstanceUpdate = {
        user_data: userData,
        time_spent: timeSpent
    }
    const { data } = await api.put(`/games/instances/${instanceId}/progress`, updateData)
    return data
}
