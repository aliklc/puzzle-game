import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import GameTab from './game/GameTab'
import GeneratorTab from './generator/GeneratorTab'

export default function Home() {
	return (
		<main className="p-4">
			<Tabs defaultValue="game" className="w-full">
				<TabsList>
					<TabsTrigger value="game">Game</TabsTrigger>
					<TabsTrigger value="generator">Generator</TabsTrigger>
				</TabsList>
				<TabsContent value="game">
					<GameTab />
				</TabsContent>
				<TabsContent value="generator">
					<GeneratorTab />
				</TabsContent>
			</Tabs>
		</main>
	)
}
