"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function FilterLoading() {
  return (
    <div className="px-2">
      <div
        className={cn(
          `p-3 sm:p-4 lg:py-6 lg:px-8 bg-white border-border border mt-4 lg:mt-0
                 shadow-lg  grid  grid-cols-2 lg:grid-cols-3 rounded-medium lg:rounded-medium gap-y-2 lg:divide-x-reverse lg:divide-x-2 divide-border`
        )}
      >
        <div className="lg:px-4 first:lg:pr-0 last:lg:pl-0 col-span-full lg:col-span-1">
          <div className="flex items-center justify-between flex-row-reverse">
            <Skeleton className="h-4 w-4 ml-2 rounded-medium" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
          </div>
        </div>
        <Separator className="lg:hidden col-span-full" />

        <div className="lg:px-4 first:lg:pr-0 last:lg:pl-0">
          <div className="flex items-center justify-between flex-row-reverse">
            <Skeleton className="h-4 w-4 ml-2 rounded-medium" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
          </div>
        </div>

        {/* Type Dropdown Loading */}
        <div className="lg:px-4 first:lg:pr-0 last:lg:pl-0">
          <div className="flex items-center justify-between flex-row-reverse">
            <Skeleton className="h-4 w-4 ml-2 rounded-medium" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
