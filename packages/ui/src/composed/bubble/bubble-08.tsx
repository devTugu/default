// @ts-nocheck
"use client";

import { InfoIcon } from "lucide-react";
import { Bubble, BubbleContent, BubbleReactions } from "@default/ui/primitives/bubble";
import { Button } from "@default/ui/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@default/ui/primitives/popover";

const SENT_BUBBLE_CLASS =
  "*:data-[slot=bubble-content]:bg-blue-500! *:data-[slot=bubble-content]:text-white!";

const BubblePopoverDemo = () => {
  return (
    <div className="flex w-full max-w-90 flex-col gap-4 py-12">
      <Bubble align="end" className={SENT_BUBBLE_CLASS}>
        <BubbleContent>Deploy the staging build.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Deployment failed.</BubbleContent>
        <BubbleReactions>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Show error details"
                className="aria-expanded:text-destructive cursor-pointer"
              >
                <InfoIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle className="text-sm">
                  Command failed with exit code 1
                </PopoverTitle>
                <PopoverDescription className="text-sm">
                  Cannot find module &apos;next.config.mjs&apos;
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </BubbleReactions>
      </Bubble>
    </div>
  );
};

export default BubblePopoverDemo;
