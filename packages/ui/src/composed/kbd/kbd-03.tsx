// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from "@default/ui/primitives/button"
import { ButtonGroup } from "@default/ui/primitives/button-group"
import { Kbd } from "@default/ui/primitives/kbd"
import { Switch } from "@default/ui/primitives/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@default/ui/primitives/tooltip"

type Platform = 'mac' | 'win'

const KbdTooltipDemo = () => {
  const [platform, setPlatform] = useState<Platform>('mac')
  const isMac = platform === 'mac'

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-4">
        {/* Platform switch */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">MacOS</span>
          <Switch
            checked={platform === 'win'}
            onCheckedChange={(checked) => setPlatform(checked ? 'win' : 'mac')}
          />
          <span className="text-muted-foreground">Windows</span>
        </div>

        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
<Button size="sm" variant="outline">
Accept
</Button>
</TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                Accept
                <Kbd>{isMac ? '↵' : 'Enter'}</Kbd>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
<Button size="sm" variant="outline">
Cancel
</Button>
</TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                Cancel
                <Kbd>Esc</Kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </div>
    </TooltipProvider>
  )
}

export default KbdTooltipDemo
