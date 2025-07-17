import PuzzleBoard from "./components/PuzzleBoard"

export default function Home() {
  return (
    <body className="min-h-screen bg-gray-100 text-black">
      <h1 className="text-2xl font-bold text-center pt-8">Puzzle Game</h1>
      <PuzzleBoard />
    </body>
  )
}
