'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SizeSelectorProps {
    value: number
    onChange: (value: number) => void
}

export default function SizeSelector({ value, onChange }: SizeSelectorProps) {
    return (
        <Select value={value.toString()} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Grid Size" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="6">6 x 6</SelectItem>
                <SelectItem value="8">8 x 8</SelectItem>
                <SelectItem value="10">10 x 10</SelectItem>
            </SelectContent>
        </Select>
    )
}