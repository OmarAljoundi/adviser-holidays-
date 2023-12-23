import { Skeleton } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { Separator } from "../ui/separator";

interface ListingFilterLoadingProps {}

const ListingFilterLoading: FunctionComponent<ListingFilterLoadingProps> =
  () => {
    return (
      <div className="grid gap-y-4 my-3">
        <div className="shadow-card p-3">
          <div className="flex justify-between items-center  mb-4">
            <Skeleton className="h-4 w-3/5 rounded-medium" />
          </div>
          <Separator className="my-2" />
          <div className="w-full flex flex-col gap-2 ">
            {Array.from(new Array(15)).map((_, index) => (
              <div
                className="flex justify-between items-center py-1"
                key={index}
              >
                <Skeleton className="h-4 w-3/5 rounded-medium" />
                <Skeleton className="h-4 w-4 rounded-medium" />
              </div>
            ))}
          </div>
        </div>
        <div className="shadow-card p-3">
          <div className="flex justify-between items-center  mb-4">
            <Skeleton className="h-4 w-3/5 rounded-medium" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-medium" />
          </div>
        </div>
        <div className="shadow-card p-3">
          <div className="flex justify-between items-center  mb-4">
            <Skeleton className="h-4 w-3/5 rounded-medium" />
          </div>
          <Skeleton className="h-5 w-full rounded-medium" />
          <div className="grid grid-cols-2 gap-2 mt-8">
            <div>
              <Skeleton className="h-8 w-full rounded-medium" />
            </div>
            <div>
              <Skeleton className="h-8 w-full rounded-medium" />
            </div>
          </div>
        </div>
        <div className="shadow-card p-3">
          <div className="flex justify-between items-center  mb-4">
            <Skeleton className="h-4 w-3/5 rounded-medium" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-medium" />
          </div>
        </div>
        <div className="shadow-card p-3">
          <div className="flex justify-between items-center  mb-4">
            <Skeleton className="h-4 w-3/5 rounded-medium" />
          </div>
          <Separator className="my-2" />
          <div className="w-full flex flex-col gap-2 ">
            {Array.from(new Array(5)).map((_, index) => (
              <div
                className="flex justify-start gap-5 items-center py-1"
                key={index}
              >
                <Skeleton className="h-4 w-4 rounded-medium" />
                <Skeleton className="h-4 w-3/5 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default ListingFilterLoading;
