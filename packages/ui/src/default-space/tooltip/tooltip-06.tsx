// @ts-nocheck
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@default/ui/primitives/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";

const AvatarGroupTooltipDemo = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-row justify-center items-center gap-6">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage
                  src="https://images.shadcnspace.com/assets/profiles/user-1.jpg"
                  alt="user"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chris Nolan</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage
                  src="https://images.shadcnspace.com/assets/profiles/user-2.jpg"
                  alt="user"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>Laura Ross</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage
                  src="https://images.shadcnspace.com/assets/profiles/user-3.jpg"
                  alt="user"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>John Roberts</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarFallback className="text-card-foreground font-medium text-sm">
                  +4
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>4 more members</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AvatarGroupTooltipDemo;
