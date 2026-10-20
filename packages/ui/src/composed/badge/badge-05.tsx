// @ts-nocheck
'use client'
import { ArrowRightIcon } from 'lucide-react'
import { Badge } from '@default/ui/primitives/badge'

const BadgeLinkDemo = () => {
  return (
    <Badge asChild>
      <a
        href="#"
        className="flex items-center gap-1 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        Link <ArrowRightIcon className="size-3" />
      </a>
    </Badge>
  )
}

export default BadgeLinkDemo
