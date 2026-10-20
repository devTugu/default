// @ts-nocheck
import { useId } from "react"
import { Label } from "@default/ui/primitives/label"
import { Textarea } from "@default/ui/primitives/textarea"

const TextareaWithHelperTextRightDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Message</Label>
      <Textarea placeholder='Drop your message here !' id={id} />
      <p className='text-muted-foreground text-end text-xs'>Your feedback means a lot to us.</p>
    </div>
  )
}

export default TextareaWithHelperTextRightDemo
