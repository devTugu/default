// @ts-nocheck
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  CloudUpload,
  FileIcon,
  X,
  CheckCircle2,
  Trash2,
  FileImage,
  Loader2,
} from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Progress } from "@default/ui/primitives/progress";
import { cn } from "@default/ui/lib/cn";

interface FileWithProgress {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  errorMessage?: string;
  totalSizeText?: string;
}

const FileUpload = () => {
  const [files, setFiles] = useState<FileWithProgress[]>([
    {
      id: "demo-1",
      file: {
        name: "my-cv.pdf",
        size: 122880,
        type: "application/pdf",
      } as File,
      progress: 45,
      status: "uploading",
      totalSizeText: "120 KB",
    },
    {
      id: "demo-2",
      file: {
        name: "google-certificate.pdf",
        size: 96256,
        type: "application/pdf",
      } as File,
      progress: 100,
      status: "completed",
      totalSizeText: "94 KB",
    },
  ]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "uploading" as const,
      totalSizeText: formatFileSize(file.size),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload for each file
    newFiles.forEach((fileObj) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id
                ? { ...f, progress: 100, status: "completed" as const }
                : f,
            ),
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, progress: currentProgress } : f,
            ),
          );
        }
      }, 400);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
      "application/pdf": [".pdf"],
      "video/mp4": [".mp4"],
    },
    maxSize: 52428800, // 50MB
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf"))
      return (
        <div className="relative">
          <FileIcon
            className="size-10 text-muted-foreground/30"
            strokeWidth={1}
          />
          <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-red-500 bg-white px-0.5 rounded-sm border border-red-500">
            PDF
          </span>
        </div>
      );
    if (type.includes("image"))
      return <FileImage size={24} className="text-blue-500" />;
    return <FileIcon size={24} className="text-muted-foreground" />;
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="py-6">
        <CardContent className="px-6">
          <div className="space-y-5">
            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={cn(
                "relative group cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200",
                "flex flex-col items-center justify-center p-8 gap-4 text-center",
                isDragActive && "border-primary bg-primary/5 shadow-inner",
              )}
            >
              <Input {...getInputProps()} />
              <div className="text-muted-foreground group-hover:text-foreground transition-colors h-10 w-10 border-2 border-dashed rounded-full flex items-center justify-center">
                <CloudUpload size={20} />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {isDragActive
                    ? "Drop files here"
                    : "Choose a file or drag & drop it here"}
                </p>
                <p className="text-xs text-muted-foreground">
                  JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
                </p>
              </div>

              <Button
                variant="outline"
                className="rounded-md font-medium h-9 px-6 leading-none cursor-pointer"
              >
                Browse File
              </Button>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-3">
                {files.map((fileObj) => (
                  <div
                    key={fileObj.id}
                    className="group relative flex items-center gap-4 p-4 rounded-xl border bg-muted/20"
                  >
                    <div className="shrink-0">
                      {getFileIcon(fileObj.file.type)}
                    </div>

                    <div
                      className={cn(
                        "flex-1 min-w-0",
                        fileObj.status === "uploading" && "space-y-1",
                      )}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="max-w-60">
                          <p className="text-sm font-medium text-foreground leading-normal truncate">
                            {fileObj.file.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span>
                            {fileObj.status === "uploading"
                              ? `${formatFileSize(Math.round(fileObj.file.size * (fileObj.progress / 100)))} of ${fileObj.totalSizeText}`
                              : `${fileObj.totalSizeText} of ${fileObj.totalSizeText}`}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span
                            className={cn(
                              "flex items-center gap-1.5 font-medium leading-normal",
                              fileObj.status === "completed"
                                ? "text-teal-400"
                                : "text-muted-foreground",
                            )}
                          >
                            {fileObj.status === "uploading" && (
                              <Loader2 className="size-3 animate-spin text-blue-500" />
                            )}
                            {fileObj.status === "completed" && (
                              <CheckCircle2 className="size-3.5 fill-teal-400/20 text-teal-400" />
                            )}
                            {fileObj.status === "uploading"
                              ? "Uploading..."
                              : "Completed"}
                          </span>
                        </div>
                      </div>

                      {fileObj.status === "uploading" && (
                        <div className="w-full">
                          <Progress
                            value={fileObj.progress}
                            className="rounded-full **:data-[slot=progress-indicator]:h-full **:data-[slot=progress-indicator]:bg-blue-500"
                          />
                        </div>
                      )}
                    </div>

                    <Button
                      variant={"ghost"}
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute right-3.5 top-4 p-1.5 rounded-full dark:hover:bg-muted cursor-pointer"
                    >
                      {fileObj.status === "completed" ? (
                        <Trash2 size={16} />
                      ) : (
                        <X size={16} />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;
