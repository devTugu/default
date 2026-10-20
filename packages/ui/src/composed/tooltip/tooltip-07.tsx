// @ts-nocheck
"use client";

import { Button } from "@default/ui/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@default/ui/primitives/tooltip";

const ErrorTooltipDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Error Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-destructive text-white [&_[data-slot=tooltip-arrow]]:bg-destructive! [&_[data-slot=tooltip-arrow]]:fill-destructive!">
        <p>This is an error tooltip</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ErrorTooltipDemo;
