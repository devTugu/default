// @ts-nocheck
import { FileArchive, FileSpreadsheet, FileText, X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";

const FILES = [
  {
    name: "hero-image.png",
    description: "3.2 MB",
    media: (
      <AttachmentMedia variant="image">
        <img
          src="https://images.shadcnspace.com/assets/gallery/destinations-3.webp"
          alt=""
        />
      </AttachmentMedia>
    ),
  },
  {
    name: "budget-summary.xlsx",
    description: "640 KB",
    media: (
      <AttachmentMedia className="bg-teal-400/15 text-teal-400">
        <FileSpreadsheet />
      </AttachmentMedia>
    ),
  },
  {
    name: "meeting-notes.docx",
    description: "128 KB",
    media: (
      <AttachmentMedia className="bg-blue-500/15 text-blue-500">
        <FileText />
      </AttachmentMedia>
    ),
  },
  {
    name: "brand-assets.zip",
    description: "18.6 MB",
    media: (
      <AttachmentMedia className="bg-orange-400/15 text-orange-400">
        <FileArchive />
      </AttachmentMedia>
    ),
  },
];

const AttachmentGroupDemo = () => {
  return (
    <AttachmentGroup
      role="group"
      aria-label="Attached files"
      className="w-full max-w-xl"
    >
      {FILES.map((file) => (
        <Attachment key={file.name}>
          {file.media}
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.description}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              aria-label={`Remove ${file.name}`}
              className="cursor-pointer"
            >
              <X />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
};

export default AttachmentGroupDemo;
