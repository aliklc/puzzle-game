import { DifficultyLevel } from "./difficultyConfig"

export type Fruit = '🫐' | '🍋'
export type Cell = Fruit | null

export type ConstraintType = '=' | '×'

export interface Constraint {
	from: [number, number]
	to: [number, number]
	type: ConstraintType
}

export interface SavedPuzzle {
	id: number
	puzzle: Cell[][]
	constraints: Constraint[]
	solution: Cell[][]
	gridSize: number
	difficulty: DifficultyLevel
}