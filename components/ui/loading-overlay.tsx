import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface LoadingOverlayProps {
  /**
   * Whether the loading overlay is visible
   * @default true
   */
  isLoading?: boolean;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Additional className for the spinner
   */
  spinnerClassName?: string;
  /**
   * Text to display below the spinner
   */
  loadingText?: string;
}

export function LoadingOverlay({
  isLoading = true,
  className,
  spinnerClassName,
  loadingText,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-black/30 dark:bg-black/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="rounded-lg bg-background p-4 shadow-lg dark:shadow-gray-900/70">
        <Spinner variant="infinite" className={cn("h-10", spinnerClassName)} />
        {loadingText && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {loadingText}
          </p>
        )}
      </div>
    </div>
  );
}
