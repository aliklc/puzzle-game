import api from '../axios'
import type { GameInstanceResponse, GameInstanceFinish } from '../../types'

export async function finishGameInstance(instanceId: number, userSolution: Record<string, unknown>, timeSpent: number): Promise<GameInstanceResponse> {
    const finishData: GameInstanceFinish = {
        user_solution: userSolution,
        time_spent: timeSpent
    }
    const { data } = await api.post(`/games/instances/${instanceId}/finish`, finishData)
    return data
}
