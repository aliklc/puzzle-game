'use client'

import { useState } from 'react'
import { login } from '@/app/lib/api/auth/login'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'


type LoginFormProps = {
    onLoginSuccess?: () => void
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await login(username, password)
        if (res.success) {
            setSuccess(true)
            setError('')
            if (onLoginSuccess) onLoginSuccess()
        } else {
            setError(res.error || 'Bilinmeyen hata')
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
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
                Giriş Yap
            </Button>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="border-green-500 text-green-700">
                    <AlertDescription>Başarıyla giriş yapıldı!</AlertDescription>
                </Alert>
            )}
        </form>
    )
}
