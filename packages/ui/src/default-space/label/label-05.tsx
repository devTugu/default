// @ts-nocheck
import { Label } from "@default/ui/primitives/label"
import { Switch } from "@default/ui/primitives/switch"

const LabelWithSwitch = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='email-notification' className='cursor-pointer' />
      <Label htmlFor='email-notification' className='cursor-pointer'>Email notifications</Label>
    </div>
  )
}

export default LabelWithSwitch
