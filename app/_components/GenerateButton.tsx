'use client'

import { Button } from '@/components/ui/button'

interface GenerateButtonProps {
    onClick: () => void
}

export default function GenerateButton({ onClick }: GenerateButtonProps) {
    return (
        <Button onClick={onClick}>
            Generate Puzzle
        </Button>
    )
}