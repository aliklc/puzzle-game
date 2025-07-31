// app/game/components/LoginForm.tsx
'use client'

import { useState } from 'react'
import { login } from '@/app/lib/api/auth/login'

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await login(username, password)
        if (res.success) {
            // 🎯 Artık localStorage'a token kaydetmeye gerek yok
            setSuccess(true)
            setError('')
        } else {
            setError(res.error || 'Bilinmeyen hata')
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                Giriş Yap
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">Başarıyla giriş yapıldı!</p>}
        </form>
    )
}
