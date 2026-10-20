// @ts-nocheck
import { Globe, X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";

const FILE_NAME = "default glow preview";

const CodeFileAttachment = () => {
  return (
    <Attachment className="w-full max-w-xs">
      <AttachmentMedia className="bg-blue-500/15 text-blue-500">
        <Globe />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{FILE_NAME}</AttachmentTitle>
        <AttachmentDescription>Code, HTML</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Remove ${FILE_NAME}`}
          className="cursor-pointer"
        >
          <X />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
};

export default CodeFileAttachment;
