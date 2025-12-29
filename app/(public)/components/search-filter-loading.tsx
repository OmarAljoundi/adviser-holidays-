"use client";
import { Skeleton } from "@/components/ui/skeleton";

const SearchFilterLoading = () => {
  return (
    <div className="p-3 sm:p-4 lg:py-6 lg:px-8 bg-white border   h-full mb-5 grid gap-4">
      <Skeleton className="h-9 rounded-medium px-3" />
      <Skeleton className="h-9 rounded-medium px-3" />
      <Skeleton className="h-9 rounded-medium px-3" />
      <Skeleton className="h-9 rounded-medium px-3" />
    </div>
  );
};

export default SearchFilterLoading;
