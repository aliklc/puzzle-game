import { NextResponse } from 'next/server'
import api from '@/app/lib/api/axios'

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { data } = await api.get(`/puzzles/${params.id}`)
        return NextResponse.json(data)
    } catch (err) {
        console.error('Server-side detail GET hatası:', err)
        return NextResponse.json({ error: 'Detay alınamadı' }, { status: 500 })
    }
}
