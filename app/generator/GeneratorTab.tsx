import { fetchPuzzleSummaries } from '../lib/actions'
import GeneratorClientUI from './GeneratorClientUI'

export default async function GeneratorTab() {
    // Sayfa render edilmeden ÖNCE sunucuda veri çekilir.
    const initialSummaries = await fetchPuzzleSummaries()

    return <GeneratorClientUI initialSummaries={initialSummaries} />
}