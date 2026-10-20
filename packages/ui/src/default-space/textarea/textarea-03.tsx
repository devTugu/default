// @ts-nocheck
import { useId } from 'react'

import { Label } from "@default/ui/primitives/label"
import { Textarea } from "@default/ui/primitives/textarea"

const TextareaRequiredDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>
        Feedback <span className='text-destructive'>*</span>
      </Label>
      <Textarea placeholder='Share your feedback here' id={id} required />
    </div>
  )
}

export default TextareaRequiredDemo
