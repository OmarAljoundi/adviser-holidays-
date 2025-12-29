import { Separator } from "@/components/ui/separator";
import React from "react";

export function AttributeTabsLoading() {
  const skeletonTabs = Array.from({ length: 4 }, (_, i) => i);

  return (
    <React.Fragment>
      <Separator className="my-2" />
      <div className="text-center mb-5 h-16 w-3/4 mx-auto bg-gray-200 animate-pulse rounded" />
      <div className="w-full mb-8">
        <div className="w-full shadow-xl bg-white gap-4 grid grid-cols-2 lg:grid-cols-4 h-full p-1 rounded-md">
          {skeletonTabs.map((index) => (
            <div
              key={index}
              className="h-10 bg-gray-200 animate-pulse rounded w-full"
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
