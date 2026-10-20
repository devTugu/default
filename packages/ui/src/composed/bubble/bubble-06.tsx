// @ts-nocheck
"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Bubble, BubbleContent } from "@default/ui/primitives/bubble";
import { Button } from "@default/ui/primitives/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@default/ui/primitives/collapsible";

const text = `I went through the onboarding flow end to end and found three issues worth fixing before launch.

The email step doesn't validate format until submit, so a typo only surfaces after the user hits continue.

The progress bar also resets on refresh, which makes people think they lost their place even when the data was saved.

The one I'd prioritize is the confirmation screen. There's no way back if something looks wrong, so a mistyped detail there means starting the whole flow over.`;

const previewLength = 180;

const BubbleCollapsible = () => {
  const [open, setOpen] = useState(false);
  const isLong = text.length > previewLength;
  const preview = `${text.slice(0, previewLength)}...`;

  return (
    <div className="flex w-full max-w-90 flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>What did you find in the review?</BubbleContent>
      </Bubble>

      <Bubble variant="muted" align="end">
        <BubbleContent className="whitespace-pre-line">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div>{open || !isLong ? text : preview}</div>
            {isLong ? (
              <CollapsibleTrigger asChild>
                <Button
                  variant="link"
                  className="gap-1 p-0 text-muted-foreground"
                >
                  {open ? "Show less" : "Show more"}
                  <ChevronDownIcon
                    data-icon="inline-end"
                    className="transition-transform group-data-panel-open/button:rotate-180"
                  />
                </Button>
              </CollapsibleTrigger>
            ) : null}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  );
};

export default BubbleCollapsible;
