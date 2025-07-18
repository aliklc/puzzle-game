'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface ConstraintRatioSelectorProps {
    value: number
    onChange: (value: number) => void
}

export default function ConstraintRatioSelector({
    value,
    onChange,
}: ConstraintRatioSelectorProps) {
    return (
        <Select value={value.toString()} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Constraint Ratio" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0.1">10%</SelectItem>
                <SelectItem value="0.2">20%</SelectItem>
                <SelectItem value="0.3">30%</SelectItem>
                <SelectItem value="0.4">40%</SelectItem>
            </SelectContent>
        </Select>
    )
}
