'use client'

import { ChangeEvent } from 'react'
import { Input, InputProps } from './ui/input'
import { MaskEnum, Mask } from '@/utils/masks'

interface MaskInputProps extends InputProps {
  typeMask: MaskEnum
  onMaskedChange: (value: string) => void
}

export function MaskInput(props: MaskInputProps) {
  const { typeMask, value, onMaskedChange } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const mask = Mask[typeMask]
    onMaskedChange(mask(inputValue))
  }
  return <Input {...props} value={value} onChange={handleChange} />
}
