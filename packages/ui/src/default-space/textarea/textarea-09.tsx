// @ts-nocheck
import { useId } from "react"
import { Label } from "@default/ui/primitives/label"
import { Textarea } from "@default/ui/primitives/textarea"

const TextareaDisabledDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Message</Label>
      <Textarea placeholder='Drop your message here !' disabled id={id} />
    </div>
  )
}

export default TextareaDisabledDemo
