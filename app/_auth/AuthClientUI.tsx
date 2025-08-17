'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LoginForm from '../_components/LoginForm'
import RegisterForm from '../_components/RegisterForm'

type AuthClientUIProps = {
    onAuthChange?: () => void
}

export default function AuthClientUI({ onAuthChange }: AuthClientUIProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login')

    const handleLoginSuccess = () => {
        if (onAuthChange) onAuthChange();
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white space-y-6">
            <div className="flex justify-center gap-4">
                <Button
                    variant={mode === 'login' ? 'default' : 'outline'}
                    onClick={() => setMode('login')}
                >
                    Giriş Yap
                </Button>
                <Button
                    variant={mode === 'register' ? 'default' : 'outline'}
                    onClick={() => setMode('register')}
                >
                    Kayıt Ol
                </Button>
            </div>
            <div>{mode === 'login' ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <RegisterForm />}</div>
        </div>
    )
}
