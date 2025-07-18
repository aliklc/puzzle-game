export type Fruit = '🫐' | '🍋'

export type ConstraintType = '=' | '×'

export interface Constraint {
	from: [number, number] // [row, col]
	to: [number, number]   // [row, col]
	type: ConstraintType
}
