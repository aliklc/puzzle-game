'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AuthTab from './auth/AuthTab'
import GeneratorTab from './generator/GeneratorTab'
import GameTab from './game/GameTab'
import { useEffect, useState } from 'react'
import { fetchCurrentUser } from './lib/api/auth/me'

export default function Home() {
  	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function checkUser() {
	  		try {
				const user = await fetchCurrentUser();
				setIsAdmin(user?.roles?.includes('admin') ?? false);
	  		} catch {
				setIsAdmin(false);
	  		} finally {
				setLoading(false);
	  		}
		}
		checkUser();
	}, []);

	if (loading) {
		return <div className="text-center text-gray-600">Yükleniyor...</div>;
	}

  	return (
		<main className="p-4">
	  		<Tabs defaultValue="game" className="w-full">
				<TabsList>
		  			<TabsTrigger value="auth">Auth</TabsTrigger>
		  			<TabsTrigger value="game">Game</TabsTrigger>
		  			{isAdmin && <TabsTrigger value="generator">Generator</TabsTrigger>}
				</TabsList>
				<TabsContent value="auth">
		  			<AuthTab />
				</TabsContent>
				<TabsContent value="game">
		  			<GameTab />
				</TabsContent>
				{isAdmin && (
		  			<TabsContent value="generator">
						<GeneratorTab />
		  			</TabsContent>
				)}
	  		</Tabs>
		</main>
  	);
}
