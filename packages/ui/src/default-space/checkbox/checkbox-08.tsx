// @ts-nocheck
import { useId } from 'react'
import { Checkbox } from "@default/ui/primitives/checkbox"
import { Label } from "@default/ui/primitives/label"

const CheckboxDashedDemo = () => {
  const id = useId()

  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} className='border-primary border-dashed cursor-pointer' />
      <Label htmlFor={id}>Yes, I agree to the terms</Label>
    </div>
  )
}

export default CheckboxDashedDemo
