// @ts-nocheck
'use client'

import { Card } from "@default/ui/primitives/card"
import { Badge } from "@default/ui/primitives/badge"
import { Progress } from "@default/ui/primitives/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@default/ui/primitives/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@default/ui/primitives/table"
import { ScrollArea } from "@default/ui/primitives/scroll-area"
import { cn } from "@default/ui/lib/cn"
import { CirclePlus, EllipsisVertical, SquarePen, Trash } from 'lucide-react'

const Table09 = () => {
  const ProductTableData = [
    {
      img: 'https://images.shadcnspace.com/assets/products/dash-prd-1.jpg',
      name: 'iPhone 13 pro max-Pacific Blue-128GB storage',
      payment: '$180',
      paymentstatus: 'Partially paid',
      process: 45,
      processcolor: '**:data-[slot=progress-indicator]:bg-amber-300',
      statuscolor: 'bg-teal-400/10 text-teal-400',
      statustext: 'Confirmed',
    },
    {
      img: 'https://images.shadcnspace.com/assets/products/dash-prd-2.jpg',
      name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
      payment: '$120',
      paymentstatus: 'Full paid',
      process: 100,
      processcolor: '**:data-[slot=progress-indicator]:bg-teal-400',
      statuscolor: 'bg-teal-400/10 text-teal-400',
      statustext: 'Confirmed',
    },
    {
      img: 'https://images.shadcnspace.com/assets/products/dash-prd-3.jpg',
      name: 'PlayStation 5 DualSense Wireless Controller',
      payment: '$120',
      paymentstatus: 'Cancelled',
      process: 100,
      processcolor: '**:data-[slot=progress-indicator]:bg-red-500',
      statuscolor: 'bg-red-500/10 text-red-500',
      statustext: 'Cancelled',
    },
    {
      img: 'https://images.shadcnspace.com/assets/products/dash-prd-4.jpg',
      name: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
      payment: '$120',
      paymentstatus: 'Partially paid',
      process: 45,
      processcolor: '**:data-[slot=progress-indicator]:bg-amber-300',
      statuscolor: 'bg-teal-400/10 text-teal-400',
      statustext: 'Confirmed',
    },
    {
      img: 'https://images.shadcnspace.com/assets/products/dash-prd-2.jpg',
      name: 'Sony X85J 75 Inch Sony 4K Ultra HD LED Smart',
      payment: '$120',
      paymentstatus: 'Full paid',
      process: 100,
      processcolor: '**:data-[slot=progress-indicator]:bg-teal-400',
      statuscolor: 'bg-teal-400/10 text-teal-400',
      statustext: 'Confirmed',
    },
  ]

  /*Table Action*/
  const tableActionData = [
    {
      icon: CirclePlus,
      listtitle: 'Add',
    },
    {
      icon: SquarePen,
      listtitle: 'Edit',
    },
    {
      icon: Trash,
      listtitle: 'Delete',
    },
  ]

  return (
    <>
      <div className='lg:py-20 sm:py-16 py-8 px-4 max-w-4xl mx-auto'>
        <Card className='w-full max-w-3xl mx-auto p-6 gap-6'>
          <div className='px-6'>
            <h5 className='text-lg font-medium text-foreground'>Popular Products</h5>
            <p className='text-sm text-muted-foreground'>Total 9k Visitors</p>
          </div>
          <ScrollArea className='max-h-110'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead className='text-sm ps-6'>Products</TableHead>
                    <TableHead className='text-sm'>Payment</TableHead>
                    <TableHead className='text-sm'>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className='divide-y divide-border'>
                  {ProductTableData.map((item, index) => (
                    <TableRow key={index} className='hover:bg-transparent'>
                      <TableCell className='whitespace-nowrap ps-6'>
                        <div className='flex gap-3 items-center'>
                          <img
                            src={item.img}
                            alt='icon'
                            className='h-16 w-16 rounded-lg'
                            width={60}
                            height={60}
                          />
                          <div className='truncat line-clamp-2 sm:text-wrap max-w-56'>
                            <h6 className='text-sm font-medium text-foreground'>{item.name}</h6>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <h5 className='text-sm font-medium text-wrap text-foreground'>
                          {item.payment}
                          <span className='text-foreground/70'>
                            <span className='mx-1'>/</span>499
                          </span>
                        </h5>
                        <div className='text-sm text-foreground/70 mb-2 text-wrap'>
                          {item.paymentstatus}
                        </div>
                        <div className='me-5'>
                          <Progress value={item.process} className={cn("w-full h-1", `${item.processcolor}`)} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-sm font-normal ${item.statuscolor}`}>
                          {item.statustext}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger className='outline-none'>
                            <span className='h-9 w-9 flex justify-center items-center rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer'>
                              <EllipsisVertical size={22} />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {tableActionData.map((items, index) => (
                              <DropdownMenuItem
                                key={index}
                                className='flex gap-3 font-normal cursor-pointer'>
                                {' '}
                                <items.icon size={18} />
                                <span>{items.listtitle}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </>
  )
}

export default Table09
