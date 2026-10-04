import { ChevronDown } from 'lucide-react'

type DropDownProps = {
    value: string
    onChange: (value: string) => void
    options?: { value: string; label: string }[]
    disabled?: boolean
}

export const DropDown = (props: DropDownProps) => {
    return (
        <div className="relative">
            <select 
                value={props.value} 
                onChange={(e) => props.onChange(e.target.value)} 
                className="appearance-none rounded-full bg-neutral-200/70 py-2.5 pl-4 pr-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-900 disabled:opacity-30"
                disabled={props.disabled}
            >
                {props.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={14}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />

        </div>
    )
}