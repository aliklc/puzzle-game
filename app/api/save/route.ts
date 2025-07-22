import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		console.log('Gelen veri:', body)

		const { puzzle, constraints, solution } = body

		await pool.query(
			`INSERT INTO puzzles (title, puzzle_data, solution_data, constraints)
			 VALUES ($1, $2, $3, $4)`,
			[
				`Puzzle ${Date.now()}`, // title: otomatik üret
				JSON.stringify(puzzle),
				JSON.stringify(solution),
				JSON.stringify(constraints),
			]
		)

		return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Error) {
            console.error('Save error:', error.message)
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        } else {
            console.error('Save error (unknown):', error)
            return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 500 })
        }
    }
}
