// @ts-nocheck
"use client";

import { useState } from "react";
import { Badge } from "@default/ui/primitives/badge"
import { Button } from "@default/ui/primitives/button"
import { ButtonGroup } from "@default/ui/primitives/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu"
import { ChevronDownIcon, StarIcon, Plus  } from 'lucide-react'

export default function Pattern() {
  const [starred, setStarred] = useState(false);

  return (
    <ButtonGroup>
      <Button variant="outline" onClick={() => setStarred(!starred)}>
        <StarIcon 
          aria-hidden="true" 
          className={starred ? "text-orange-400 fill-orange-400" : ""}
        />
        <span>{starred ? "Starred" : "Star"}</span>
        <Badge>2.4k</Badge>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
<Button variant="outline" size="icon" >
<ChevronDownIcon  aria-hidden="true" />
          <span className="sr-only">Toggle dropdown</span>
        
</Button>
</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem >
            <Button className="w-full bg-green-500 hover:bg-green-500/80">
                <Plus />
                Create list
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}