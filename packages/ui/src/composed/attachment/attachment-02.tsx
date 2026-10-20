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

const ImageAttachmentCard = () => {
  return (
    <Attachment
      orientation="vertical"
      className="w-56 has-data-[slot=attachment-content]:w-56"
    >
      <AttachmentMedia variant="image" className="aspect-video">
        <img
          src="https://images.shadcnspace.com/assets/gallery/technology.webp"
          alt="Floating AI chip above a grassy hill under a clear sky"
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>cover-art.jpg</AttachmentTitle>
        <AttachmentDescription>920 KB, 1600x900</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label="Remove cover-art.jpg"
          className="bg-background/70 hover:bg-background backdrop-blur-sm cursor-pointer"
        >
          <X />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
};

export default ImageAttachmentCard;
