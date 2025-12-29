import { useState, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export interface UseSupabaseUploadProps {
  bucketName: string;
  folderPath?: string;
  searchPrefix?: string;
}

export interface StorageFile {
  name: string;
  url: string;
  id: string;
  size: number;
  updatedAt: string;
}

export interface UseSupabaseUploadReturn {
  uploadFile: (file: File) => Promise<string | null>;
  clearFile: () => void;
  isUploading: boolean;
  progress: number;
  uploadedUrl: string | null;
  error: Error | null;
  existingFiles: StorageFile[];
  isLoadingFiles: boolean;
  refreshFiles: () => Promise<void>;
  selectExistingFile: (url: string) => void;
}

export const useSupabaseUpload = ({
  bucketName,
  folderPath = "",
  searchPrefix,
}: UseSupabaseUploadProps): UseSupabaseUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [existingFiles, setExistingFiles] = useState<StorageFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  const refreshFiles = useCallback(async () => {
    setIsLoadingFiles(true);
    setError(null);

    try {
      // Determine the search path
      const searchPath = searchPrefix || folderPath || "";

      // List files from the bucket
      const { data, error: listError } = await supabase.storage
        .from(bucketName)
        .list(searchPath);

      if (listError) {
        throw listError;
      }

      if (!data) {
        setExistingFiles([]);
        return;
      }

      // Filter out directories
      const files = data.filter((item) => !item.id.endsWith("/"));

      // Get public URLs for each file
      const filesWithUrls = await Promise.all(
        files.map(async (file) => {
          const filePath = searchPath
            ? `${searchPath}/${file.name}`
            : file.name;
          const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          return {
            name: file.name,
            url: urlData.publicUrl,
            id: file.id,
            size: file.metadata?.size || 0,
            updatedAt: file.updated_at || "",
          };
        })
      );

      setExistingFiles(filesWithUrls);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch existing files")
      );
    } finally {
      setIsLoadingFiles(false);
    }
  }, [bucketName, folderPath, searchPrefix]);

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      if (!file) return null;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        // Upload with XHR to track progress
        const uploadWithProgress = async () => {
          // Create a Promise wrapper around XHR to properly handle progress and completion
          return new Promise<void>((resolve, reject) => {
            // First, get upload URL and options from Supabase
            // Use FormData and XHR for the actual upload to track progress
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append("file", file);

            // Track upload progress
            xhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) {
                const percentComplete = Math.round(
                  (event.loaded / event.total) * 100
                );
                setProgress(percentComplete);
              }
            });

            xhr.addEventListener("load", () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
              } else {
                reject(new Error(`Upload failed with status: ${xhr.status}`));
              }
            });

            xhr.addEventListener("error", () => {
              reject(new Error("Network error occurred during upload"));
            });

            xhr.addEventListener("abort", () => {
              reject(new Error("Upload was aborted"));
            });

            // Set up the request
            xhr.open(
              "PUT",
              `${supabaseUrl}/storage/v1/object/${bucketName}/${filePath}`
            );

            // Add required headers
            xhr.setRequestHeader("Authorization", `Bearer ${supabaseKey}`);
            xhr.setRequestHeader("x-upsert", "false");

            // Send the form data
            xhr.send(formData);
          });
        };

        const performDirectUpload = async () => {
          const { data, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            throw uploadError;
          }

          return data;
        };

        // Try the XHR upload with progress first
        try {
          await uploadWithProgress();
        } catch (xhrError) {
          // If XHR fails, fall back to the direct method
          console.warn(
            "XHR upload failed, falling back to direct upload",
            xhrError
          );
          await performDirectUpload();
        }

        // Get the public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;
        setUploadedUrl(publicUrl);
        setProgress(100);

        // Refresh the file list to include the new upload
        await refreshFiles();

        return publicUrl;
      } catch (err) {
        console.log("err", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error occurred during upload")
        );
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [bucketName, folderPath, refreshFiles]
  );

  const clearFile = useCallback(() => {
    setUploadedUrl(null);
    setProgress(0);
  }, []);

  const selectExistingFile = useCallback((url: string) => {
    setUploadedUrl(url);
  }, []);

  return {
    uploadFile,
    clearFile,
    isUploading,
    progress,
    uploadedUrl,
    error,
    existingFiles,
    isLoadingFiles,
    refreshFiles,
    selectExistingFile,
  };
};
