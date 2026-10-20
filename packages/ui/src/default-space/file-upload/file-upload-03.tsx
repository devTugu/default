// @ts-nocheck
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Pencil,
  Trash2,
  UserRound,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Separator } from "@default/ui/primitives/separator";
import { cn } from "@default/ui/lib/cn";

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success"
  >("idle");

  const handleUpload = useCallback((file: File) => {
    setFiles([file]);
    setUploadStatus("uploading");

    // Simulate upload
    setTimeout(() => {
      setUploadStatus("success");
    }, 1500);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0]);
      }
    },
    [handleUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  const clearFiles = () => {
    setFiles([]);
    setUploadStatus("idle");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="py-6 w-full max-w-sm">
        <CardContent className="px-6 flex flex-col items-center space-y-6 text-center">
          {/* Circular Upload Area */}
          <div
            {...getRootProps()}
            className={cn(
              "relative w-44 h-44 rounded-full border-2 border-dashed transition-all duration-200 cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/30 flex flex-col items-center justify-center p-10 bg-transparent",
              isDragActive ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <Input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border text-muted-foreground group-hover:text-foreground transition-colors">
                <UserRound className="size-5" />
              </div>

              <p className="text-sm text-muted-foreground max-w-35 leading-relaxed">
                {isDragActive
                  ? "Drop the image"
                  : "Drag and drop your image here"}
              </p>
            </div>

            {/* Preview (Simplified for placeholder) */}
            {files.length > 0 && (
              <div className="absolute inset-0 rounded-full overflow-hidden bg-background group/preview">
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          {files.length === 0 ? (
            <>
              {/* OR Seperator */}
              <div className="relative w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <span className="relative z-10 bg-background px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  OR
                </span>
              </div>

              <Button
                variant="outline"
                className="w-full h-10 text-base font-medium rounded-md transition-all duration-200 mb-0"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                Upload a photo
              </Button>
            </>
          ) : (
            <>
              <div className="flex w-full gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-10 rounded-md text-muted-foreground font-medium cursor-pointer"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Pencil className="mr-2 size-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 h-10 rounded-md font-medium cursor-pointer"
                  onClick={clearFiles}
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>
              </div>
              <Button
                className="w-full h-10 text-base font-medium rounded-md transition-all duration-200 mb-0"
                disabled={uploadStatus !== "idle"}
              >
                {uploadStatus === "idle" && "Upload a photo"}
                {uploadStatus === "uploading" && (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin text-primary" />
                    Uploading...
                  </>
                )}
                {uploadStatus === "success" && (
                  <>
                    Photo uploaded
                    <Check className="ml-2 size-4 text-teal-400" />
                  </>
                )}
              </Button>
            </>
          )}
          <Input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.length) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;
