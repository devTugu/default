// @ts-nocheck
import { FileSpreadsheet, X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";
import { cn } from "@default/ui/lib/cn";

const PREVIEW_ROWS = [
  ["w-3/5", "w-2/5", "w-1/2", "w-2/5"],
  ["w-4/5", "w-3/5", "w-2/5", "w-1/2"],
  ["w-3/5", "w-1/2", "w-3/5", "w-1/3"],
];

const SpreadsheetAttachment = () => {
  return (
    <Attachment className="w-full max-w-xs">
      <AttachmentMedia className="bg-teal-400/15 text-teal-400">
        <FileSpreadsheet />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Budget-FY26.xlsx</AttachmentTitle>
        <AttachmentDescription>3 sheets, 312 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label="Remove Budget-FY26.xlsx"
          className="cursor-pointer"
        >
          <X />
        </AttachmentAction>
      </AttachmentActions>

      <div
        aria-hidden
        className="bg-border grid w-full grid-cols-4 gap-px overflow-hidden rounded-lg border"
      >
        {PREVIEW_ROWS.map((row, rowIndex) =>
          row.map((width, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className={cn(
                "flex h-5 items-center px-1.5",
                rowIndex === 0 ? "bg-teal-400/15" : "bg-card",
              )}
            >
              <span
                className={cn(
                  "h-1 rounded-full",
                  width,
                  rowIndex === 0 ? "bg-teal-400" : "bg-muted-foreground/25",
                )}
              />
            </div>
          )),
        )}
      </div>
    </Attachment>
  );
};

export default SpreadsheetAttachment;
