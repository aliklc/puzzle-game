// app/api/list/route.ts
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
	try {
		const result = await pool.query(
			`SELECT id, title, puzzle_data, solution_data, constraints FROM puzzles ORDER BY created_at DESC`
		)

		return NextResponse.json(result.rows)
    } catch (error) {
        if (error instanceof Error) {
            console.error('List error:', error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            console.error('List error (unknown):', error)
            return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
        }
    }

}
