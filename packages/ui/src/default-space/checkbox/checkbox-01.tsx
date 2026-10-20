// @ts-nocheck
import { Checkbox } from "@default/ui/primitives/checkbox"

const CheckboxSizesDemo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox defaultChecked aria-label='Size default' className='cursor-pointer' />
      <Checkbox className='size-5 cursor-pointer' defaultChecked aria-label='Size small' />
      <Checkbox className='size-6 cursor-pointer' defaultChecked aria-label='Size large' />
    </div>
  )
}

export default CheckboxSizesDemo
