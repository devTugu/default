// @ts-nocheck
import { useId } from 'react'
import { Input } from "@default/ui/primitives/input"
import { Label } from "@default/ui/primitives/label"

const LabelWithInput = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Password</Label>
      <Input id={id} type='password' placeholder='••••••••' />
    </div>
  )
}

export default LabelWithInput
