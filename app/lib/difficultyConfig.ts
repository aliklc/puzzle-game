
export const difficultyConfigs = {
	easy: { blankRatio: 0.6, constraintRatio: 0.12 },
	medium: { blankRatio: 0.65, constraintRatio: 0.1 },
	hard: { blankRatio: 0.7, constraintRatio: 0.08 },
}

export type DifficultyLevel = keyof typeof difficultyConfigs