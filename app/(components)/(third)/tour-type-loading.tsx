"use client";
import { Separator } from "@/components/ui/separator";
import { Button, Skeleton } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TourTypeLoading = () => {
  return (
    <div className="relative  p-4">
      <div className="container">
        <div className="flex justify-between items-end">
          <h1 className="text-xl">أنواع البرامج</h1>
          <div className="flex justify-end">
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all js-tour-types-home-next"
              variant="light"
            >
              <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all js-tour-types-home-prev"
              variant="light"
            >
              <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="hidden lg:grid grid-cols-4 gap-x-4 mt-4">
          {Array.from(new Array(4)).map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton className="rounded-lg duration-700 shadow-custom h-52 w-full">
                <div className="aspect-[3/2] rounded-lg rounded-b-none bg-default-300"></div>
              </Skeleton>
            </div>
          ))}
        </div>
        <div className="lg:hidden grid grid-cols-2 gap-x-4 mt-4">
          {Array.from(new Array(2)).map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton className="rounded-lg duration-700 shadow-custom h-52 w-full">
                <div className="aspect-[3/2] rounded-lg rounded-b-none bg-default-300"></div>
              </Skeleton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourTypeLoading;
