'use client'

import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function GameClientUI() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-2xl shadow-lg bg-white">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setMode('login')}
          className={`px-4 py-2 rounded ${
            mode === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          Giriş Yap
        </button>
        <button
          onClick={() => setMode('register')}
          className={`px-4 py-2 rounded ${
            mode === 'register' ? 'bg-green-500 text-white' : 'bg-gray-100'
          }`}
        >
          Kayıt Ol
        </button>
      </div>
      {mode === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}
