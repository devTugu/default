// @ts-nocheck
'use client'

import { useState } from 'react'
import { ChevronsRightIcon, FolderIcon, FolderOpenIcon, HomeIcon } from 'lucide-react'
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from '@default/ui/primitives/breadcrumb'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@default/ui/primitives/dropdown-menu'

const BreadcrumbWithIconDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>
            <HomeIcon className='size-4' />
            <span className='sr-only'>Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronsRightIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem className='flex items-center gap-2'>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className='flex cursor-pointer items-center gap-1'>
              {open ? <FolderOpenIcon className='size-4 text-amber-300' /> : <FolderIcon className='size-4' />}
              <span className='sr-only'>{open ? 'Open' : 'Close'}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem>Investor</DropdownMenuItem>
              <DropdownMenuItem>Developer</DropdownMenuItem>
              <DropdownMenuItem>Marketers</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronsRightIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Account</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbWithIconDemo
