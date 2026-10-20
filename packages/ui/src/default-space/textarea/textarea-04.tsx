// @ts-nocheck
import { useId } from 'react'

import { Button } from "@default/ui/primitives/button"
import { Label } from "@default/ui/primitives/label"
import { Textarea } from "@default/ui/primitives/textarea"

const TextareaWithButtonDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Feedback</Label>
      <Textarea id={id} placeholder='Share your feedback here' />
      <Button size='sm'>Submit</Button>
    </div>
  )
}

export default TextareaWithButtonDemo
