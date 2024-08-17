import { Separator } from "@/components/ui/separator";
import IconTourProvider from "@/provider/icon-tour-provider";
import { Tour } from "@/types/custom";
import { FunctionComponent } from "react";
import { IoPricetags } from "react-icons/io5";
interface TourInitailInfoProps {
  tour: Tour;
}

const TourInitailInfo: FunctionComponent<TourInitailInfoProps> = ({ tour }) => {
  return (
    <div className="relative shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary"> الأسعار</h4>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="grid space-y-2 justify-items-center border bg-gray-200 rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base"> بالغ في غرفة مزدوجة</h1>
          <h4 className="font-bold text-lg md:text-xl">
            {tour.price_double} USD
          </h4>
        </div>
        <div className="grid space-y-2 justify-items-center border  bg-gray-200 rounded-medium p-2 md:p-4 gap-x-2 h-full items-start">
          <IconTourProvider>
            <IoPricetags />
          </IconTourProvider>
          <h1 className="text-sm sm:text-base flex flex-col md:flex-row text-center">
            <span>غرفة مفردة</span>
          </h1>
          <h4 className="font-bold text-lg md:text-xl">
            {tour.price_single} USD
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TourInitailInfo;
