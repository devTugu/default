// @ts-nocheck
"use client";

import { toast } from "@default/ui/primitives/toast"
import { Button } from "@default/ui/primitives/button";

export default function ToastComponent() {
  const handleFileUpload = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: {
          title: "Uploading file...",
          description: "Please wait while your file is being uploaded."
        },
        success: {
          title: "Upload complete",
          description: "resume.pdf has been uploaded successfully.",
          action: {
            label: "View File",
            onClick: () =>
              toast.add({
                type: "info",
                title: "Opening file preview..."
              })
          }
        },
        error: {
          title: "Upload failed",
          description: "Something went wrong while uploading your file."
        }
      },
      { position: "top-center" }
    );
  };

  return (
    <Button variant="outline" onClick={handleFileUpload} className="cursor-pointer">
      Upload File
    </Button>
  );
}
