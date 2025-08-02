'use client'

import { useState } from 'react'
import { signup } from '@/app/lib/api/auth/signup'

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
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Kayıt Ol
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Başarıyla kayıt olundu!</p>}
    </form>
  )
}
