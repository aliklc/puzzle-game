'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AuthTab from './_auth/AuthTab'
import GeneratorTab from './_generator/GeneratorTab'
import GameTab from './_game/GameTab'
import { useEffect, useState } from 'react'
import { fetchCurrentUser } from './lib/api/auth/me'

export default function Page() {
   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

   const checkUser = async () => {
	   try {
		   const user = await fetchCurrentUser();
		   setIsAdmin(user?.roles?.includes('admin') ?? false);
	   } catch {
		   setIsAdmin(false);
	   } 
   };

   useEffect(() => {
	   checkUser();
   }, []);

   const handleAuthChange = () => {
	   checkUser();
   };


   return (
	   <main className="p-4">
		   <Tabs defaultValue="auth" className="w-full">
			   <TabsList>
				   <TabsTrigger value="auth">Auth</TabsTrigger>
				   <TabsTrigger value="game">Game</TabsTrigger>
				   {isAdmin && <TabsTrigger value="generator">Generator</TabsTrigger>}
			   </TabsList>
			  <TabsContent value="auth">
				  <AuthTab onAuthChange={handleAuthChange} />
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
