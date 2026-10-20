// @ts-nocheck
import { X } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";
import { Spinner } from "@default/ui/primitives/spinner";

const FILE_NAME = "design-review.pdf";

const UploadingAttachment = () => {
  return (
    <Attachment state="uploading" className="w-full max-w-xs">
      <AttachmentMedia className="bg-orange-400/15 text-orange-400">
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle className="shimmer-color-orange-400">
          {FILE_NAME}
        </AttachmentTitle>
        <AttachmentDescription>Uploading, 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Cancel uploading ${FILE_NAME}`}
          className="cursor-pointer"
        >
          <X />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
};

export default UploadingAttachment;
