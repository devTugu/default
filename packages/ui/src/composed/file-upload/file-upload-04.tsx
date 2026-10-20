// @ts-nocheck
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, FileText, X } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent } from "@default/ui/primitives/card";
import { cn } from "@default/ui/lib/cn";

const UPLOAD_RING_RADIUS = 18;
const UPLOAD_RING_CIRCUMFERENCE = 2 * Math.PI * UPLOAD_RING_RADIUS;

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const clearUploadState = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleFile = useCallback((selected: File | undefined) => {
    if (!selected) return;
    clearUploadState();
    setFile(selected);
    setIsUploading(true);
    setUploadProgress(0);

    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        const next = Math.min(prev + Math.random() * 20 + 10, 100);
        if (next >= 100) {
          clearUploadState();
          setIsUploading(false);
        }
        return next;
      });
    }, 150);
  }, []);

  const handleRemoveFile = () => {
    clearUploadState();
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFile(acceptedFiles[0]);
    },
    [handleFile],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-sm py-6">
        <CardContent className="px-6">
          <div
            {...getRootProps()}
            className={cn(
              "flex min-h-48 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-6 text-center transition-colors",
              file
                ? "border-border"
                : cn(
                    "border-muted-foreground/25",
                    isDragActive && "border-primary bg-primary/5",
                  ),
            )}
          >
            <input {...getInputProps()} />

            {file && !isUploading ? (
              <>
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="max-w-56 truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 rounded-lg px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <X className="size-3.5" />
                  Remove file
                </Button>
              </>
            ) : file && isUploading ? (
              <>
                <div className="relative flex size-10 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 40 40"
                    className="absolute inset-0 size-10 -rotate-90"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r={UPLOAD_RING_RADIUS}
                      fill="none"
                      strokeWidth="2"
                      className="stroke-muted"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r={UPLOAD_RING_RADIUS}
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={UPLOAD_RING_CIRCUMFERENCE}
                      strokeDashoffset={
                        UPLOAD_RING_CIRCUMFERENCE * (1 - uploadProgress / 100)
                      }
                      className="stroke-primary transition-[stroke-dashoffset] duration-150 ease-out"
                    />
                  </svg>
                  <CloudUpload className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="max-w-56 truncate text-sm font-medium text-muted-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Uploading… {Math.round(uploadProgress)}%
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex size-10 items-center justify-center rounded-full border border-dashed border-muted-foreground/40">
                  <CloudUpload className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {isDragActive
                      ? "Drop the file here"
                      : "Choose a file or drag & drop it here"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 rounded-lg px-3"
                  onClick={(event) => {
                    event.stopPropagation();
                    open();
                  }}
                >
                  Browse File
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;
