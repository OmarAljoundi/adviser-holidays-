"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FormLoadingWithTabsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  numberOfTabs?: number;
}

const FormLoadingWithTabs = React.forwardRef<
  HTMLDivElement,
  FormLoadingWithTabsProps
>(({ className, numberOfTabs = 4, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {/* Tabs Skeleton */}
      <div className="relative mb-6">
        <div className="relative flex space-x-[6px] items-center">
          {Array.from({ length: numberOfTabs }).map((_, index) => (
            <div key={index} className="px-3 py-2 h-[30px]">
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
        <Skeleton className="absolute bottom-[-6px] h-[2px] w-20" />
      </div>

      {/* Form Skeleton */}
      <div className="flex justify-start items-start gap-x-4">
        <div className="flex flex-col gap-4 flex-1 h-min">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between gap-x-4">
                <div className="flex-1">
                  {/* First row */}
                  <div className="flex justify-between gap-x-2 mb-4">
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  {/* Second row */}
                  <div className="flex justify-between gap-x-2 mb-4">
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  {/* Third row */}
                  <div className="flex justify-between gap-x-2 mb-4">
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>

                  {/* Slug row */}
                  <div className="mb-4">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  {/* Last row */}
                  <div className="flex justify-between gap-x-2">
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="w-full">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </div>

                {/* Image upload area */}
                <div className="w-56 border-l pl-4">
                  <Skeleton className="h-4 w-20 mb-2 mt-4" />
                  <Skeleton className="h-40 w-full rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

FormLoadingWithTabs.displayName = "FormLoadingWithTabs";

export { FormLoadingWithTabs };
