// @ts-nocheck
"use client";

import { InfoIcon } from 'lucide-react'
import { Button } from "@default/ui/primitives/button"
import { Popover, PopoverContent, PopoverTrigger } from "@default/ui/primitives/popover"

const PopoverAboutDemo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
<Button variant='outline' size='icon' className="cursor-pointer" >
<InfoIcon />
        <span className='sr-only'>About default</span>
      
</Button>
</PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-1.5 text-center'>
            <div className='text-lg font-semibold'>About default</div>
            <p className='text-muted-foreground text-sm'>
              Welcome to default - your go-to library of beautifully crafted, registry-ready UI components built on shadcn/ui.
            </p>
          </div>
          <Button size='sm' render={<a href='#' />} className="hover:bg-primary/80 cursor-pointer">
            Learn More
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverAboutDemo
