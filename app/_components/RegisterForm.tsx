'use client'

import { useState } from 'react'
import { signup } from '@/app/lib/api/auth/signup'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signup(username, email, password)
        if (res.success) {
            setSuccess(true)
            setError('')
        } else {
            setError(res.error ?? 'Bilinmeyen bir hata oluştu')
        }
    }

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full">
                Kayıt Ol
            </Button>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="border-green-500 text-green-700">
                    <AlertDescription>Başarıyla kayıt olundu!</AlertDescription>
                </Alert>
            )}
        </form>
    )
}
