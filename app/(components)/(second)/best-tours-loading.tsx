"use client";
import TourCardLoading from "@/components/common/tour-card-loading";
import { Button } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FunctionComponent } from "react";

interface BestToursLoadingProps {}

const BestToursLoading: FunctionComponent<BestToursLoadingProps> = () => {
  return (
    <div className=" bg-[#f1f6ff] b py-16">
      <div className="container">
        <div className="flex justify-between items-end">
          <h1 className="text-xl">الأكثر طلباً</h1>
          <div className="flex justify-end">
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all"
              variant="light"
            >
              <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all"
              variant="light"
            >
              <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-4 gap-x-4 mt-4">
          {Array.from(new Array(4)).map((_, index) => (
            <div key={index}>
              <TourCardLoading />
            </div>
          ))}
        </div>
        <div className="lg:hidden grid grid-cols-2 gap-x-4 mt-4">
          {Array.from(new Array(2)).map((_, index) => (
            <div key={index}>
              <TourCardLoading />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestToursLoading;
