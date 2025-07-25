
export const difficultyConfigs = {
	Easy: { blankRatio: 0.6, constraintRatio: 0.12 },
	Medium: { blankRatio: 0.65, constraintRatio: 0.1 },
	Hard: { blankRatio: 0.65, constraintRatio: 0.08 },
}

export type DifficultyLevel = keyof typeof difficultyConfigs