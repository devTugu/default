// @ts-nocheck
'use client'

import { useState, type ReactElement } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu"

export type LanguageOption = {
    value: string
    label: string
    icon?: string
}

type Props = {
    trigger: ReactElement
    defaultOpen?: boolean
    align?: 'start' | 'center' | 'end'
    languages?: LanguageOption[]
    value?: string
    onValueChange?: (value: string) => void
}

type Language = LanguageOption

const LANGUAGES: Language[] = [
    {
        value: 'english',
        label: 'English (UK)',
        icon: 'https://images.shadcnspace.com/assets/flags/flag-us.svg',
    },
    {
        value: 'chinese',
        label: '中国人 (Chinese)',
        icon: 'https://images.shadcnspace.com/assets/flags/flag-china.svg',
    },
    {
        value: 'french',
        label: 'français (French)',
        icon: 'https://images.shadcnspace.com/assets/flags/flag-france.svg',
    },
    {
        value: 'arabic',
        label: 'عربي (Arabic)',
        icon: 'https://images.shadcnspace.com/assets/flags/flag-australia.svg',
    },
]

const itemClass =
    'cursor-pointer gap-2 pl-2 text-sm data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground [&>span]:hidden'

const LanguageDropdown = ({
    trigger,
    defaultOpen,
    align = 'end',
    languages,
    value,
    onValueChange,
}: Props) => {
    const options = languages ?? LANGUAGES
    const [internalLanguage, setInternalLanguage] = useState(options[0]?.value ?? 'english')
    const language = value ?? internalLanguage

    const handleChange = (next: string) => {
        if (value === undefined) {
            setInternalLanguage(next)
        }
        onValueChange?.(next)
    }

    return (
        <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-50" align={align}>
                <DropdownMenuRadioGroup
                    value={language}
                    onValueChange={handleChange}
                    className="flex flex-col gap-2"
                >
                    {options.map(({ value: optionValue, label, icon }) => (
                        <DropdownMenuRadioItem key={optionValue} value={optionValue} className={itemClass}>
                            {icon ? (
                                <img src={icon} alt="" width={16} height={16} className='rounded-full' />
                            ) : null}
                            {label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageDropdown
