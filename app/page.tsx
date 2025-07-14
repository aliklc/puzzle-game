import PuzzleBoard from "./components/PuzzleBoard"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold text-center pt-8">Puzzle Game</h1>
      <PuzzleBoard />
    </main>
  )
}
