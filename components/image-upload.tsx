/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect } from "react";
import { X, Upload, Camera, Type, Check } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string | null) => void;
  altText?: string;
  onAltTextChange?: (altText: string) => void;
  bucketName: string;
  folderPath?: string;
  searchPrefix?: string;
  accept?: {
    [key: string]: string[];
  };
  maxSizeMB?: number;
  className?: string;
  showExistingFiles?: boolean;
  variants?: "circle" | "rectangular";
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  altText = "",
  onAltTextChange,
  bucketName,
  folderPath,
  searchPrefix,
  accept = {
    "image/*": [],
  },
  maxSizeMB = 5,
  className,
  variants = "circle",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentAltText, setCurrentAltText] = useState(altText);
  const [isAltTextPopoverOpen, setIsAltTextPopoverOpen] = useState(false);

  const { uploadFile, clearFile, isUploading, progress, uploadedUrl, error } =
    useSupabaseUpload({ bucketName, folderPath, searchPrefix });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        const url = await uploadFile(file);

        if (url && onChange) {
          onChange(url);
        }
      }
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const { errors } = rejectedFiles[0];
        if (errors.some((e) => e.code === "file-too-large")) {
          setError(new Error(`File size exceeds ${maxSizeMB}MB limit`));
        } else {
          setError(new Error(errors[0].message));
        }
      }
    },
    noClick: true,
    noKeyboard: true,
  });

  const handleClear = useCallback(() => {
    clearFile();
    setPreviewUrl(null);
    if (onChange) {
      onChange(null);
    }
  }, [clearFile, onChange]);

  const handleAltTextSave = useCallback(() => {
    if (onAltTextChange) {
      onAltTextChange(currentAltText);
    }
    setIsAltTextPopoverOpen(false);
  }, [currentAltText, onAltTextChange]);

  useEffect(() => {
    if (uploadedUrl && !previewUrl) {
      setPreviewUrl(uploadedUrl);
      if (onChange) {
        onChange(uploadedUrl);
      }
    }
  }, [uploadedUrl, previewUrl, onChange]);

  useEffect(() => {
    if (value && !previewUrl) {
      setPreviewUrl(value);
    }
  }, [value, previewUrl]);

  useEffect(() => {
    setCurrentAltText(altText);
  }, [altText]);

  const [dropzoneError, setError] = useState<Error | null>(error);
  useEffect(() => {
    setError(error);
  }, [error]);

  const size = 120;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (progress * circumference) / 100;

  const hasAltText = currentAltText.trim().length > 0;

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative  h-32 transition-all duration-300",
          isDragActive && "scale-105",
          isDragAccept && "ring-2 ring-green-500 ",
          isDragReject && "ring-2 ring-red-500",
          variants == "circle" ? "w-32" : "w-full"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <input {...getInputProps()} />

        {previewUrl ? (
          <div
            className={cn(
              "relative w-full h-full rounded-full overflow-hidden",
              variants == "circle" ? "rounded-full" : "rounded-sm"
            )}
          >
            <img
              src={previewUrl}
              alt={currentAltText || "Preview image"}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <svg
                  width={size}
                  height={size}
                  viewBox={`0 0 ${size} ${size}`}
                  className="transform"
                >
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth={strokeWidth}
                    strokeOpacity="0.4"
                  />
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - dash}
                    className="transition-all duration-300 ease-in-out"
                  />
                  <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                    className="fill-white text-lg font-semibold"
                  >
                    {`${Math.min(progress, 100)}%`}
                  </text>
                </svg>
              </div>
            )}

            {/* Overlay with action buttons that appears on hover */}
            {!isUploading && isHovering && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-40 transition-opacity duration-300">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className="rounded-full w-10 h-10 p-0 transition-transform hover:scale-110"
                >
                  <Upload className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="rounded-full w-10 h-10 p-0 transition-transform hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={open}
            className={cn(
              "relative w-full h-full  border-2 border-dashed border-border flex items-center justify-center",
              "bg-background hover:bg-background/50 transition-all duration-300 cursor-pointer",
              isDragActive && "ring-1 ring-ring",
              isUploading ? "opacity-75" : "",
              variants == "circle" ? "rounded-full" : "rounded-sm"
            )}
          >
            {isUploading ? (
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform"
              >
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - dash}
                  className="transition-all duration-300 ease-in-out"
                />
                <text
                  x="50%"
                  y="50%"
                  dy=".3em"
                  textAnchor="middle"
                  className="fill-gray-700 text-lg font-semibold"
                >
                  {`${Math.min(progress, 100)}%`}
                </text>
              </svg>
            ) : isDragActive ? (
              <div className="text-center p-2">
                <Upload size={32} className="mx-auto text-blue-500" />
                <p className="text-xs font-medium mt-1 text-blue-500">
                  Drop to upload
                </p>
              </div>
            ) : (
              <div className="text-center p-2">
                <Camera size={32} className="mx-auto text-gray-400" />
                <p className="text-xs font-medium mt-1 text-gray-500">
                  Drag & drop or click
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {dropzoneError && (
        <p className="text-red-500 text-sm mt-2 mb-1">
          {dropzoneError.message}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        {/* Alt text button */}
        <Popover
          open={isAltTextPopoverOpen}
          onOpenChange={setIsAltTextPopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={hasAltText ? "default" : "outline"}
              size="sm"
              className="transition-all duration-300 rounded-full flex items-center gap-1 px-4 shadow-sm hover:shadow"
              onClick={(e) => {
                e.stopPropagation();
                setIsAltTextPopoverOpen(true);
              }}
            >
              {hasAltText ? (
                <Check className="w-4 h-4" />
              ) : (
                <Type className="w-4 h-4" />
              )}
              <span>{hasAltText ? "Edit Alt Text" : "Add Alt Text"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              <div className="font-medium text-sm">Image Alt Text</div>
              <div className="text-xs text-gray-500">
                Add descriptive text for screen readers and accessibility.
              </div>
              <div className="space-y-1">
                <Label htmlFor="alt-text">Alt Text</Label>
                <Input
                  id="alt-text"
                  placeholder="Describe this image..."
                  value={currentAltText}
                  className="placeholder:text-right text-right font-arabic-body"
                  dir="rtl"
                  onChange={(e) => setCurrentAltText(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button type="button" size="sm" onClick={handleAltTextSave}>
                  Save
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* {showExistingFiles && (
          <Dialog open={isSelectModalOpen} onOpenChange={setIsSelectModalOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="transition-all duration-300 rounded-full flex items-center gap-1 px-4 shadow-sm hover:shadow"
                onClick={() => {
                  refreshFiles();
                  setIsSelectModalOpen(true);
                }}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Browse Gallery</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>Select Existing File</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      refreshFiles();
                    }}
                    disabled={isLoadingFiles}
                  >
                    <RefreshCw
                      className={cn(
                        "w-4 h-4",
                        isLoadingFiles && "animate-spin"
                      )}
                    />
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                {isLoadingFiles ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : existingFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                    <p>No files found in this folder</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[50vh] overflow-y-auto pr-4">
                    {groupedFiles.map(({ date, files }) => (
                      <div key={date} className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          {date}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {files.map((file) => (
                            <div
                              key={file.id}
                              onClick={() => handleSelectExisting(file)}
                              className="border rounded-md p-1 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-sm relative">
                                {file.url.match(
                                  /\.(jpe?g|png|gif|svg|webp)$/i
                                ) ? (
                                  <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "/api/placeholder/100/100";
                                    }}
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full bg-gray-200">
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="mt-1 px-1">
                                <p
                                  className="text-xs font-medium truncate"
                                  title={file.name}
                                >
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )} */}
      </div>

      <p className="mt-2 text-xs text-muted-foreground text-center">
        {isDragActive
          ? "Drop the file here..."
          : `Drag & drop or click to upload (max ${maxSizeMB}MB)`}
      </p>
    </div>
  );
};
