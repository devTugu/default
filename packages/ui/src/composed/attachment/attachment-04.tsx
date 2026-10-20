// @ts-nocheck
import { File, Upload } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@default/ui/primitives/attachment";

const FILE_NAME = "selected-file.pdf";

const IdleAttachment = () => {
  return (
    <Attachment state="idle" className="w-full max-w-xs">
      <AttachmentMedia className="bg-sky-400/15 text-sky-400">
        <File />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{FILE_NAME}</AttachmentTitle>
        <AttachmentDescription>Ready to upload</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Upload ${FILE_NAME}`}
          className="cursor-pointer"
        >
          <Upload />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
};

export default IdleAttachment;
