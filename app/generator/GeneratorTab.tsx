import { fetchPuzzleSummaries } from '../lib/api/Puzzle/PuzzleSummariesAction'
import GeneratorClientUI from './GeneratorClientUI'
export const dynamic = 'force-dynamic'

export default async function GeneratorTab() {
    // Sayfa render edilmeden ÖNCE sunucuda veri çekilir.
    const initialSummaries = await fetchPuzzleSummaries()
    return <GeneratorClientUI initialSummaries={initialSummaries} />
}