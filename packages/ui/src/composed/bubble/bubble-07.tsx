// @ts-nocheck
"use client";

import { CheckIcon } from "lucide-react";
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@default/ui/primitives/bubble";
import { Button } from "@default/ui/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@default/ui/primitives/tooltip";

const SENT_BUBBLE_CLASS =
  "*:data-[slot=bubble-content]:bg-blue-500! *:data-[slot=bubble-content]:text-white!";

const BubbleTooltipDemo = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-4 py-12">
      <Bubble variant="secondary">
        <BubbleContent>Did you merge the fix yet?</BubbleContent>
      </Bubble>
      <Bubble align="end" className={SENT_BUBBLE_CLASS}>
        <BubbleContent>Yes, just merged it.</BubbleContent>
        <BubbleReactions>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                className="cursor-pointer"
              >
                <CheckIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Seen today at 2:47 PM</TooltipContent>
          </Tooltip>
        </BubbleReactions>
      </Bubble>
    </div>
  );
};

export default BubbleTooltipDemo;
