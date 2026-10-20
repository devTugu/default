// @ts-nocheck
import { Gamepad2, MapPinned, Music2 } from 'lucide-react'
import { Checkbox } from "@default/ui/primitives/checkbox"
import { Label } from "@default/ui/primitives/label"

const skills = [
  { label: 'Music & Singing', icon: Music2  },
  { label: 'Gaming', icon: Gamepad2 },
  { label: 'Traveling', icon: MapPinned },
]

const CheckboxListGroupDemo = () => {
  return (
    <ul className='flex w-full flex-col divide-y rounded-md border'>
      {skills.map(({ label, icon: Icon }) => (
        <li key={label} className='flex items-center justify-between gap-2 px-5 py-3'>
          <Label htmlFor={label}>
            <span className='flex items-center gap-2'>
              <Icon className='size-4' /> {label}
            </span>
          </Label>
          <Checkbox id={label} className='cursor-pointer' />
        </li>
      ))}
    </ul>
  )
}

export default CheckboxListGroupDemo
