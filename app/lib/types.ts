import { DifficultyLevel } from "./difficultyConfig"

export type Fruit = '🫐' | '🍋'
export type Cell = Fruit | null

export type ConstraintType = '=' | '×'

export interface Constraint {
	from: [number, number]
	to: [number, number]
	type: ConstraintType
}

export interface PuzzleListProps {
    onSelect: (puzzle: Cell[][], constraints: Constraint[], solution: Cell[][]) => void
    refreshKey?: number
}

export interface PuzzleSummary {
    id: number
    title: string
}

export interface PuzzleDetail {
    id: number
    title: string
    puzzle_data: Cell[][]
    solution_data: Cell[][]
    constraints: Constraint[]
}


export interface SaveButtonProps {
	puzzle: Cell[][]
	constraints: Constraint[]
	solution: Cell[][]
	gridSize: number
	difficulty: DifficultyLevel
	onSaved?: () => void
}