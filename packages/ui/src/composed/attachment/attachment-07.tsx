// @ts-nocheck
import { CheckCircle2, X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";

const FILE_NAME = "uploaded-report.pdf";

const UploadedAttachment = () => {
  return (
    <Attachment state="done" className="w-full max-w-xs">
      <AttachmentMedia className="bg-teal-400/15 text-teal-400">
        <CheckCircle2 />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{FILE_NAME}</AttachmentTitle>
        <AttachmentDescription>Uploaded, 1.8 MB</AttachmentDescription>
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

export default UploadedAttachment;
