'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BlankRatioSelectorProps {
    value: number
    onChange: (value: number) => void
}

export default function BlankRatioSelector({ value, onChange }: BlankRatioSelectorProps) {
    return (
        <Select value={value.toString()} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Blank Ratio" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0.5">50%</SelectItem>
                <SelectItem value="0.6">60%</SelectItem>
                <SelectItem value="0.7">70%</SelectItem>
            </SelectContent>
        </Select>
    )
}