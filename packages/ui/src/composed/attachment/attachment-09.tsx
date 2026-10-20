// @ts-nocheck
"use client";

import { Presentation, X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@default/ui/primitives/attachment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@default/ui/primitives/dialog";

const FILE_NAME = "presentation-deck.pdf";

const AttachmentWithTrigger = () => {
  return (
    <Attachment className="w-full max-w-xs">
      <AttachmentMedia className="bg-blue-500/15 text-blue-500">
        <Presentation />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{FILE_NAME}</AttachmentTitle>
        <AttachmentDescription>Click to preview, 3.1 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Remove ${FILE_NAME}`}
          className="cursor-pointer"
        >
          <X />
        </AttachmentAction>
      </AttachmentActions>

      <Dialog>
        <DialogTrigger asChild>
          <AttachmentTrigger
            aria-label={`Preview ${FILE_NAME}`}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="**:data-[slot=dialog-close]:cursor-pointer">
          <DialogHeader>
            <DialogTitle>{FILE_NAME}</DialogTitle>
            <DialogDescription>PDF, 3.1 MB</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center rounded-lg bg-muted p-10">
            <Presentation className="size-12 text-blue-500" />
          </div>
        </DialogContent>
      </Dialog>
    </Attachment>
  );
};

export default AttachmentWithTrigger;
