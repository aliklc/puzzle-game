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
			role="button"
			tabIndex={locked ? -1 : 0}
			aria-disabled={locked}
			onClick={locked ? undefined : onClick}
			onKeyDown={e => {
				if (!locked && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault()
					onClick()
				}
			}}
			className={`w-12 h-12 flex items-center justify-center border border-gray-400 text-xl font-semibold cursor-pointer select-none ${
				locked ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-yellow-100'
			}`}
		>
			{value ?? ''}
		</div>
	)
}
