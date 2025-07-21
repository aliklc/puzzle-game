export type Fruit = '🫐' | '🍋'
export type Cell = Fruit | null

export type ConstraintType = '=' | '×'

export interface Constraint {
	from: [number, number]
	to: [number, number]
	type: ConstraintType
}
