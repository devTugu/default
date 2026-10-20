// @ts-nocheck
import { Checkbox } from "@default/ui/primitives/checkbox"
import { Label } from "@default/ui/primitives/label"

const LabelWithCheckbox = () => {
  return (
    <div className='flex gap-2'>
      <Checkbox id='terms' className='cursor-pointer' />
      <Label htmlFor='terms' className='cursor-pointer'>Accept terms and conditions</Label>
    </div>
  )
}

export default LabelWithCheckbox
