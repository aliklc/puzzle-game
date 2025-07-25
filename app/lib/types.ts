import { DifficultyLevel } from "./difficultyConfig"

export type Fruit = '🫐' | '🍋'
export type Cell = Fruit | null

export type ConstraintType = '=' | '×'

export interface Constraint {
	from: [number, number]
	to: [number, number]
	type: ConstraintType
}

export interface PuzzleSummary {
    id: number
    title: string
}

export interface SaveButtonProps {
	puzzle: Cell[][]
	constraints: Constraint[]
	solution: Cell[][]
	gridSize: number
	difficulty: DifficultyLevel
}


export interface PuzzleDetail {
    id: string;
    title: string;
    puzzle_data: Cell[][];
    constraints: Constraint[];
    solution_data: Cell[][];
    puzzle_hash: string;
}

export interface PuzzleListProps {
    initialData: PuzzleSummary[];
    onSelect: (puzzle: Cell[][], constraints: Constraint[], solution: Cell[][]) => void;
}

export interface GeneratorClientUIProps {
    initialSummaries: PuzzleSummary[];
}