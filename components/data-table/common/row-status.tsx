import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pencil, CheckCircle } from "lucide-react";
import React from "react";

interface RowStatusProps {
  isPublished: boolean;
}

export default function RowStatus({ isPublished = false }: RowStatusProps) {
  return (
    <Badge
      variant={isPublished ? "default" : "secondary"}
      className={cn(
        "flex items-center gap-1 px-4 py-1 text-xs font-medium w-fit transition-colors duration-200",
        isPublished
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      )}
    >
      {isPublished ? (
        <React.Fragment>
          <CheckCircle className="w-3 h-3" />
          <span>Published</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Pencil className="w-3 h-3" />
          <span>Draft</span>
        </React.Fragment>
      )}
    </Badge>
  );
}
