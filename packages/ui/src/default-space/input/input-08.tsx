// @ts-nocheck
import { useId } from 'react'

import { Input } from "@default/ui/primitives/input"
import { Label } from "@default/ui/primitives/label"

const InputAddOnsDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Input with add-ons</Label>
      <div className='flex rounded-md shadow-xs'>
        <span className='border-input text-muted-foreground inline-flex items-center rounded-l-md border px-3 text-sm'>
          https://
        </span>
        <Input id={id} type='text' placeholder='default' className='-mx-px rounded-none shadow-none' />
        <span className='border-input text-muted-foreground inline-flex items-center rounded-r-md border px-3 text-sm'>
          .com
        </span>
      </div>
    </div>
  )
}

export default InputAddOnsDemo
