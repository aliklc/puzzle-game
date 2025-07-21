'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { difficultyConfigs, type DifficultyLevel } from '../../lib/difficultyConfig'

interface DifficultySelectorProps {
	value: DifficultyLevel
	onChange: (
		difficulty: DifficultyLevel,
		config: { blankRatio: number; constraintRatio: number }
	) => void
}

export default function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
	return (
		<Select
			value={value}
			onValueChange={(difficulty) => {
				const typedDifficulty = difficulty as DifficultyLevel
				if (typedDifficulty in difficultyConfigs) {
					const config = difficultyConfigs[typedDifficulty]
					onChange(typedDifficulty, config)
				}
			}}
		>
			<SelectTrigger className="w-[160px]">
				<SelectValue placeholder="Difficulty" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="easy">Easy 🟢</SelectItem>
				<SelectItem value="medium">Medium 🟡</SelectItem>
				<SelectItem value="hard">Hard 🔴</SelectItem>
			</SelectContent>
		</Select>
	)
}