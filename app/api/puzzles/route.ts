import { NextResponse } from 'next/server'
import api from '@/app/lib/api/axios'

export async function GET() {
    try {
        const { data } = await api.get('/puzzles')
        return NextResponse.json(data)
    } catch (err) {
        console.error('Server-side GET hatası:', err)
        return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { data } = await api.post('/puzzles', body)
        return NextResponse.json(data)
    } catch (err) {
        console.error('Server-side POST hatası:', err)
        return NextResponse.json({ error: 'Kaydedilemedi' }, { status: 500 })
    }
}
