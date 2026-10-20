// @ts-nocheck
"use client";

import { SparklesIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@default/ui/primitives/dialog";
import { Button } from "@default/ui/primitives/button";

export default function Dialog06() {
  return (
    <Dialog>
      <DialogTrigger asChild>
<Button variant="outline" className="cursor-pointer" >
What's New
      
</Button>
</DialogTrigger>
      <DialogContent
        className="data-open:zoom-in-150! data-closed:zoom-out-150 duration-300 [[data-slot=dialog-overlay]:has(~_&)]:duration-300"
        showCloseButton={false}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <SparklesIcon size={16} className="text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              New Release
            </span>
          </div>
          <DialogHeader>
            <DialogTitle>Introducing v2.0</DialogTitle>
            <DialogDescription>
              A faster, smarter, and more beautiful experience. We've redesigned
              everything from the ground up.
            </DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col gap-1.5">
            {[
              "Redesigned dashboard with real-time updates",
              "New collaboration tools for your team",
              "Improved performance and reliability",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <DialogClose asChild>
<Button variant="outline" className="flex-1 cursor-pointer" >
Later
            
</Button>
</DialogClose>
            <DialogClose asChild>
<Button className="flex-1 cursor-pointer hover:bg-primary/80" >
Explore
            
</Button>
</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
