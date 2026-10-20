// @ts-nocheck
import { RotateCw, TriangleAlert } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";

const FILE_NAME = "financial-model.xlsx";

const ErrorAttachment = () => {
  return (
    <Attachment state="error" className="w-full max-w-xs">
      <AttachmentMedia>
        <TriangleAlert />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{FILE_NAME}</AttachmentTitle>
        <AttachmentDescription>Upload failed, try again</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Retry uploading ${FILE_NAME}`}
          className="cursor-pointer"
        >
          <RotateCw />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
};

export default ErrorAttachment;
