'use client'

import { Fruit } from '@/app/lib/types'

interface ClickableCellProps {
	value: Fruit | null
	locked: boolean
	onClick: () => void
}

export default function ClickableCell({ value, locked, onClick }: ClickableCellProps) {
	return (
		<div
			onClick={locked ? undefined : onClick}
			className={`w-12 h-12 flex items-center justify-center border border-gray-400 text-xl font-semibold cursor-pointer ${
				locked ? 'bg-gray-200' : 'bg-white hover:bg-yellow-100'
			}`}
		>
			{value ?? ''}
		</div>
	)
}
