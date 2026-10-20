// @ts-nocheck
'use client'

import { Card } from "@default/ui/primitives/card"
import { Input } from "@default/ui/primitives/input"
import { Button } from "@default/ui/primitives/button"
import { Checkbox } from "@default/ui/primitives/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@default/ui/primitives/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@default/ui/primitives/dropdown-menu"
import { CirclePlus, EllipsisVertical, Search, SquarePen, Trash } from 'lucide-react'

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className='flex space-x-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns='http://www.w3.org/2000/svg'
          className={`h-4 w-4 ${star <= rating ? 'text-orange-400' : 'text-orange-400/50'
            }`}
          fill='currentColor'
          viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z' />
        </svg>
      ))}
    </div>
  )
}

const Table10 = () => {
  /*Table Action*/
  const   tableActionData = [
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

  const LatestReviewData = [
    {
      profile:
        'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
      customername: 'Arlene McCoy',
      customeremail: 'macoy@arlene.com',
      review: 5,
      reviewtext:
        'This theme is great. Clean and easy to understand. Perfect for those who don t havetime to',
      time: 'Nov 8',
    },
    {
      profile:
        'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
      customername: 'Jerome Bell',
      customeremail: 'belljerome@yahoo.com',
      review: 4,
      reviewtext:
        'It is a Mac, after all. Once you have gone Mac,there s no going back. My first Maclastedover nine years',
      time: 'Nov 8',
    },
    {
      profile:
        'https://images.shadcnspace.com/assets/profiles/user-7.jpg',
      customername: 'Jacob Jones',
      customeremail: 'jones009@hotmail.com',
      review: 4,
      reviewtext:
        ' The best experience we could hope for.Customer service team is amazing and thequality of their products',
      time: 'Nov 8',
    },
    {
      profile:
        'https://images.shadcnspace.com/assets/profiles/user-8.jpg',
      customername: 'Annette Black',
      customeremail: 'blackanne@yahoo.com',
      review: 3,
      reviewtext:
        ' The controller is quite comfy for me. Despiteits increased size, the controller still fits well',
      time: 'Nov 8',
    },
  ]

  return (
    <>
      <div className='lg:py-20 sm:py-16 py-8 px-4 max-w-4xl mx-auto'>
        <Card className='w-full max-w-3xl mx-auto py-4 gap-6'>
          <div className='sm:flex items-center justify-between px-6'>
            <div>
              <h5 className='text-lg font-medium text-foreground'>
                Latest Reviews
              </h5>
              <p className='text-sm text-muted-foreground'>
                Reviewed received across all channels
              </p>
            </div>

            <div className='flex gap-4 sm:mt-0 mt-3'>
              <div className='relative w-full'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                  <Search size={18} />
                </span>
                <Input
                  type='text'
                  placeholder='Search'
                  required
                  className='pl-10 focus-visible:ring-0'
                />
              </div>

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
                      <items.icon size={18} />
                      <span>{items.listtitle}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <Table className='border-b'>
              <TableHeader className='text-center'>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-sm font-medium pb-2 ps-7'>
                    #
                  </TableHead>
                  <TableHead className='text-sm font-medium pb-2'>
                    Customer
                  </TableHead>
                  <TableHead className='text-sm font-medium pb-2'>
                    Reviews
                  </TableHead>
                  <TableHead className='text-sm font-medium pb-2'>
                    Time
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='divide-y divide-border'>
                {LatestReviewData.map((item, index) => (
                  <TableRow key={index} className='hover:bg-transparent'>
                    <TableCell className='whitespace-nowrap ps-6 py-8'>
                      <Checkbox className='cursor-pointer' />
                    </TableCell>
                    <TableCell className='whitespace-nowrap ps-6'>
                      <div className='flex gap-3 items-center'>
                        <img
                          src={item.profile}
                          alt='icon'
                          className='h-8 w-8 rounded-full'
                          width={32}
                          height={32}
                        />
                        <div className='truncat line-clamp-2 text-wrap max-w-56 flex flex-col gap-0.5'>
                          <h6 className='text-sm font-medium'>
                            {item.customername}
                          </h6>
                          <p className='text-sm text-muted-foreground'>
                            {item.customeremail}
                          </p>
                          <RatingStars rating={item.review} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      <p className='text-sm font-normal text-foreground truncat line-clamp-2 text-wrap max-w-56'>
                        {item.reviewtext}
                      </p>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      <p className='text-sm font-normal text-foreground'>
                        {item.time}
                      </p>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <span className='h-9 w-9 flex justify-center items-center rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer'>
                            <EllipsisVertical size={22} />
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {tableActionData.map((items, index) => (
                            <DropdownMenuItem
                              key={index}
                              className='flex gap-3 font-normal cursor-pointer'>
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
          <div className='sm:flex items-center justify-between px-6'>
            <small className='text-sm font-normal text-muted-foreground'>
              1-6 of 32
            </small>
            <Button className='w-fit rounded-full bg-sky-400 text-white cursor-pointer'>
              View All Reviews
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Table10
