import { parseISO, format, formatDistanceToNow } from "date-fns";
import { CalendarDays } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface FriendlyDateProps {
  date: string | Date;
  className?: string;
}

export default function RowDate({ date, className = "" }: FriendlyDateProps) {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const formattedDate = format(dateObj, "PPPP");
  const relativeDate = formatDistanceToNow(dateObj, { addSuffix: true });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            `inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300
             hover:text-gray-800 dark:hover:text-gray-100
             transition-colors`,
            className
          )}
        >
          <CalendarDays className="size-4" />
          <span className="text-sm mt-0.5">{relativeDate}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg p-2 rounded-md border border-gray-200 dark:border-gray-700 z-50"
      >
        <p className="text-xs">{formattedDate}</p>
      </TooltipContent>
    </Tooltip>
  );
}
