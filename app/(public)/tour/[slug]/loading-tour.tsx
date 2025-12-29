"use client";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

interface LoadingTourProps {}

const LoadingTour: FunctionComponent<LoadingTourProps> = () => {
  const IconLoading = () => {
    return <Skeleton className="w-12 h-12 rounded-medium" />;
  };
  return (
    <div className="container mb-10">
      <div className="space-y-4">
        <div className="shadow-custom p-3 rounded-medium mt-4 flex gap-x-2">
          <Skeleton className="w-28 h-4 rounded-medium" />
          <Skeleton className="w-28 h-4 rounded-medium" />
          <Skeleton className="w-28 h-4 rounded-medium" />
        </div>
        
        <div className="relative shadow-custom rounded-medium p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from(new Array(4))?.map((item, index) => (
              <div key={index} className="rounded-medium">
                <div className="relative h-full group overflow-hidden rounded-medium aspect-[3/2] ">
                  <Skeleton className="w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-custom rounded-medium p-4">
          <div className="flex flex-col items-start sm:flex-row sm:justify-between my-4 ">
            <div className="grid space-y-3 px-2">
              <div className="flex  items-start gap-x-3">
                <IconLoading />
                <div className="grid gap-y-4">
                  <Skeleton className="w-60 h-4 rounded-medium" />
                  <Skeleton className="w-60 h-4 rounded-medium" />
                  <Skeleton className="w-60 h-4 rounded-medium" />
                </div>
              </div>
            </div>
            <div className="flex gap-x-2 justify-end  px-2 mt-3 sm:px-0 sm:mt-0 items-start">
              <div className="grid gap-y-4">
                <Skeleton className="w-60 h-4 rounded-medium" />
                <Skeleton className="w-60 h-4 rounded-medium" />
                <Skeleton className="w-60 h-4 rounded-medium" />
              </div>
              <IconLoading />
            </div>
          </div>
        </div>

        <div className="shadow-custom rounded-medium p-4">
          <Skeleton className="w-60 h-4 rounded-medium" />
          <Separator className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 px-2 ">
            <div className="flex gap-x-2 items-center">
              <IconLoading />
              <Skeleton className="w-60 h-4 rounded-medium" />
            </div>
            <div className="flex gap-x-2 items-center">
              <IconLoading />
              <Skeleton className="w-60 h-4 rounded-medium" />
            </div>
            <div className="flex gap-x-2 items-center">
              <IconLoading />
              <Skeleton className="w-60 h-4 rounded-medium" />
            </div>
            <div className="flex gap-x-2 items-center">
              <IconLoading />
              <Skeleton className="w-60 h-4 rounded-medium" />
            </div>
            <div className="flex gap-x-2 items-center">
              <IconLoading />
              <Skeleton className="w-60 h-4 rounded-medium" />
            </div>
            <div className="flex gap-x-2 items-center">
              <IconLoading />
              <Skeleton className="w-60 h-4 rounded-medium" />
            </div>
          </div>
        </div>

        {/* Bottom Grid (Previously Swiper) */}
        <div className="relative shadow-custom rounded-medium p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Array(4))?.map((item, index) => (
              <div key={index} className="rounded-medium">
                <div className="relative h-full group overflow-hidden rounded-medium aspect-[3/2] ">
                  <Skeleton className="w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTour;